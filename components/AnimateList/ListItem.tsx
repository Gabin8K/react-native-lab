import React, { FC, Fragment, memo, useCallback, useEffect } from "react";
import { GestureResponderEvent, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Width } from "../../utils/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ListItem {
  id: number,
  title: string,
  emoji: string,
  onSelected?: (item: number) => void,
}

export type Coord = {
  x: number,
  y: number,
}

export type ListItemOneProps = ListItem & {
  active: boolean,
}

export type ListItemTwoProps = ListItem & {
  label?: string,
  description: string,
  onSelected: (coord: Coord) => void,
}

export type ListItemCountAnimatedProps = {
  count: number,
  coord: Coord,
  setCoord: (coord?: Coord) => void,
  setCount: (count: number) => void,
}


const AnimatedPressable = Animated.createAnimatedComponent(Pressable)


const ListItemOne: FC<ListItemOneProps> = memo((props) => {
  const scale = useSharedValue(1)

  const uas = useAnimatedStyle(() => ({
    borderColor: withTiming(props.active ? '#202e3c' : 'transparent'),
    transform: [{ scale: scale.value }]
  }), [props.active])

  return (
    <AnimatedPressable
      onPressIn={() => (scale.value = withTiming(.92))}
      onPressOut={() => (scale.value = withTiming(1))}
      onPress={() => props.onSelected?.(props.id)}
      style={[styles.container1, uas]}
    >
      <Text style={styles.textBtn}>
        <Text style={styles.textBtnCategory}>
          Catégorie{' '}
        </Text>
        {props.title[0]} {props.emoji}
      </Text>
    </AnimatedPressable>
  )
})



const ListItemTwo: FC<ListItemTwoProps> = memo((props) => {

  const activeValue = useSharedValue(false)

  const onPress = useCallback((e: GestureResponderEvent) => {
    const { pageX, pageY } = e.nativeEvent
    props.onSelected?.({ x: pageX, y: pageY - 55 })
  }, [])

  const uas = useAnimatedStyle(() => {
    const scale = withTiming(activeValue.value ? .98 : 1)
    const backgroundColor = withTiming(activeValue.value ? '#e0e0e0' : '#f5f5f5')
    return {
      backgroundColor,
      transform: [{ scale }]
    }
  }, [])

  return (
    <Fragment>
      {props.label ?
        <Text style={styles.label}>
          {props.label}
        </Text> :
        null
      }
      <AnimatedPressable
        onPress={onPress}
        onPressIn={() => (activeValue.value = true)}
        onPressOut={() => (activeValue.value = false)}
        style={[styles.container2, uas]}
      >
        <Text style={styles.emoji}>
          {props.emoji}{' '}
          <Text style={styles.title}>
            {props.title}
          </Text>
        </Text>
        <Text style={styles.text}>
          {props.description}
        </Text>
      </AnimatedPressable>
    </Fragment>
  )
})



const ListItemHeader: FC<{ count: number }> = memo(({ count }) => {

  return (
    <View style={styles.row}>
      <Text style={styles.titleHeader}>
        Recette de cuisine
      </Text>
      <View style={styles.count}>
        <Text style={styles.textCount}>
          {count}
        </Text>
      </View>
    </View>
  )
})




const ListItemCountAnimated: FC<ListItemCountAnimatedProps> = memo(({ count, coord, setCoord, setCount }) => {
  const insets = useSafeAreaInsets()
  const left = useSharedValue(coord?.x ?? 0)
  const top = useSharedValue(coord?.y ?? 0)
  const scale = useSharedValue(.8)

  const uas = useAnimatedStyle(() => ({
    zIndex: 999,
    position: 'absolute',
    top: top.value,
    left: left.value,
    transform: [{ scale: scale.value }]
  }), [])

  useEffect(() => {
    const size = Platform.select({ ios: 43, default: 13 })
    left.value = withTiming(Width - 50, { duration: 500 }, finished => {
      if (finished) {
        runOnJS(setCount)(count)
      }
    })
    top.value = withTiming(insets.top - size, { duration: 600 }, finished => {
      if (finished) {
        runOnJS(setCoord)(undefined)
      }
    })
    scale.value = withTiming(1, { duration: 600 })
  }, [])

  return (
    <Animated.View
      style={[styles.count, uas]}
    >
      <Text style={styles.textCount}>
        {count}
      </Text>
    </Animated.View>
  )
})






const styles = StyleSheet.create({
  container1: {
    marginRight: 8,
    marginLeft: 1.5,
    paddingHorizontal: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1.5,
  },
  textBtn: {
    height: 48,
    fontSize: 18,
    lineHeight: 42,
    color: '#202e3c',
    fontFamily: 'UbB',
    textAlign: 'center',
  },
  textBtnCategory: {
    fontFamily: 'UbM',
    fontSize: 14,
  },
  container2: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  emoji: {
    fontSize: 38,
  },
  title: {
    fontFamily: 'UbB',
    fontSize: 22,
    color: '#202e3c',
  },
  titleHeader: {
    fontFamily: 'UbB',
    fontSize: 28,
  },
  text: {
    fontSize: 16,
    fontFamily: 'UbR',
    color: '#2b2b2b',
  },
  label: {
    fontFamily: 'UbM',
    fontSize: 34,
    marginTop: 8
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 16,
  },
  count: {
    width: 34,
    height: 34,
    borderRadius: 34,
    backgroundColor: '#202e3c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCount: {
    fontSize: 18,
    fontFamily: 'UbB',
    color: 'white',
  }
})



const ListItem = {
  ListItemOne,
  ListItemTwo,
  ListItemHeader,
  ListItemCountAnimated,
};

export default ListItem



