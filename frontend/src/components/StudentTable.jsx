import { useState } from 'react'
import { Pencil, Trash2, Plus, Users } from 'lucide-react'
import StudentModal from './StudentModal'
import ConfirmDialog from './ConfirmDialog'

export default function StudentTable({ students, loading, onAdd, onEdit, onDelete, sessionSummaries }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const summaryMap = {}
  if (sessionSummaries) {
    sessionSummaries.forEach((s) => { summaryMap[s.studentId] = s.totalSessions })
  }

  const openAdd = () => { setEditTarget(null); setModalOpen(true) }
  const openEdit = (student) => { setEditTarget(student); setModalOpen(true) }

  const handleSubmit = async (data) => {
    setSaving(true)
    try {
      if (editTarget) {
        await onEdit(editTarget.id, data)
      } else {
        await onAdd(data)
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

  return (
    <div>
      {/* Header bar */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">{students.length} học viên</p>
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white bg-[#1e3a5f] hover:bg-[#16304f] transition-colors"
        >
          <Plus size={15} />
          Thêm học viên
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="h-32 flex items-center justify-center text-sm text-gray-400">Đang tải...</div>
      ) : students.length === 0 ? (
        <div className="h-32 flex flex-col items-center justify-center text-gray-400 gap-2">
          <Users size={32} className="opacity-40" />
          <p className="text-sm">Chưa có học viên nào</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Tên học viên</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Điện thoại</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Địa chỉ</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Buổi tháng</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Ghi chú</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">{s.name}</td>
                  <td className="px-4 py-3 text-gray-600">{s.phone || <span className="text-gray-300">—</span>}</td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell max-w-[160px] truncate">
                    {s.address || <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#1e3a5f]/10 text-[#1e3a5f] text-xs font-semibold">
                      {summaryMap[s.id] ?? 0}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs hidden lg:table-cell max-w-[200px] truncate">
                    {s.note || <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
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

      <StudentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editTarget}
        loading={saving}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Xóa học viên"
        message={`Bạn chắc chắn muốn xóa học viên "${deleteTarget?.name}"? Hành động này không thể hoàn tác.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  )
}
