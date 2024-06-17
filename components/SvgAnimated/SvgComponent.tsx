import React, { useEffect } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import Animated, { interpolate, useAnimatedProps, useDerivedValue, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { Path, Svg } from 'react-native-svg';

type Props = {}
const { width, height } = Dimensions.get('window')
const aspectRatio = width / height

const AnimatedPath = Animated.createAnimatedComponent(Path);


const SvgComponent = (props: Props) => {
  const progress = useSharedValue(0)

  const data = useDerivedValue(() => {
    return {
      qx: 50,
      qy: interpolate(progress.value, [0, 1], [50, 60])
    }
  }, [])

  const uasp = useAnimatedProps(() => {
    const path = `M 0 50 L 25 50 Q 50 ${data.value.qy}, 75 50 H 100 V 200 H 0 Z`;
    return {
      d: path,
    };
  }, []);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1), -1, true)
  }, [])

  return (
    <Svg
      width={'100%'}
      height={'100%'}
      viewBox={`0 0 100 100`}
    >
      <AnimatedPath
        animatedProps={uasp}
        fill={'grey'}
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