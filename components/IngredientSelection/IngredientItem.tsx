import { Platform, Pressable, StyleSheet } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons';
import React, { FC, memo, useCallback } from 'react'
import Animated, { LinearTransition, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export type Ingredient = {
  id: number;
  label: string;
}

type IngredientItemProps = Ingredient & {
  count: number;
  translateX: number;
  setTranslateX: (value: number) => void;
}

const ANIMATION_DURATION = 500;
const TARGET_ORIGIN_Y = Platform.select({ ios: -380, android: -420 }) ?? 0;
const PADDING = 10;
const MARGIN = 10;

export const getWidth = (label: string) => {
  'worklet';
  return 2 * PADDING + label.length * 13;
}

const PressableAnimated = Animated.createAnimatedComponent(Pressable);

const IngredientItem: FC<IngredientItemProps> = (props) => {
  const { id, label, count, translateX, setTranslateX } = props;
  const active = useSharedValue(false);
  const transX = useSharedValue(0);


  const uas = useAnimatedStyle(() => {
    const width = getWidth(label);
    const position = active.value ? 'absolute' : 'relative';
    const translateY = withTiming(active.value ? TARGET_ORIGIN_Y : 0, { duration: ANIMATION_DURATION });
    return {
      width,
      position,
      left: transX.value,
      transform: [
        { translateY }
      ]
    }
  }, []);

  const onPress = useCallback(() => {
    const x = translateX - (getWidth(label) + MARGIN);
    active.value = true;
    transX.value = withTiming(x, { duration: ANIMATION_DURATION });
    setTranslateX(x);
  }, [translateX]);

  return (
    <PressableAnimated
      style={[styles.container, uas]}
      layout={LinearTransition}
      onPress={onPress}
    >
      <Animated.Text style={styles.label}>{label}</Animated.Text>
      <Ionicon
        name={'add'}
        color={'white'}
        size={24}
      />
    </PressableAnimated>
  )
}

export default memo(IngredientItem)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: '#9d9d9d'
  },
  label: {
    fontSize: 15,
    fontFamily: 'UbB',
    color: 'white',
  }
})