import React, { FC, memo, useState } from 'react'
import { StyleSheet, Pressable, View } from 'react-native'
import Animated, { LinearTransition, SlideInUp, SlideOutDown, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { IconProps } from 'react-native-vector-icons/Icon'
import Ionicon from 'react-native-vector-icons/Ionicons'


type ButtonProps = IconProps & {
  onPress: () => void
}


const NUMBERS = Array.from({ length: 10 }, () => Array.from({ length: 10 }, (_, j) => `${j}`))



export default function AnimationNumbers() {
  const [count, setCount] = useState(0)

  return (
    <View
      style={style.container}
    >
      <View
        style={style.numbers}
      >
        {NUMBERS.map((numbers, i) => numbers.map((number, j) => (
          number === count.toString()[i] ?
            <Animated.Text
              key={`${i}-${j}`}
              style={style.text}
              entering={SlideInUp}
              exiting={SlideOutDown}
              layout={LinearTransition}
            >
              {number}
            </Animated.Text> :
            null
        )))}
      </View>
      <View
        style={style.footer}
      >
        <Button
          name={'remove-sharp'}
          onPress={() => {
            if (count === 0) return null
            setCount(c => c - 1)
          }}
        />
        <Button
          name={'refresh'}
          color={'#d26d66'}
          onPress={() => setCount(0)}
        />
        <Button
          name={'add'}
          onPress={() => setCount(c => c > 0 ? c * 10 : c + 1)}
        />
      </View>
    </View>
  )
}




const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const Button: FC<ButtonProps> = memo(({ onPress, ...props }) => {
  const active = useSharedValue(false)

  const uas = useAnimatedStyle(() => {
    const scale = withTiming(active.value ? .92 : 1)
    const backgroundColor = withTiming(active.value ? '#9d9d9d' : '#e6e6e6')
    return {
      backgroundColor,
      transform: [{ scale }]
    }
  }, [])

  return (
    <AnimatedPressable
      onPressIn={() => (active.value = true)}
      onPressOut={() => (active.value = false)}
      onPress={onPress}
      style={[style.button, uas]}
    >
      <Ionicon
        size={30}
        color={'black'}
        {...props}
      />
    </AnimatedPressable>
  )
})



const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  numbers: {
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily: 'UbB',
    fontSize: 50,
  },
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    columnGap: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
})