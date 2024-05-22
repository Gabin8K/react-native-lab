import React, { FC, Fragment, memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface ListItem {
  id: number,
  title: string,
  emoji: string,
  onSelected?: (id: number) => void,
}

export type ListItemOneProps = ListItem & {
  active: boolean,
}

export type ListItemTwoProps = ListItem & {
  label?: string,
  description: string,
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
  return (
    <Fragment>
      {props.label ?
        <Text style={styles.label}>
          {props.label}
        </Text> :
        null
      }
      <View style={styles.container2}>
        <Text style={styles.emoji}>
          {props.emoji}{' '}
          <Text style={styles.title}>
            {props.title}
          </Text>
        </Text>
        <Text style={styles.text}>
          {props.description}
        </Text>
      </View>
    </Fragment>
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
    backgroundColor: '#f5f5f5',
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
  text: {
    fontSize: 16,
    fontFamily: 'UbR',
    color: '#2b2b2b',
  },
  label: {
    fontFamily: 'UbM',
    fontSize: 34,
    marginTop: 8
  }
})



const ListItem = {
  ListItemOne,
  ListItemTwo
};

export default ListItem



