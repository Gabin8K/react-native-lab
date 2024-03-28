import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import Animated, { interpolate, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { Height, Width } from '../utils/constants'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'


const PerspectiveAnimation = () => {
  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.title}>Peut être ?</Text>
      </View>
      <Page />
    </View>
  )
}


const Page: FC = () => {
  const x = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { x: number }>({
    onStart: (_, ctx) => ctx.x = x.value,
    onActive: ({ translationX }, ctx) => {
      const abs = Math.abs(ctx.x + translationX)
      x.value = abs >= Width / 2 ? x.value : Math.max(translationX + ctx.x, 0)
    }
  });

  const uas = useAnimatedStyle(() => {
    const _x = interpolate(x.value, [0, Width], [0, Width / 2])
    const r = interpolate(x.value, [0, Width], [0, 50]);
    const degre = interpolate(x.value, [0, Width], [0, .5]);

    return {
      transform: [
        { translateX: _x },
        {perspective: -10},
        {perspective:100},
        {rotateY:`${degre}deg`}
      ],
      borderRadius: r
    }
  })

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[
          styles.page,
          uas
        ]}
      >
        <TouchableOpacity>
          <Ionicon
            name={'list'}
            color={'rgba(0,0,0,.8)'}
            size={28}
          />
        </TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  )
}

export default PerspectiveAnimation

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'white'
  },
  display: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.95)'
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: 'rgba(255,255,255,.8)'
  },
  page: {
    flex: 1,
    position: 'absolute',
    width: Width,
    height: Height,
    backgroundColor: 'white',
    paddingLeft: 5,
    paddingTop: 60
  },
})