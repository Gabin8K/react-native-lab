import React from 'react'
import DragCircle from './DragCircle'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const DragRadius = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DragCircle />
    </GestureHandlerRootView>
  )
}

export default DragRadius;