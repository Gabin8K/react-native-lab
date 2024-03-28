import { StyleSheet, View } from 'react-native'
import React, { FC, PropsWithChildren, useMemo } from 'react'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated'

type Props = {}
const WIDTH = 6;

const GestureFile = (props: Props) => {
  const offsetX1 = useSharedValue(0);
  const offsetX2 = useSharedValue(0);
  const translateX1 = useSharedValue(0);
  const translateX2 = useSharedValue(10);

  const active1 = useSharedValue(false);

  const gesture1 = useMemo(() => Gesture.Pan()
    .onStart(() => {
      offsetX1.value = translateX1.value;
      active1.value = true;
    })
    .onUpdate(({ translationX }) => {
       translateX1.value = offsetX1.value + translationX
    })
    .onFinalize(() => (active1.value = false)), []);

  const gesture2 = useMemo(() => Gesture.Pan().onStart(() => (offsetX2.value = translateX2.value)).onUpdate(({ translationX }) => (translateX2.value = offsetX2.value + translationX)), []);

  const width = useDerivedValue(() => {
    return Math.abs(translateX1.value - translateX2.value);
  })

  const uas1 = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX1.value }]
  }));

  const uas2 = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX2.value }]
  }));

  const uas3 = useAnimatedStyle(() => ({
    width: width.value + 4,
    transform: [{ translateX: translateX1.value + WIDTH }]
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ParentGesture>
        <View style={styles.content}>
          <GestureDetector gesture={gesture1}>
            <Animated.View style={[uas1, styles.slideLeft]} />
          </GestureDetector>
          <Animated.View style={[styles.center, uas3]} />
          <GestureDetector gesture={gesture2}>
            <Animated.View style={[uas2, styles.slideRight]} />
          </GestureDetector>
        </View>
      </ParentGesture>
    </GestureHandlerRootView>
  )
}








const ParentGesture: FC<PropsWithChildren> = ({ children }) => {
  const offsetX = useSharedValue(0);
  const translateX = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onStart(() => (offsetX.value = translateX.value))
    .onUpdate(({ translationX }) => {
      translateX.value = offsetX.value + translationX;
    })
    .onFinalize(() => (translateX.value = 0));

  const uas = useAnimatedStyle(() => {
    const translate = translateX.value === 0 ? withTiming(0) : translateX.value;
    return {
      transform: [
        { translateX: translate },
      ]
    }
  })

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[uas, styles.container]}
      >
        {children}
      </Animated.View>
    </GestureDetector>
  )
}

export default GestureFile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  slideLeft: {
    width: WIDTH,
    height: 60,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    backgroundColor: 'grey'
  },
  slideRight: {
    width: WIDTH,
    height: 60,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    backgroundColor: 'grey'
  },
  center: {
    zIndex: -1,
    position: 'absolute',
    height: 60,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'grey'
  }
})