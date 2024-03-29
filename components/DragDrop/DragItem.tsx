import { FC, memo, useMemo } from "react";
import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { SharedValue, useAnimatedReaction, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";


export type TPosition = Record<number, number>;
type DragItemProps = Item & {};
type Item = {
  id: number;
  positions: SharedValue<TPosition>;
  children?: (active: SharedValue<boolean>) => React.ReactNode;
}

export const ITEM_HEIGHT = 70;

const getPosition = (index: number) => {
  'worklet';
  return index * ITEM_HEIGHT;
}
const getOrder = (translateY: number) => {
  'worklet';
  return Math.round(translateY / ITEM_HEIGHT);
}



export const DragItem: FC<DragItemProps> = memo((props) => {
  const { id, positions, children } = props;
  const translateY = useSharedValue(getPosition(id));
  const offset = useSharedValue(getPosition(id));
  const translateX = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const active = useSharedValue(false);

  useAnimatedReaction(() => positions.value[id], (newOrder) => {
    translateY.value = withTiming(getPosition(newOrder));
  }, [])

  const gesture = useMemo(() =>
    Gesture.Pan()
      .onStart((e) => {
        active.value = true;
        offset.value = translateY.value;
        translateY.value = e.translationY + offset.value;

        offsetX.value = translateX.value;
        translateX.value = e.translationX + offsetX.value;
      })
      .onChange((e) => {
        translateY.value = e.translationY + offset.value;
        translateX.value = e.translationX + offsetX.value;

        const oldOrder = positions.value[id];
        const newOrder = getOrder(translateY.value);
        if (newOrder != oldOrder) {
          const idToSwap = Object.keys(positions.value).find((key) => positions.value[Number(key)] === newOrder);
          if (!idToSwap) return;
          const newPositions = JSON.parse(JSON.stringify(positions.value));
          newPositions[id] = newOrder;
          newPositions[idToSwap] = oldOrder;
          positions.value = newPositions;
        }
      })
      .onFinalize(() => {
        translateY.value = withTiming(getPosition(positions.value[id]));
        translateX.value = withTiming(0);
        active.value = false;
      }),
    []);

  const uas = useAnimatedStyle(() => {
    const zIndex = active.value ? 100 : 0;
    return {
      zIndex,
      transform: [
        { translateY: translateY.value },
        { translateX: translateX.value }
      ]
    }
  }, []);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, uas]}>
        {children?.(active)}
      </Animated.View>
    </GestureDetector>
  )
});



const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    height: ITEM_HEIGHT,
    columnGap: 10,
    alignItems: "center",
  }
});