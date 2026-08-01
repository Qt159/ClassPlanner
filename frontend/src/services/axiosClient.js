import axios from 'axios'

const axiosClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Có lỗi xảy ra'
    return Promise.reject(new Error(message))
  }
)

export default axiosClient
