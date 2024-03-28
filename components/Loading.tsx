import React, { FC, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated';

type Props = {}
const N = Array(10).fill(1).map((i, j) => i + j)

const Loading = (props: Props) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.circle,
          { backgroundColor: 'grey' }
        ]}
      />
      {N.map((_, index) => (
        <Circle
          key={index}
          index={index}
        />
      ))}
    </View>
  )
}

interface CircleProps {
  index: number;
}

const Circle: FC<CircleProps> = ({ index }) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);
  const uas = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { scale: scale.value }
      ]
    }
  });

  useEffect(() => {
    scale.value = withDelay(index * 500, withRepeat(withTiming(4, { duration: 2000 }), -1, false));
    opacity.value = withDelay(index * 500, withRepeat(withTiming(0, { duration: 2000 }), -1, false));
  }, [])


  return (
    <Animated.View
      style={[
        uas,
        styles.circleAbsolute
      ]}
    />
  )
}

export default Loading

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 80,
  },
  circleAbsolute: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: 'grey'
  }
})