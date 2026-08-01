import { formatTodayFull } from '../utils/format'

const NAV_ITEMS = [
  { label: 'Tổng quan', href: '#tong-quan' },
  { label: 'Lịch tuần', href: '#lich-tuan' },
  { label: 'Học viên', href: '#hoc-vien' },
  { label: 'Buổi học', href: '#buoi-hoc' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-navy-700 flex items-center justify-center"
            style={{ backgroundColor: '#1e3a5f' }}>
            <span className="text-white text-xs font-bold">CP</span>
          </div>
          <span className="font-semibold text-[#1e3a5f] text-base tracking-tight">ClassPlanner</span>
        </div>

        {/* Nav */}
        <nav className="hidden sm:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:text-[#1e3a5f] hover:bg-gray-100 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden md:block text-xs text-gray-500 capitalize">{formatTodayFull()}</span>
          <div className="w-8 h-8 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white text-xs font-semibold">
            GV
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="sm:hidden border-t border-gray-100 flex overflow-x-auto">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex-1 min-w-max text-center py-2 text-xs font-medium text-gray-600 hover:text-[#1e3a5f] hover:bg-gray-50 transition-colors px-3"
          >
            {item.label}
          </a>
        ))}
      </div>
    </header>
  )
}
