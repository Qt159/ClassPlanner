import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react'
import StatusBadge from './StatusBadge'
import { dayOfWeekVN, formatTime, formatShortDate } from '../utils/format'

const SHIFT_LABELS = [
  { key: 'morningSessions', label: 'Sáng' },
  { key: 'afternoonSessions', label: 'Chiều' },
  { key: 'eveningSessions', label: 'Tối' },
]

function SessionCard({ session }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-2 text-xs space-y-0.5">
      <p className="font-semibold text-gray-800 truncate">{session.studentName}</p>
      {session.subject && <p className="text-gray-500 truncate">{session.subject}</p>}
      <p className="text-gray-500">{formatTime(session.startTime)} – {formatTime(session.endTime)}</p>
      {session.customLocation && (
        <p className="text-gray-400 truncate">{session.customLocation}</p>
      )}
      <div className="pt-0.5">
        <StatusBadge status={session.status} />
      </div>
    </div>
  )
}

function DayColumn({ day }) {
  const isToday = day.date === new Date().toISOString().split('T')[0]
  const totalSessions = SHIFT_LABELS.reduce((sum, s) => sum + (day[s.key]?.length || 0), 0)

  return (
    <div className={`min-w-[130px] flex-1 rounded-xl border p-3 space-y-3
      ${isToday ? 'border-[#1e3a5f] bg-blue-50/40' : 'border-gray-200 bg-white'}`}>
      {/* Day header */}
      <div className="text-center">
        <p className={`text-xs font-semibold ${isToday ? 'text-[#1e3a5f]' : 'text-gray-700'}`}>
          {dayOfWeekVN(day.dayOfWeek)}
        </p>
        <p className={`text-xs mt-0.5 ${isToday ? 'text-[#1e3a5f] font-bold' : 'text-gray-400'}`}>
          {formatShortDate(day.date)}
        </p>
        {totalSessions > 0 && (
          <span className="inline-block mt-1 text-[10px] bg-[#1e3a5f] text-white rounded-full px-1.5 py-0.5">
            {totalSessions}
          </span>
        )}
      </div>

      {/* Shifts */}
      {SHIFT_LABELS.map(({ key, label }) => {
        const sessions = day[key] || []
        return (
          <div key={key}>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
            {sessions.length === 0 ? (
              <p className="text-[11px] text-gray-300 italic">Trống</p>
            ) : (
              <div className="space-y-1.5">
                {sessions.map((s) => <SessionCard key={s.id} session={s} />)}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function WeeklyCalendar({ calendarData, loading, error, prevWeek, nextWeek, goToday, currentDate }) {
  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          {calendarData && (
            <p className="text-sm text-gray-500">
              {formatShortDate(calendarData.startDate)} – {formatShortDate(calendarData.endDate)}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {currentDate && (
            <button
              onClick={goToday}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-[#1e3a5f] border border-[#1e3a5f]/30 hover:bg-[#1e3a5f]/5 transition-colors"
            >
              <CalendarDays size={13} />
              Hôm nay
            </button>
          )}
          <button
            onClick={prevWeek}
            className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={nextWeek}
            className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {loading && (
        <div className="h-48 flex items-center justify-center text-sm text-gray-400">Đang tải...</div>
      )}
      {error && (
        <div className="h-24 flex items-center justify-center text-sm text-red-500">{error}</div>
      )}
      {!loading && !error && calendarData && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {calendarData.days.map((day) => (
            <DayColumn key={day.date} day={day} />
          ))}
        </div>
      )}
    </div>
  )
}
