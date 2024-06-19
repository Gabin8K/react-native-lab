import React, { memo, ReactNode, useEffect } from 'react'
import { Text, PressableProps, StyleProp, Pressable, StyleSheet, View, ViewStyle } from 'react-native'
import { DateCell } from './CalendarComponent'
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated'


interface ButtonProps extends PressableProps {
  style?: StyleProp<ViewStyle>,
  active?: boolean,
  children: ReactNode,
}

type WeekComponentProps = {
  weeks: string[],
}

type CalendarComponentProps = {
  weeks: string[],
  days: DateCell[],
  onPress: (cell: DateCell) => void,
}

type ToastCalendarProps = {
  text: string,
  clear: () => void
}


export const CalendarButton = (props: ButtonProps) => {
  const { style, active, ...rest } = props
  return (
    <Pressable
      style={({ pressed }) => [
        styles.containerBtn,
        {
          borderBottomWidth: pressed ? 2 : 4,
          borderColor: active ? '#5b9bd5' : '#d1d5db',
          opacity: props.disabled ? 0.5 : 1
        },
        style
      ]}
      {...rest}
    >
      <Text
        style={[styles.textBtn, { color: active ? '#5b9bd5' : undefined }]}
      >
        {props.children}
      </Text>
    </Pressable>
  )
}


export const WeekComponent = (props: WeekComponentProps) => {
  return (
    <View style={styles.containerWeek}>
      {props.weeks.map((week) => (
        <Text
          key={week}
          style={styles.textWeek}
        >
          {week}
        </Text>
      ))}
    </View>
  )
}




export const ToastCalendar = (props: ToastCalendarProps) => {

  useEffect(() => {
    const unsubscribe = setTimeout(() => {
      props.clear()
    }, 2000)

    return () => clearTimeout(unsubscribe)
  }, [])

  return (
    <Animated.View
      entering={SlideInDown.duration(500)}
      exiting={SlideOutDown.duration(500)}
      style={styles.toastContainer}
    >
      <Text style={styles.textToast}>{props.text}</Text>
    </Animated.View>
  )
}




export const PageComponent = memo((props: CalendarComponentProps) => {
  const onPress = (cell: DateCell) => () => {
    props.onPress(cell)
  }

  return (
    <View style={styles.containerPage}>
      {props.weeks.map((week, i) => (
        <View
          key={`${week}-${i}`}
          style={styles.pageColumn}
        >
          {props.days.map((item, key) => (
            item.week === i ?
              <View
                key={key}
                style={styles.pageBtnContent}
              >
                <CalendarButton
                  style={styles.pageBtn}
                  disabled={!item.isCurrent}
                  active={item.active}
                  onPress={onPress(item)}
                >
                  {item.day}
                </CalendarButton>
              </View>
              :
              null
          ))}
        </View>
      ))}
    </View>
  )
})



const styles = StyleSheet.create({
  containerBtn: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 2,
  },
  textBtn: {
    fontFamily: 'UbM',
  },
  containerWeek: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    marginBottom: 15,
    borderBottomColor: '#d1d5db',
  },
  textWeek: {
    width: 40,
    textAlign: 'center',
    fontFamily: 'UbB',
    fontSize: 18,
  },
  containerPage: {
    flexDirection: 'row',
    height: 300,
    columnGap: 10,
  },
  pageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  pageColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: 10,
  },
  pageBtn: {
    width: 40,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageBtnContent: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageOffset: {
    width: 40,
    height: 50,
  },
  toastContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  textToast: {
    fontFamily: 'UbR',
  }
})