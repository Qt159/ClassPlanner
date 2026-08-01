export default function StatCard({ icon, title, value, description, accent = false }) {
  return (
    <div className={`bg-white rounded-xl border p-5 shadow-sm flex items-start gap-4
      ${accent ? 'border-[#1e3a5f] ring-1 ring-[#1e3a5f]/10' : 'border-gray-200'}`}>
      {/* Icon */}
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0
        ${accent ? 'bg-[#1e3a5f] text-white' : 'bg-gray-100 text-gray-600'}`}>
        {icon}
      </div>

      {/* Content */}
      <div className="min-w-0">
        <p className="text-xs text-gray-500 font-medium truncate">{title}</p>
        <p className="text-2xl font-bold text-gray-900 leading-tight mt-0.5">{value ?? '—'}</p>
        {description && (
          <p className="text-xs text-gray-400 mt-1 truncate">{description}</p>
        )}
      </div>
    </div>
  )
}
