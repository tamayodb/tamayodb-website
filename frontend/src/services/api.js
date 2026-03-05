import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

export const getProjects = () =>
  api.get('/projects').then(r => r.data)

export default api