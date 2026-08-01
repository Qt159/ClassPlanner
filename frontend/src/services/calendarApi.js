import axiosClient from './axiosClient'

// date: 'yyyy-MM-dd' (optional) — nếu không truyền thì lấy tuần hiện tại
export const getWeeklyCalendar = (date) =>
  axiosClient.get('/calendar/week', { params: date ? { date } : {} })
