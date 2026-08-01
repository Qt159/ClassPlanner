import { Users, CheckSquare, CalendarClock, Clock } from 'lucide-react'
import StatCard from '../components/StatCard'
import WeeklyCalendar from '../components/WeeklyCalendar'
import StudentTable from '../components/StudentTable'
import SessionTable from '../components/SessionTable'
import { useDashboard } from '../hooks/useDashboard'
import { useStudents } from '../hooks/useStudents'
import { useSessions } from '../hooks/useSessions'
import { useCalendar } from '../hooks/useCalendar'
import { formatDateTime } from '../utils/format'

function SectionWrapper({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      {children}
    </section>
  )
}

export default function Dashboard() {
  const { data: dashData, loading: dashLoading, refetch: refetchDash } = useDashboard()
  const { students, loading: studentsLoading, create: addStudent, update: editStudent, remove: removeStudent } = useStudents()
  const { sessions, loading: sessionsLoading, create: addSession, update: editSession, remove: removeSession, updateStatus } = useSessions()
  const { calendarData, loading: calLoading, error: calError, prevWeek, nextWeek, goToday, currentDate } = useCalendar()

  // Buổi học hôm nay
  const todayStr = new Date().toISOString().split('T')[0]
  const todaySessions = sessions.filter(
    (s) => s.startTime && s.startTime.startsWith(todayStr)
  )

  // Buổi học sắp tới (SCHEDULED, trong tương lai)
  const upcomingSessions = sessions.filter(
    (s) => s.status === 'SCHEDULED' && new Date(s.startTime) > new Date()
  )

  // Sau khi thêm/sửa/xóa session hoặc student, refetch dashboard để cập nhật số liệu
  const handleAddStudent = async (data) => {
    await addStudent(data)
    refetchDash()
  }
  const handleEditStudent = async (id, data) => {
    await editStudent(id, data)
    refetchDash()
  }
  const handleRemoveStudent = async (id) => {
    await removeStudent(id)
    refetchDash()
  }
  const handleAddSession = async (data) => {
    await addSession(data)
    refetchDash()
  }
  const handleEditSession = async (id, data) => {
    await editSession(id, data)
    refetchDash()
  }
  const handleRemoveSession = async (id) => {
    await removeSession(id)
    refetchDash()
  }
  const handleUpdateStatus = async (id, status) => {
    await updateStatus(id, status)
    refetchDash()
  }

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-6 space-y-10">

      {/* ═══════════════ SECTION 1: TỔNG QUAN ═══════════════ */}
      <SectionWrapper id="tong-quan" title="Tổng quan">
        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <StatCard
            icon={<Users size={18} />}
            title="Tổng học viên"
            value={dashLoading ? '...' : dashData?.totalStudents}
            description="Học viên đang theo học"
            accent
          />
          <StatCard
            icon={<CheckSquare size={18} />}
            title="Hoàn thành tháng này"
            value={dashLoading ? '...' : dashData?.totalCompletedSessions}
            description="Buổi học đã hoàn thành"
          />
          <StatCard
            icon={<CalendarClock size={18} />}
            title="Buổi học hôm nay"
            value={sessionsLoading ? '...' : todaySessions.length}
            description="Tổng buổi học trong ngày"
          />
          <StatCard
            icon={<Clock size={18} />}
            title="Sắp diễn ra"
            value={sessionsLoading ? '...' : upcomingSessions.length}
            description="Buổi chưa hoàn thành"
          />
        </div>

        {/* Bảng thống kê học viên theo tháng */}
        {!dashLoading && dashData?.studentSummaries?.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800">Số buổi đã dạy trong tháng</h3>
              <span className="text-xs text-gray-400">
                {new Date().toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500">Học viên</th>
                    <th className="text-center px-4 py-2.5 text-xs font-semibold text-gray-500">Số buổi hoàn thành</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 hidden sm:table-cell">Tiến độ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {dashData.studentSummaries
                    .sort((a, b) => b.totalSessions - a.totalSessions)
                    .map((s) => {
                      const max = Math.max(...dashData.studentSummaries.map((x) => x.totalSessions), 1)
                      const pct = Math.round((s.totalSessions / max) * 100)
                      return (
                        <tr key={s.studentId} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-2.5 font-medium text-gray-800">{s.studentName}</td>
                          <td className="px-4 py-2.5 text-center">
                            <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold
                              ${s.totalSessions > 0 ? 'bg-[#1e3a5f] text-white' : 'bg-gray-100 text-gray-400'}`}>
                              {s.totalSessions}
                            </span>
                          </td>
                          <td className="px-4 py-2.5 hidden sm:table-cell">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-[#1e3a5f] rounded-full transition-all duration-500"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                              <span className="text-xs text-gray-400 w-8 text-right">{pct}%</span>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
              {dashData.studentSummaries.length === 0 && (
                <div className="py-6 text-center text-sm text-gray-400">Chưa có dữ liệu</div>
              )}
            </div>
          </div>
        )}
      </SectionWrapper>

      {/* ═══════════════ SECTION 2: LỊCH TUẦN ═══════════════ */}
      <SectionWrapper id="lich-tuan" title="Lịch dạy tuần">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <WeeklyCalendar
            calendarData={calendarData}
            loading={calLoading}
            error={calError}
            prevWeek={prevWeek}
            nextWeek={nextWeek}
            goToday={goToday}
            currentDate={currentDate}
          />
        </div>
      </SectionWrapper>

      {/* ═══════════════ SECTION 3: HỌC VIÊN ═══════════════ */}
      <SectionWrapper id="hoc-vien" title="Học viên">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <StudentTable
            students={students}
            loading={studentsLoading}
            onAdd={handleAddStudent}
            onEdit={handleEditStudent}
            onDelete={handleRemoveStudent}
            sessionSummaries={dashData?.studentSummaries}
          />
        </div>
      </SectionWrapper>

      {/* ═══════════════ SECTION 4: BUỔI HỌC ═══════════════ */}
      <SectionWrapper id="buoi-hoc" title="Danh sách buổi học">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SessionTable
            sessions={sessions}
            students={students}
            loading={sessionsLoading}
            onCreate={handleAddSession}
            onEdit={handleEditSession}
            onDelete={handleRemoveSession}
            onUpdateStatus={handleUpdateStatus}
          />
        </div>
      </SectionWrapper>

    </main>
  )
}
