import { useMemo } from "react"
import { StyleSheet, TextInput, View } from "react-native"
import { } from "react-native"
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler"
import Animated, { runOnJS, useAnimatedProps, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

type Props = {
  onChange: (value: number) => void
}

const TextInputAnimated = Animated.createAnimatedComponent(TextInput)

export default function Slider(props: Props) {

  const offset = useSharedValue(0)
  const transX = useSharedValue(0)
  const active = useSharedValue(false)

  const gesture = useMemo(() => Gesture.Pan()
    .onStart(() => (active.value = true))
    .onChange((e) => {
      const x = offset.value + e.translationX
      if (x < 0 || x > 300) return
      transX.value = x
      runOnJS(props.onChange)(Math.round(transX.value * 100 + 1))
    })
    .onEnd(() => {
      offset.value = transX.value
      active.value = false
    }), [])


  const uasThumb = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: transX.value },
        { scale: withTiming(active.value ? 1.3 : 1) }
      ],
    }
  }, [])

  const uasTrack = useAnimatedStyle(() => {
    return {
      width: `${transX.value * 100 / 300}%`
    }
  }, [])

  const uap = useAnimatedProps(() => {
    return {
      text: `${Math.round(transX.value * 100 / 300)}`,
    }
  })

  return (
    <GestureHandlerRootView
      style={styles.center}
    >
      <View style={styles.container}>
        <Animated.View style={[uasTrack, styles.track]} />
        <GestureDetector gesture={gesture}>
          <Animated.View style={[uasThumb, styles.thumb]} />
        </GestureDetector>
      </View>
      <TextInputAnimated
        editable={false}
        defaultValue={"0"}
        underlineColorAndroid={"transparent"}
        animatedProps={uap as any}
      />
    </GestureHandlerRootView>
  )
}


const styles = StyleSheet.create({
  center: {
    flex: 1,
    rowGap: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 2.5,
    width: 300,
    backgroundColor: '#e6e6e6'
  },
  track: {
    height: '100%',
    backgroundColor: '#121212'
  },
  thumb: {
    position: 'absolute',
    left: -9,
    width: 18,
    height: 18,
    borderWidth: 2,
    borderRadius: 18,
    backgroundColor: '#121212',
    borderColor: '#ffff',
  }
})