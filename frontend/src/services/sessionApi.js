import axiosClient from './axiosClient'

export const getSessions = () => axiosClient.get('/sessions')
export const getSessionById = (id) => axiosClient.get(`/sessions/${id}`)
export const createSession = (data) => axiosClient.post('/sessions', data)
export const updateSession = (id, data) => axiosClient.put(`/sessions/${id}`, data)
export const deleteSession = (id) => axiosClient.delete(`/sessions/${id}`)
export const updateSessionStatus = (id, status) =>
  axiosClient.patch(`/sessions/${id}/status`, null, { params: { status } })
