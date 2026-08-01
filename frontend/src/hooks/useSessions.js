import { useState, useEffect, useCallback } from 'react'
import {
  getSessions, createSession, updateSession,
  deleteSession, updateSessionStatus,
} from '../services/sessionApi'

export const useSessions = () => {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await getSessions()
      setSessions(res)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const create = async (data) => {
    const res = await createSession(data)
    setSessions((prev) => [...prev, res])
    return res
  }

  const update = async (id, data) => {
    const res = await updateSession(id, data)
    setSessions((prev) => prev.map((s) => (s.id === id ? res : s)))
    return res
  }

  const remove = async (id) => {
    await deleteSession(id)
    setSessions((prev) => prev.filter((s) => s.id !== id))
  }

  const updateStatus = async (id, status) => {
    const res = await updateSessionStatus(id, status)
    setSessions((prev) => prev.map((s) => (s.id === id ? res : s)))
    return res
  }

  return { sessions, loading, error, refetch: fetch, create, update, remove, updateStatus }
}
