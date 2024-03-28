import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import Animated, { SharedValue, useAnimatedGestureHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withDecay, withTiming } from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { Height, Width } from '../utils/constants';

type Props = {}
const titles = ['What\'s', 'up', 'mobiles', 'devs?']

const ScrollAnimated = (props: Props) => {
  const x = useSharedValue<number>(0);
  const translateX = useDerivedValue(() => Math.max(Math.min(x.value, 0), -Width * (titles.length - 1)))
  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { startX: number }>({
    onStart: (_, ctx) => (ctx.startX = translateX.value),
    onActive: (event, ctx) => (x.value = event.translationX + ctx.startX),
    onEnd: (event, _) => x.value = withDecay({ velocity: event.velocityX })
  })

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={styles.container}>
        {titles.map((title, i) => (
          <Page
            key={i}
            title={title}
            index={i}
            x={translateX}
          />
        ))}
      </Animated.View>
    </PanGestureHandler>
  )
}


interface Pageprops {
  index: number;
  title: string;
  x: SharedValue<number>
}


const Page: FC<Pageprops> = ({ index, x, title, }) => {
  const offset = Width * index;
  const uas = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value + offset }
    ]
  }));

  return (
    <Animated.View
      style={[
        {
          ...styles.screen,
          backgroundColor: `rgba(0,0,256, .${index + 2})`
        },
        uas
      ]}
    >
      <Text style={styles.text}>{title.toUpperCase()}</Text>
    </Animated.View>
  )
}

export default ScrollAnimated

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  screen: {
    position: 'absolute',
    width: Width,
    height: Height,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 50,
    fontWeight: '700'
  }
})