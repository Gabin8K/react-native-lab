import React, { FC, memo } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, { interpolate, SharedValue, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Width } from '../../utils/constants';


type PointProps = {
  i: number;
  translateX: SharedValue<number>;
  children: React.ReactNode;
}

const POINTS = 20;
const R = 100;


const DragCircle: FC = () => {
  const translateX = useSharedValue(0);
  const offset = useSharedValue(0);

  const gesture = Gesture
    .Pan()
    .onChange((e) => {
      const x = e.translationX + offset.value;
      translateX.value = interpolate(
        x,
        [-R, R],
        [-POINTS, POINTS]
      )
    })
    .onEnd((e) => {
      offset.value = e.translationX + offset.value;
    })

  const uas = useAnimatedStyle(() => {
    const height = withTiming(offset.value === 0 ? 10 : 80)
    return {
      height
    }
  }, [])

  return (
    <GestureDetector gesture={gesture}>
      <View
        style={styles.flex}
      >
        <Animated.View
          style={[styles.center, uas]}
        />
        <View style={styles.container}>
          {Array.from({ length: POINTS }, (_, i) => (
            <PointComponent
              key={i}
              i={i}
              translateX={translateX}
            >
              {String(i).padEnd(2, '0')}
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
    return {
      left: R * Math.cos((2 * index * Math.PI) / POINTS),
      top: R * Math.sin((2 * index * Math.PI) / POINTS)
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
    width: Width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey'
  },
  text: {
    position: 'absolute',
    fontFamily: 'UbB',
    textAlign: 'center',
  },
  center: {
    position: 'absolute',
    bottom: '48%',
    left: '50%',
    width: 4,
    borderRadius: 10,
    backgroundColor: 'black'
  }
})