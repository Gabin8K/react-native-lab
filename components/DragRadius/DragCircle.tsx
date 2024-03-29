import React, { FC, memo, useMemo, useState } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import Animated, { interpolate, runOnJS, SharedValue, SlideInDown, SlideOutDown, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Width } from '../../utils/constants';
import { LinearGradient } from 'expo-linear-gradient';


type PointProps = {
  i: number;
  translateX: SharedValue<number>;
  children: React.ReactNode;
}

const POINTS = 30;
const R = 150;
const MAX_HEIGHT = R - .2;

const COLORS = [
  'rgba(255,255,255,.4)',
  '#FFFFFF',
]


const DragCircle: FC = () => {
  const translateX = useSharedValue(0);
  const offset = useSharedValue(0);

  const [dx, setDx] = useState(0);

  const gesture = useMemo(() => Gesture
    .Pan()
    .onChange((e) => {
      const x = e.translationX + offset.value;
      translateX.value = interpolate(
        x,
        [-Width, Width],
        [-POINTS, POINTS],
      )
      runOnJS(setDx)(translateX.value)
    })
    .onEnd((e) => {
      offset.value = e.translationX + offset.value;
    }), [])

  const uas = useAnimatedStyle(() => {
    const height = withTiming(Math.round(translateX.value) % 2 === 0 ? 10 : 120)
    const backgroundColor = withTiming(Math.round(translateX.value) % 2 === 0 ? 'black' : '#10b0f1')

    return {
      height,
      backgroundColor
    }
  }, [])

  return (
    <GestureDetector gesture={gesture}>
      <View
        style={styles.flex}
      >
        <View style={styles.textContainer}>
          <View style={styles.view}>
            {Array.from({ length: POINTS }, (_, i) => (
              Math.abs(R * Math.sin(2 * Math.PI * (dx + i) / POINTS)) > MAX_HEIGHT ?
                <Animated.Text
                  key={i}
                  style={styles.textCenter}
                  entering={SlideInDown.springify().damping(15)}
                  exiting={SlideOutDown.springify().damping(15)}
                >
                  {String(i).padStart(2, '0')}
                </Animated.Text> :
                null
            ))}
          </View>
        </View>
        <Animated.View
          style={[styles.center, uas]}
        />
        <Text style={styles.textBottom}>
          M
        </Text>
        <LinearGradient
          style={styles.gradient}
          colors={COLORS}
        />
        <View>
          {Array.from({ length: POINTS }, (_, i) => (
            <PointComponent
              key={i}
              i={i}
              translateX={translateX}
            >
              {String(i).padStart(2, '0')}
            </PointComponent>
          ))}
        </View>
      </View>
    </GestureDetector>
  )
}



const PointComponent: FC<PointProps> = memo(({ children, translateX, i }) => {

  const uas = useAnimatedStyle(() => {
    const index = translateX.value + i;
    const active = Math.abs(R * Math.sin(2 * Math.PI * index / POINTS)) > MAX_HEIGHT;
    const scale = withTiming(active ? 2 : 1)
    const color = withTiming(active ? '#10b0f1' : '#1c1b1f')

    return {
      color,
      transform: [{ scale }],
      left: R * Math.cos(2 * index * Math.PI / POINTS),
      top: R * Math.sin(2 * index * Math.PI / POINTS),
    }
  }, [])

  return (
    <Animated.Text
      style={[styles.text, uas]}
    >
      {children}
    </Animated.Text>
  )
});



export default memo(DragCircle);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: Platform.select({ ios: 0, android: 10 }),
    paddingRight: 20,
  },
  text: {
    position: 'absolute',
    fontFamily: 'UbB',
  },
  textContainer: {
    top: '30%',
    overflow: 'hidden',
    position: 'absolute',
    height: 160,
    width: '100%',
    alignItems: 'center',
  },
  textCenter: {
    fontFamily: 'UbB',
    color: 'black',
    fontSize: 120,
  },
  view: {
    width: '50%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 25,
    alignItems: 'center',
    height: '90%',
  },
  textBottom: {
    position: 'absolute',
    bottom: Platform.select({ ios: -60, android: -30 }),
    fontFamily: 'UbB',
    fontSize: 100,
    color: 'black'
  },
  center: {
    position: 'absolute',
    width: 3,
    borderRadius: 10,
    bottom: Platform.select({ ios: -10, android: 0 }),
  },
  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: Platform.select({ ios: -40, android: 0 }),
    width: Width,
    height: 100
  }
})