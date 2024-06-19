import React, { useEffect } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import Animated, { interpolate, useAnimatedProps, useDerivedValue, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { Circle, Path, Svg } from 'react-native-svg';

type Props = {}
const { width, height } = Dimensions.get('window')
const aspectRatio = width / height

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);


const SvgComponent = (props: Props) => {
  const progress = useSharedValue(0)

  const data = useDerivedValue(() => {
    return {
      qx: 50,
      qy: interpolate(progress.value, [0, 1], [50, 60]),
      cy: interpolate(progress.value, [0, 1], [50, 62]),
    }
  }, [])

  const uapPath = useAnimatedProps(() => {
    const path = `M 0 50 Q 40 ${data.value.qy}, 60 55 T 100 50 V 200 H 0 Z`;
    return {
      d: path,
    };
  }, []);

  const uapCircle = useAnimatedProps(() => {
    return {
      cx: 45,
      cy: data.value.cy,
      r: 1,
    };
  }, []);


  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 500 }), -1, true)
  }, [])

  return (
    <Svg
      width={'100%'}
      height={'100%'}
      viewBox={`0 0 100 100`}
      fill={'grey'}
    >
      <AnimatedCircle
        animatedProps={uapCircle}
      />
      <AnimatedPath
        animatedProps={uapPath}
      />
    </Svg>
  )
}

export default SvgComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    aspectRatio,
    alignItems: 'center',
    justifyContent: 'center'
  }
})