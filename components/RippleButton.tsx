import React, { forwardRef, memo, useCallback } from 'react'
import { GestureResponderEvent, StyleSheet, TouchableOpacity, TouchableWithoutFeedbackProps } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


interface Props extends TouchableWithoutFeedbackProps {
  ripple?: Ripple
}

type Ripple = {
  color?: string
  radius?: number
  opacity?: number
}

type Detail = {
  x: number
  y: number
  width: number
}


const RippleButton = forwardRef<TouchableOpacity, Props>((props, ref) => {
  const { onPressIn, onPressOut, ripple, style, ...rest } = props;
  const origin = useSharedValue<Detail>({ x: 0, y: 0, width: 0 });
  const radius = useSharedValue(0);
  const opacity = useSharedValue(0);

  const uas = useAnimatedStyle(() => ({
    opacity: opacity.value,
    width: radius.value,
    height: radius.value,
    backgroundColor: ripple?.color ?? 'grey',
    transform: [
      { translateX: origin.value.x - radius.value / 2 },
      { translateY: origin.value.y - radius.value / 2 }
    ]
  }), [ripple])

  const onPressedIn = useCallback((e: GestureResponderEvent) => {
    onPressIn?.(e);
    origin.value = { ...origin.value, x: e.nativeEvent.locationX, y: e.nativeEvent.locationY };
    radius.value = 0;
    opacity.value = 0;
    radius.value = withTiming(ripple?.radius ?? Math.sqrt(origin.value.width));
    opacity.value = withTiming(ripple?.opacity ?? 0.5);
  }, [onPressIn, ripple]);

  const onPressedOut = useCallback((e: GestureResponderEvent) => {
    onPressOut?.(e);
    opacity.value = withTiming(0, {}, f => f ? (radius.value = 0) : null);
  }, [onPressOut]);

  return (
    <TouchableOpacity
      ref={ref}
      activeOpacity={1}
      onLayout={({ nativeEvent: { layout } }) => origin.value = { ...origin.value, width: layout.width }}
      onPressIn={onPressedIn}
      onPressOut={onPressedOut}
      style={[styles.container, style]}
      {...rest}
    >
      {props.children}
      <Animated.View
        style={[styles.ripple, uas]}
      />
    </TouchableOpacity>
  )
})


export default memo(RippleButton);

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  ripple: {
    position: 'absolute',
    borderRadius: 1000,
    zIndex: 100,
  }
})