import { View, StyleSheet, Text, ListRenderItemInfo, FlatList } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CalendarButton, PageComponent, ToastCalendar, WeekComponent } from './CalendarItems'
import Animated from 'react-native-reanimated'
import { currentDate, DateCell, MONTHS, nextDate, prevDate } from '../../utils/date'
import { Width } from '../../utils/constants'

type Props = {}

type DateState = {
  date: Date,
  dateCell: DateCell[]
}


const CalendarComponent = (props: Props) => {

  const [dates, setDates] = useState<DateState[]>([])
  const [cell, setCell] = useState<DateCell>()
  
  const ref = useRef<FlatList>(null)
  const offset = useRef(Width)

  // const display = date?.[1]?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) ?? 'Empty'

  const buildCalendar = useCallback((date: Date) => {
    let data = currentDate(date)
    const firstDay = data.find((d) => d.day === 1)
    const lastDay = data.at(-1)

    if (!lastDay || !firstDay) return data

    if (firstDay.week !== 0) {
      const prevData = prevDate(date, firstDay.week)
      data = [...prevData, ...data]
    }

    if (lastDay.week !== 6) {
      const nextData = nextDate(date, lastDay.week)
      data = [...data, ...nextData]
    }

    return data
  }, [])


  useEffect(() => {
    const date = new Date()
    const prevDate = new Date()
    const nextDate = new Date()
    
    prevDate.setMonth(date.getMonth() - 1)
    nextDate.setMonth(date.getMonth() + 1)

    setDates([
      { date: prevDate, dateCell: buildCalendar(prevDate) },
      { date: date, dateCell: buildCalendar(date) },
      { date: nextDate, dateCell: buildCalendar(nextDate) },
    ])
  }, [])


  const renderItem = useMemo(() => ({ item }: ListRenderItemInfo<DateState>) => {
    return (
      <PageComponent
        days={item.dateCell}
        onPress={() => { }}
      />
    )
  }, [])


  const addMonth = useCallback(() => {
    setDates((dates) => {
      const date = new Date(dates.at(-1)?.date!!)
      date.setMonth(date.getMonth() + 1)
      return [
        ...dates,
        { date, dateCell: buildCalendar(date) }
      ]
    })
  }, [])


  const subMonth = useCallback(() => {
    setDates((dates) => {
      const date = new Date(dates.at(0)?.date!!)
      date.setMonth(date.getMonth() - 1)
      return [
        { date, dateCell: buildCalendar(date) },
        ...dates,
      ]
    })
  }, [])


  const onPressNext = () => {
    ref.current?.scrollToOffset({ offset: offset.current+Width, animated: true })
    offset.current += Width
  }


  const onPressPrev = () => {
    ref.current?.scrollToOffset({ offset: offset.current - Width, animated: true })
    offset.current -= Width
  }

  const onPress = (cell: DateCell) => {
    setCell(cell)
  }

  const clear = () => {
    setCell(undefined)
  }
  console.log(dates.length)
  return (
    <View style={styles.container}>
      <Text style={styles.textMonth}>{'display'}</Text>
      <WeekComponent />
      <Animated.FlatList
        ref={ref}
        horizontal
        data={dates}
        pagingEnabled
        renderItem={renderItem}
        onEndReached={addMonth}
        onEndReachedThreshold={.8}
        showsHorizontalScrollIndicator={false}
      />
      < View style={styles.footer}>
        <CalendarButton onPress={onPressPrev} >
          {'<'}
        </CalendarButton>
        <CalendarButton onPress={onPressNext} >
          {'>'}
        </CalendarButton>
      </View>
      {/* {cell ?
        <ToastCalendar
          text={`${cell.day} ${MONTHS[date?.[1].date.getMonth()]} ${date?.[1].date.getFullYear()}`}
          clear={clear}
        /> :
        null
      } */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '20%',
    rowGap: 10,
    alignItems: 'center',
  },
  textMonth: {
    fontFamily: 'UbB',
    fontSize: 40,
    marginBottom: 40
  },
  footer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 120,
    marginTop: 80,
    columnGap: 20
  }
})

export default CalendarComponent