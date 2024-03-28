import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { SlideInDown, SlideInUp, SlideOutDown, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

type Props = {}

const NUMBERS = Array(10000).fill(1).map((i, j) => i + j);

const Times = (props: Props) => {
  const [time, setTime] = useState(0);
  const t = useSharedValue(0);

  useEffect(() => {
    const subscrible = setInterval(() => {
      setTime(t => t + 1);
      t.value = t.value + 1;
    }, 1000);
    return () => clearInterval(subscrible);
  }, []);


  const uas = useAnimatedStyle(() => ({
    width: withTiming(t.value % 2 === 0 ? 100 : 0, { duration: 300 }),
    height: 10,
    backgroundColor: 'rgba(0,0,0,.1)'
  }))


  return (
    <View style={styles.content}>
    <View
      style={styles.container}
    >
      {NUMBERS.map(i => (
        i === time ?
          <Animated.View
            key={time}
            style={[styles.box]}
            entering={
              SlideInUp
                .springify()
                .damping(20)
                .duration(300)
            }
            exiting={SlideOutDown.duration(600)}
          >
            <Text style={styles.text}>
              {i}
            </Text>
          </Animated.View> :
          null
      ))}
      <Animated.View
        style={[uas]}
      />
    </View>
    </View>
  )
}

export default Times

const styles = StyleSheet.create({
  content : {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  container: {
    width: 100,
    height: 70,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,.1)',
    alignItems: 'center'
  },
  box: {
    width: 100,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 22,
  },
})