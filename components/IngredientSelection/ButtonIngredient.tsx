import { Pressable, StyleSheet, Text } from 'react-native'
import React, { FC, PropsWithChildren, memo } from 'react'

type ButtonIngredientProps = PropsWithChildren<{
  onPress: () => void
}>;

const ButtonIngredient: FC<ButtonIngredientProps> = ({ children, onPress }) => {
  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
    >
      <Text style={styles.text} >{children}</Text>
    </Pressable>
  )
}


export default memo(ButtonIngredient);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    alignItems: 'center',
    backgroundColor: '#2b2b2b',
    paddingVertical: 15,
    borderRadius: 8,
    paddingHorizontal: 10,
    elevation: 3,
  },
  text: {
    fontFamily: 'UbM',
    fontSize: 18,
    color: 'white',
  }
})