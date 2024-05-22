import { ListRenderItemInfo, StyleSheet, View, ViewToken } from 'react-native'
import React, { FunctionComponent, useCallback, useMemo, useRef, useState } from 'react'
import ListItem, { Coord } from './ListItem'
import Animated from 'react-native-reanimated'
import { Receip, recettesCuisine } from '../../utils/constants'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'



const AnimatedList: FunctionComponent = () => {
  const [receips] = useState(recettesCuisine)
  const [coord, setCoord] = useState<Coord>()
  const [count, setCount] = useState(0)
  const [currentId, setCurrentId] = useState<number>()

  const insets = useSafeAreaInsets()

  const countRef = useRef(0)
  const listOne = useRef<Animated.FlatList<Receip>>(null)
  const listTwo = useRef<Animated.FlatList<Receip>>(null)

  const receipsLabels = useMemo(() => receips.filter(receip => receip.label), [receips])

  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      const index = receipsLabels.findIndex(receip => receip.id === viewableItems[0].item.id)
      if (index === -1) return null
      setCurrentId(viewableItems[0].item.id)
      listOne.current?.scrollToIndex({ index })
    }
    return null
  }, [receipsLabels])

  const renderItemOne = useMemo(() => ({ item }: ListRenderItemInfo<Receip>) => {
    return (
      <ListItem.ListItemOne
        {...item}
        active={item.id === currentId}
        onSelected={(id) => {
          setCurrentId(id)
          const index = receips.findIndex(receip => receip.id === item.id);
          if (index === -1) return null
          listTwo.current?.scrollToIndex({ index, animated: true })
        }}
      />
    )
  }, [currentId, receips])

  const renderItemTwo = useMemo(() => ({ item }: ListRenderItemInfo<Receip>) => {
    return (
      <ListItem.ListItemTwo
        {...item}
        onSelected={(coord) => {
          countRef.current++
          setCoord(coord as Coord)
        }}
      />
    )
  }, [])

  return (
    <View style={styles.container}>
      <LinearGradient
        style={[
          styles.header,
          {
            paddingTop: insets.top + 16,
            marginTop: -insets.top,
          }
        ]}
        colors={['rgba(32,46,60, .8)', 'rgba(255,255,255,.5)']}
        start={[.5, 0]}
        end={[.5, .7]}
      >
        <ListItem.ListItemHeader
          count={count}
        />
        <Animated.FlatList
          ref={listOne}
          horizontal
          data={receipsLabels}
          renderItem={renderItemOne}
          showsHorizontalScrollIndicator={false}
        />
      </LinearGradient>
      <Animated.FlatList
        ref={listTwo}
        data={receips}
        style={styles.list}
        renderItem={renderItemTwo}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
      />
      {coord ?
        <ListItem.ListItemCountAnimated
          count={countRef.current}
          coord={coord}
          setCoord={setCoord}
          setCount={setCount}
        /> :
        null
      }
    </View>
  )
}


export default AnimatedList

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingLeft: 16,
    rowGap: 16,
    paddingBottom: 8
  },
  list: {
    marginRight: 16,
    marginLeft: 16,
  },
})