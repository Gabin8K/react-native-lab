import { View, StyleSheet, Text } from 'react-native'
import React, { useMemo, useState } from 'react'
import { CalendarButton, PageComponent, ToastCalendar, WeekComponent } from './CalendarItems'

type Props = {}

export type DateCell = {
  day: number
  week: number
  active?: boolean
  isCurrent?: boolean
}

const WEEKS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const currentDate = (date: Date) => {
  const length = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  return Array.from<any, DateCell>({ length }, (_, i) => {
    return {
      day: i + 1,
      isCurrent: true,
      active: i + 1 === new Date().getDate(),
      week: new Date(date.getFullYear(), date.getMonth(), i + 1).getDay()
    }
  })
}

const prevDate = (date: Date, week: number) => {
  const length = new Date(date.getFullYear(), date.getMonth(), 0).getDate()
  return Array.from<any, DateCell>({ length }, (_, i) => {
    return {
      day: i + 1,
      isCurrent: false,
      week: new Date(date.getFullYear(), date.getMonth() - 1, i + 1).getDay()
    }
  }).slice(-week)
}

const nextDate = (date: Date, week: number) => {
  const length = new Date(date.getFullYear(), date.getMonth() + 2, 0).getDate()
  return Array.from<any, DateCell>({ length }, (_, i) => {
    return {
      day: i + 1,
      isCurrent: false,
      week: new Date(date.getFullYear(), date.getMonth() + 1, i + 1).getDay()
    }
  })
    .slice(0, 6 - week)
}




const CalendarComponent = (props: Props) => {

  const [date, setDate] = useState(new Date())
  const [cell, setCell] = useState<DateCell>()

  const calendar = useMemo(() => {
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
  }, [date])


  const addMonth = () => {
    setDate(new Date(date.setMonth(date.getMonth() + 1)))
  }

  const subMonth = () => {
    setDate(new Date(date.setMonth(date.getMonth() - 1)))
  }

  const onPress = (cell: DateCell) => {
    setCell(cell)
  }

  const clear = ()=>{
    setCell(undefined)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textMonth}>{MONTHS[date.getMonth()]}</Text>
      <WeekComponent weeks={WEEKS} />
      <PageComponent
        key={Date.now()}
        weeks={WEEKS}
        days={calendar}
        onPress={onPress}
      />
      < View style={styles.footer}>
        <CalendarButton onPress={subMonth} >
          {'<'}
        </CalendarButton>
        <CalendarButton onPress={addMonth} >
          {'>'}
        </CalendarButton>
      </View>
      {cell ?
        <ToastCalendar
          text={`${cell.day} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`}
          clear={clear}
        /> :
        null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMonth: {
    fontFamily: 'UbB',
    fontSize: 50,
    marginBottom: 50
  },
  footer: {
    flexDirection: 'row',
    marginTop: 50,
    columnGap: 20
  }
})

export default CalendarComponent