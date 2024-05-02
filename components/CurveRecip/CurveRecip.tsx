import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import Animated, { FadeOut, LinearTransition, useAnimatedStyle, withTiming } from 'react-native-reanimated';



export default function CurveRecip() {
  const [active, setActive] = useState(false);

  const uas1 = useAnimatedStyle(() => {
    const rotate = withTiming(active ? 45 : 0);
    return {
      transform: [{ rotate: `${rotate}deg` }]
    }
  })

  const uas2 = useAnimatedStyle(() => {
    const rotate = withTiming(active ? -45 : 0);
    return {
      transform: [{ rotate: `${rotate}deg` }]
    }
  })

  useEffect(() => {
    setTimeout(() => {
      setActive(true)
    }, 2000)
  }, [])

  return (
    <Animated.View
      layout={LinearTransition}
      style={styles.container}
    >
      <Animated.View style={[styles.bare, uas1]} />
      {!active ?
        <Animated.View
          exiting={FadeOut}
          style={styles.bare}
        /> :
        null
      }
      <Animated.View style={[styles.bare, uas2]} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bare: {
    width: 50,
    height: 4,
    borderRadius: 5,
    backgroundColor: 'red'
  }
})