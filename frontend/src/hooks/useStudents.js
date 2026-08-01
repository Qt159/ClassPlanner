import { useState, useEffect, useCallback } from 'react'
import { getStudents, createStudent, updateStudent, deleteStudent } from '../services/studentApi'

export const useStudents = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await getStudents()
      setStudents(res)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const create = async (data) => {
    const res = await createStudent(data)
    setStudents((prev) => [...prev, res])
    return res
  }

  const update = async (id, data) => {
    const res = await updateStudent(id, data)
    setStudents((prev) => prev.map((s) => (s.id === id ? res : s)))
    return res
  }

  const remove = async (id) => {
    await deleteStudent(id)
    setStudents((prev) => prev.filter((s) => s.id !== id))
  }

  return { students, loading, error, refetch: fetch, create, update, remove }
}
