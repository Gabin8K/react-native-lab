import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Rect, Svg } from 'react-native-svg';

const { width, height } = Dimensions.get('screen');

type Props = {}


const SvgComponent = (props: Props) => {
  return (
    <View style={styles.container}>
      <Svg
        viewBox={'100 100 0 0'}
      >
        <Rect
          x={0}
          y={0}
          width={20}
          height={20}
          fill={'orange'}
          stroke={'grey'}
        />
      </Svg>
    </View>
  )
}

export default SvgComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})