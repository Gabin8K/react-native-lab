import React from "react"
import CalendarComponent from "../components/Calendar/CalendarComponent"
import { GestureHandlerRootView } from "react-native-gesture-handler"

const Index = () => {
  return (
    <GestureHandlerRootView
      style={{ flex: 1 }}
    >
      <CalendarComponent />
    </GestureHandlerRootView>
  )
}


export default Index