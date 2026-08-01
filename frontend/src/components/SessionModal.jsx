import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { X } from 'lucide-react'
import { toDatetimeLocal } from '../utils/format'

export default function SessionModal({ open, onClose, onSubmit, initialData, students, loading }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  useEffect(() => {
    if (open) {
      if (initialData) {
        reset({
          studentId: initialData.studentId,
          subject: initialData.subject || '',
          startTime: toDatetimeLocal(initialData.startTime),
          endTime: toDatetimeLocal(initialData.endTime),
          customLocation: initialData.customLocation || '',
          note: initialData.note || '',
        })
      } else {
        reset({ studentId: '', subject: '', startTime: '', endTime: '', customLocation: '', note: '' })
      }
    }
  }, [open, initialData, reset])

  if (!open) return null

  const handleFormSubmit = (data) => {
    onSubmit({
      ...data,
      studentId: Number(data.studentId),
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg z-10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <h2 className="text-base font-semibold text-gray-900">
            {initialData ? 'Chỉnh sửa buổi học' : 'Tạo buổi học mới'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-5 space-y-4 overflow-y-auto">
          {/* Học viên */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Học viên <span className="text-red-500">*</span>
            </label>
            <select
              {...register('studentId', { required: 'Vui lòng chọn học viên' })}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#1e3a5f] focus:ring-1 focus:ring-[#1e3a5f]/20 transition-colors bg-white"
            >
              <option value="">-- Chọn học viên --</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            {errors.studentId && <p className="mt-1 text-xs text-red-500">{errors.studentId.message}</p>}
          </div>

          {/* Môn học */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Môn học</label>
            <input
              {...register('subject')}
              placeholder="Toán, Lý, Anh văn..."
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#1e3a5f] focus:ring-1 focus:ring-[#1e3a5f]/20 transition-colors"
            />
          </div>

          {/* Thời gian */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Bắt đầu <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                {...register('startTime', { required: 'Chọn thời gian bắt đầu' })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#1e3a5f] focus:ring-1 focus:ring-[#1e3a5f]/20 transition-colors"
              />
              {errors.startTime && <p className="mt-1 text-xs text-red-500">{errors.startTime.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Kết thúc <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                {...register('endTime', { required: 'Chọn thời gian kết thúc' })}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#1e3a5f] focus:ring-1 focus:ring-[#1e3a5f]/20 transition-colors"
              />
              {errors.endTime && <p className="mt-1 text-xs text-red-500">{errors.endTime.message}</p>}
            </div>
          </div>

          {/* Địa điểm */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Địa điểm</label>
            <input
              {...register('customLocation')}
              placeholder="Tại nhà, Trung tâm XYZ..."
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#1e3a5f] focus:ring-1 focus:ring-[#1e3a5f]/20 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Ghi chú</label>
            <textarea
              {...register('note')}
              rows={2}
              placeholder="Ghi chú thêm..."
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#1e3a5f] focus:ring-1 focus:ring-[#1e3a5f]/20 transition-colors resize-none"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-[#1e3a5f] hover:bg-[#16304f] transition-colors disabled:opacity-50"
            >
              {loading ? 'Đang lưu...' : initialData ? 'Cập nhật' : 'Tạo buổi học'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
