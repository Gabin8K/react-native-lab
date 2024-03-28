import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import Ionicon from 'react-native-vector-icons/Ionicons';

const N = 4;

interface FabProps {
  onPress?: (active: boolean) => void;
}

interface ButtonProps {
  index: number;
  active: boolean;
}


const Menu = () => {
  return (
    <View
      style={styles.container}
    >
      <MenuContent />
    </View>
  )
}


const MenuContent: FC = () => {
  const [active, setActive] = useState(false);
  return (
    <View style={styles.content}>
      {Array(N).fill('').map((_, i) => (
        <Button
          key={i}
          index={i}
          active={active}
        />
      ))}
      <Fab
        onPress={setActive}
      />
    </View>
  )
}


const Button: FC<ButtonProps> = ({ index, active }) => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const uas = useAnimatedStyle(() => {
    const alpha = ((index - 1) * Math.PI) / N;
    x.value = active ? withSpring(90 * Math.cos(alpha)) : withTiming(10)
    y.value = active ? withSpring(90 * Math.sin(alpha)) : withTiming(10)
    return {
      right: x.value,
      bottom: y.value,
    }
  })
  return (
    <Animated.View
      style={[
        styles.button,
        uas
      ]}
    />
  )
}




const Fab: FC<FabProps> = ({ onPress }) => {
  const [active, setActive] = useState(false);
  const uas = useAnimatedStyle(() => {
    return {
    }
  })
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        onPress?.(!active);
        setActive(a => !a)
      }}
    >
      <Animated.View
        style={[
          styles.fab,
          uas
        ]}
      >
        <Ionicon
          name={'add'}
          size={40}
          color={'rgba(0,0,0,.6)'}
        />
      </Animated.View>
    </TouchableOpacity>
  )

}


export default Menu

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  content: {
    position: 'absolute',
    bottom: 25,
    right: 5
  },
  fab: {
    backgroundColor: '#c1c1c1',
    width: 70,
    height: 70,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 50,
    position: 'absolute',
    backgroundColor: '#decccc'
  }
})