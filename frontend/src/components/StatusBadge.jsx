import { statusLabel, statusColor } from '../utils/format'

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${statusColor(status)}`}>
      {statusLabel(status)}
    </span>
  )
}
