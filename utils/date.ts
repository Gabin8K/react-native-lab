export type DateCell = {
  day: number
  week: number
  active?: boolean
  isCurrent?: boolean
}



export const WEEKS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const currentDate = (date: Date) => {
  const length = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const d = new Date()
  return Array.from<any, DateCell>({ length }, (_, i) => {
    return {
      day: i + 1,
      isCurrent: true,
      active: i + 1 === d.getDate() && date.getMonth() === d.getMonth() && date.getFullYear() === d.getFullYear(),
      week: new Date(date.getFullYear(), date.getMonth(), i + 1).getDay()
    }
  })
}



export const prevDate = (date: Date, week: number) => {
  const length = new Date(date.getFullYear(), date.getMonth(), 0).getDate()
  const data: DateCell[] = []

  for (let i = length - week; i < length; i++) {
    data.push({
      day: i + 1,
      isCurrent: false,
      week: new Date(date.getFullYear(), date.getMonth() - 1, i + 1).getDay()
    })
  }
  return data
}


export const nextDate = (date: Date, week: number) => {
  const data: DateCell[] = []
  
  for (let i = 0; i < 6 - week; i++) {
    data.push({
      day: i + 1,
      isCurrent: false,
      week: new Date(date.getFullYear(), date.getMonth() + 1, i + 1).getDay()
    })
  }
  return data
}
