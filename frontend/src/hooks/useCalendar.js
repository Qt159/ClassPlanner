import { useState, useEffect, useCallback } from 'react'
import { getWeeklyCalendar } from '../services/calendarApi'

export const useCalendar = () => {
  const [calendarData, setCalendarData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentDate, setCurrentDate] = useState(null) // null = tuần hiện tại

  const fetch = useCallback(async (date) => {
    setLoading(true)
    setError(null)
    try {
      const res = await getWeeklyCalendar(date)
      setCalendarData(res)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetch(currentDate) }, [fetch, currentDate])

  // Chuyển sang tuần trước
  const prevWeek = () => {
    const anchor = currentDate ? new Date(currentDate) : new Date()
    anchor.setDate(anchor.getDate() - 7)
    setCurrentDate(anchor.toISOString().split('T')[0])
  }

  // Chuyển sang tuần sau
  const nextWeek = () => {
    const anchor = currentDate ? new Date(currentDate) : new Date()
    anchor.setDate(anchor.getDate() + 7)
    setCurrentDate(anchor.toISOString().split('T')[0])
  }

  // Về tuần hiện tại
  const goToday = () => setCurrentDate(null)

  return { calendarData, loading, error, prevWeek, nextWeek, goToday, currentDate }
}
