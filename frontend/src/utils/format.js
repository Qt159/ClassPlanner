// Format datetime: 08:30 - 10:00
export const formatTime = (isoString) => {
  if (!isoString) return ''
  const d = new Date(isoString)
  return d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
}

// Format date: Thứ Hai, 28/07
export const formatDateVN = (dateString) => {
  const d = new Date(dateString)
  return d.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit' })
}

// Format date ngắn: 28/07
export const formatShortDate = (dateString) => {
  const d = new Date(dateString)
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })
}

// Format datetime đầy đủ: 28/07/2025 08:30
export const formatDateTime = (isoString) => {
  if (!isoString) return ''
  const d = new Date(isoString)
  return d.toLocaleString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

// Format ngày hiện tại full: Thứ Bảy, 01 tháng 8, 2026
export const formatTodayFull = () => {
  return new Date().toLocaleDateString('vi-VN', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
  })
}

// Tên ngày tiếng Việt từ DayOfWeek enum backend trả về
export const dayOfWeekVN = (dow) => {
  const map = {
    MONDAY: 'Thứ Hai',
    TUESDAY: 'Thứ Ba',
    WEDNESDAY: 'Thứ Tư',
    THURSDAY: 'Thứ Năm',
    FRIDAY: 'Thứ Sáu',
    SATURDAY: 'Thứ Bảy',
    SUNDAY: 'Chủ Nhật',
  }
  return map[dow] || dow
}

// Status badge label
export const statusLabel = (status) => {
  const map = {
    SCHEDULED: 'Đã lên lịch',
    COMPLETED: 'Hoàn thành',
    CANCELLED: 'Đã hủy',
  }
  return map[status] || status
}

// Status badge color classes
export const statusColor = (status) => {
  const map = {
    SCHEDULED: 'bg-blue-50 text-blue-700 border-blue-200',
    COMPLETED: 'bg-green-50 text-green-700 border-green-200',
    CANCELLED: 'bg-red-50 text-red-600 border-red-200',
  }
  return map[status] || 'bg-gray-100 text-gray-600 border-gray-200'
}

// Convert LocalDateTime string thành input[datetime-local] value
export const toDatetimeLocal = (isoString) => {
  if (!isoString) return ''
  // Backend trả về 2025-07-28T08:30:00 → cắt bỏ seconds
  return isoString.slice(0, 16)
}
