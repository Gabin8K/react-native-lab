import { StyleSheet, View } from 'react-native'
import React, { FC, memo } from 'react'
import Animated, { FadeIn, } from 'react-native-reanimated';

type HeaderIngredientProps = {
  hidden: boolean;
}

const HeaderIngredient: FC<HeaderIngredientProps> = (props) => {
  const { hidden } = props;

  return (
    <View style={styles.container}>
      {!hidden ?
        <Animated.Text
          style={styles.title}
          entering={FadeIn}
        >
          Select Ingredients
        </Animated.Text> :
        null
      }
    </View>
  )
}



export default memo(HeaderIngredient);

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'UbB',
    color: '#2b2b2b'
  },
})