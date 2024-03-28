import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { Height, Width } from '../utils/constants'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'

const N = 200;

const LandingPage = () => {
  return (
    <View style={styles.container}>
      {Array(N).fill('').map((_, i) => (
        <Card
          key={i}
          i={i}
        />
      ))}
    </View >
  )
}


type CardProps = {
  i: number
}

const Card: FC<CardProps> = ({ i }) => {
  const uas = useAnimatedStyle(() => ({
    backgroundColor: `rgba(133, 10, 244, ${i/100})`
  }));

  return (
    <Animated.View
      style={[
        styles.card,
        uas
      ]}
    />
  )
}

export default LandingPage

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    width: Width,
    height: Height / N
  }
})