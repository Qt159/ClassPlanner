import axiosClient from './axiosClient'

export const getStudents = () => axiosClient.get('/students')
export const getStudentById = (id) => axiosClient.get(`/students/${id}`)
export const createStudent = (data) => axiosClient.post('/students', data)
export const updateStudent = (id, data) => axiosClient.put(`/students/${id}`, data)
export const deleteStudent = (id) => axiosClient.delete(`/students/${id}`)
