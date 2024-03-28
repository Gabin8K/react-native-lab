import { View, Text, StyleSheet } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { Width } from '../utils/constants';

const N = 12;
const R = 80;

const Clock = () => {
  const [n, setN] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setN(n => n === N ? 0 : n + 1)
    }, 1000)
  }, [])


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Clock's</Text>
      <Animated.View>
        {Array(N).fill('').map((_, i) => (
          <Square
            key={i}
            i={i}
            n={n}
          />
        ))}
      </Animated.View>
    </View>
  )
}


type SquareProps = {
  i: number,
  n: number
}

const Square: FC<SquareProps> = ({ i, n }) => {
  const rad = ((Math.PI * 2) / N) * i;

  const r = useSharedValue(R)

  const uas = useAnimatedStyle(() => {
    r.value = withTiming(n == i ? 0 : R);
    const rotate = interpolate(
      r.value,
      [0, R],
      [0, rad],
    );

    return {
      left: r.value * Math.cos(rad),
      top: r.value * Math.sin(rad),
      transform: [
        { rotate: `${rotate}rad` }
      ],
      backgroundColor: `rgba(0,0,0, .${i + 1})`
    }
  });

  return (
    <Animated.View
      style={[
        styles.square,
        uas
      ]}
    />
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    position: 'absolute',
    top: Width / 3,
    fontSize: 40,
    fontWeight: '700'
  },
  square: {
    position: 'absolute',
    width: 12,
    height: 12
  }
})

export default Clock