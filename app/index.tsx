import React from "react"
import { StyleSheet, Text, View } from "react-native"
import RippleButton from "../components/RippleButton"


const Index = () => {

  return (
    <View style={styles.container}>
      <RippleButton
        ripple={{
          color: 'grey',
          radius: 300,
        }}
      >
        <Text style={styles.text}>
          Simple button
        </Text>
      </RippleButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    width: 150,
    textAlign: 'center',
    paddingVertical: 20,
    backgroundColor: "lightblue",
  }
})

export default Index