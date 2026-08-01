import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { X } from 'lucide-react'

export default function StudentModal({ open, onClose, onSubmit, initialData, loading }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  useEffect(() => {
    if (open) {
      reset(initialData || { name: '', phone: '', address: '', note: '' })
    }
  }, [open, initialData, reset])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">
            {initialData ? 'Chỉnh sửa học viên' : 'Thêm học viên mới'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Tên học viên <span className="text-red-500">*</span>
            </label>
            <input
              {...register('name', { required: 'Tên học viên không được để trống' })}
              placeholder="Nguyễn Văn A"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#1e3a5f] focus:ring-1 focus:ring-[#1e3a5f]/20 transition-colors"
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Số điện thoại</label>
            <input
              {...register('phone')}
              placeholder="0901234567"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#1e3a5f] focus:ring-1 focus:ring-[#1e3a5f]/20 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Địa chỉ</label>
            <input
              {...register('address')}
              placeholder="123 Đường ABC, Quận 1"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#1e3a5f] focus:ring-1 focus:ring-[#1e3a5f]/20 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Ghi chú</label>
            <textarea
              {...register('note')}
              rows={3}
              placeholder="Ghi chú thêm về học viên..."
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
              {loading ? 'Đang lưu...' : initialData ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
