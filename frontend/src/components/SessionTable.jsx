import { useState } from 'react'
import { Pencil, Trash2, CheckCircle, XCircle, Plus, BookOpen } from 'lucide-react'
import SessionModal from './SessionModal'
import ConfirmDialog from './ConfirmDialog'
import StatusBadge from './StatusBadge'
import { formatDateTime } from '../utils/format'

export default function SessionTable({ sessions, students, loading, onCreate, onEdit, onDelete, onUpdateStatus }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const openAdd = () => { setEditTarget(null); setModalOpen(true) }
  const openEdit = (session) => { setEditTarget(session); setModalOpen(true) }

  const handleSubmit = async (data) => {
    setSaving(true)
    try {
      if (editTarget) {
        await onEdit(editTarget.id, data)
      } else {
        await onCreate(data)
      }
      setModalOpen(false)
    } catch (e) {
      alert(e.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await onDelete(deleteTarget.id)
      setDeleteTarget(null)
    } catch (e) {
      alert(e.message)
    } finally {
      setDeleting(false)
    }
  }

  const handleStatus = async (id, status) => {
    try {
      await onUpdateStatus(id, status)
    } catch (e) {
      alert(e.message)
    }
  }

  // Sort: mới nhất lên trước
  const sorted = [...sessions].sort((a, b) => new Date(b.startTime) - new Date(a.startTime))

  return (
    <div>
      {/* Header bar */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">{sessions.length} buổi học</p>
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white bg-[#1e3a5f] hover:bg-[#16304f] transition-colors"
        >
          <Plus size={15} />
          Tạo buổi học
        </button>
      </div>

      {loading ? (
        <div className="h-32 flex items-center justify-center text-sm text-gray-400">Đang tải...</div>
      ) : sorted.length === 0 ? (
        <div className="h-32 flex flex-col items-center justify-center text-gray-400 gap-2">
          <BookOpen size={32} className="opacity-40" />
          <p className="text-sm">Chưa có buổi học nào</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Học viên</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Môn học</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Thời gian</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Địa điểm</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Trạng thái</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sorted.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{s.studentName}</td>
                  <td className="px-4 py-3 text-gray-600">{s.subject || <span className="text-gray-300">—</span>}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap text-xs">
                    {formatDateTime(s.startTime)}
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell max-w-[140px] truncate">
                    {s.customLocation || <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={s.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {s.status === 'SCHEDULED' && (
                        <>
                          <button
                            onClick={() => handleStatus(s.id, 'COMPLETED')}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors"
                            title="Hoàn thành"
                          >
                            <CheckCircle size={14} />
                          </button>
                          <button
                            onClick={() => handleStatus(s.id, 'CANCELLED')}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                            title="Hủy buổi"
                          >
                            <XCircle size={14} />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => openEdit(s)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#1e3a5f] hover:bg-blue-50 transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(s)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Xóa"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <SessionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editTarget}
        students={students}
        loading={saving}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Xóa buổi học"
        message={`Xóa buổi học của "${deleteTarget?.studentName}"? Hành động này không thể hoàn tác.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  )
}
