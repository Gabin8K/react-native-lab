import { StyleSheet, View } from 'react-native'
import React, { FC, useCallback, useState } from 'react'
import HeaderIngredient from './HeaderIngredient'
import { StatusBar } from 'expo-status-bar'
import Animated from 'react-native-reanimated'
import IngredientItem, { Ingredient } from './IngredientItem'
import { Width } from '../../utils/constants'
import ButtonIngredient from './ButtonIngredient'


const INGREDIENTS: Ingredient[] = [
  { id: 1, label: 'Tomato' },
  { id: 2, label: 'Onion' },
  { id: 3, label: 'Garlic' },
  { id: 4, label: 'Parsley' },
  { id: 5, label: 'Cilantro' },
  { id: 6, label: 'Cucumber' },
  { id: 7, label: 'Lemon' },
  { id: 8, label: 'Salt' },
  { id: 9, label: 'Pepper' },
  { id: 10, label: 'Olive Oil' },
  { id: 11, label: 'Vinegar' },
  { id: 12, label: 'Bell Pepper' },
  { id: 13, label: 'Mint' },
  { id: 14, label: 'Cilantro' },
  { id: 15, label: 'Cucumber' },
  { id: 16, label: 'Lemon' },
  { id: 17, label: 'Salt' },
  { id: 18, label: 'Pepper' },
]


const IncredientContainer: FC = () => {
  const [ingrediends, setIngrediends] = useState(INGREDIENTS);
  const [translateX, setTranslateX] = useState(Width);
  const [count, setCount] = useState(0);

  const onPress = useCallback(() => {
    setIngrediends(ingrediends => ingrediends.map(ingredient => ({
      ...ingredient,
    })));
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        style={'auto'}
        backgroundColor={'white'}
      />
      <HeaderIngredient
        hidden={translateX !== Width}
      />
      <View style={styles.content}>
        <Animated.View
          style={[styles.items]}
        >
          {ingrediends.map((ingredient, index) => (
            <IngredientItem
              key={index}
              count={count}
              translateX={translateX}
              setTranslateX={value => {
                setTranslateX(value);
                if (count === 3) return;
                setCount(c => c + 1);
              }}
              {...ingredient}
            />
          ))}
        </Animated.View>
      </View>
      <ButtonIngredient onPress={onPress}>
        Reset Recipes
      </ButtonIngredient>
    </View>
  )
}

export default IncredientContainer;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  content: {
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  items: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  }
})