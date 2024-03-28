import React, { FC } from "react"
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import Animated, { SharedValue, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { DragItem, TPosition } from "./DragItem";

type TDodo = {
  emoji: string;
  list: number[];
  emojiBgColor: string;
  title: string;
  description: string;
}

type RenderItemProps = TDodo & { active: SharedValue<boolean> }


const TODO_ITEMS: TDodo[] = [
  {
    emoji: '🍔',
    emojiBgColor: '#f8f8f8',
    list: [1, 3],
    title: 'Burger',
    description: 'Eat a burger'
  },
  {
    emoji: '🍕',
    emojiBgColor: '#deeaf6',
    list: [0, 2, 4],
    title: 'Pizza',
    description: 'Eat a pizza'
  },
  {
    emoji: '🍣',
    emojiBgColor: '#fffcec',
    list: [1, 3],
    title: 'Sushi',
    description: 'Eat a sushi'
  },
  {
    emoji: '🍦',
    emojiBgColor: '#beb4d0',
    list: [0, 2, 4],
    title: 'Ice Cream',
    description: 'Eat an ice cream'
  },
  {
    emoji: '🍩',
    emojiBgColor: '#f5eff5',
    list: [1, 2],
    title: 'Donut',
    description: 'Eat a donut'
  },
  {
    emoji: '🍪',
    emojiBgColor: '#d6e5f4',
    list: [0, 1, 2, 3, 4],
    title: 'Cookie',
    description: 'Eat a cookie'
  },
  {
    emoji: '🍫',
    emojiBgColor: '#f8f8f8',
    list: [0, 1, 2, 3, 4],
    title: 'Chocolate',
    description: 'Eat a chocolate'
  },
  {
    emoji: '🍭',
    emojiBgColor: '#deeaf6',
    list: [1, 3],
    title: 'Lollipop',
    description: 'Eat a lollipop'
  },
  {
    emoji: '🍬',
    emojiBgColor: '#f9fafb',
    list: [0, 2, 4],
    title: 'Candy',
    description: 'Eat a candy'
  },
  {
    emoji: '🍺',
    emojiBgColor: '#e0e0e0',
    list: [1, 3],
    title: 'Beer',
    description: 'Drink a beer'
  }
]

const DragContainer = () => {
  const positions = useSharedValue<TPosition>(
    Object.assign({}, ...Array(10).fill(0).map((_, i) => ({ [i]: i })))
  );

  return (
    <GestureHandlerRootView style={{ flex: 1}} >
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor={'#f7f7f7'}
        />
        {Object.keys(positions.value).map((key) => (
          <DragItem
            key={key}
            id={Number(key)}
            positions={positions}
          >
            {(active) =>
              <RenderItem
                active={active}
                {...TODO_ITEMS[Number(key)]}
              />
            }
          </DragItem>
        ))}
      </View>
    </GestureHandlerRootView>
  )
}



export const RenderItem: FC<RenderItemProps> = (props) => {
  const { active, emoji, emojiBgColor, list, title, description } = props;
  const uas = useAnimatedStyle(() => {
    const shadowOpacity = withTiming(active.value ? 0.29 : 0);
    const elevation = withTiming(active.value ? 7 : 0);
    return {
      shadowOpacity,
      elevation
    }
  }, []);

  return (
    <Animated.View
      style={[styles.content, uas]}
    >
      <View style={styles.row}>
        <View style={[styles.emoji, { backgroundColor: emojiBgColor }]}>
          <Text style={styles.emojiText}>{emoji}</Text>
        </View>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
      <View style={styles.list}>
        {Array(5).fill(1).map((_, i) => (
          <View
            key={i}
            style={styles.icon}
          >
            <View
              style={{
                width: list.includes(i) ? 20 : 10,
                height: list.includes(i) ? 20 : 10,
                backgroundColor: emojiBgColor,
                borderRadius: 8,
              }}
            />
          </View>
        ))}
      </View>
    </Animated.View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  content: {
    height: 60,
    paddingHorizontal: 10,
    width: '96%',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowRadius: 4.65,
  },
  row: {
    columnGap: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  emoji: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiText: {
    fontSize: 20
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  description: {
    color: '#666',
    fontSize: 13,
    marginTop: 2
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  icon: {
    width: 24,
    alignItems: 'center',
  },
})

export default DragContainer