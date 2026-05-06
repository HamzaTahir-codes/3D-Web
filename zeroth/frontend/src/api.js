import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Projects
export const getProjects = () =>
  api.get('/api/projects/')

export const getFeaturedProjects = () =>
  api.get('/api/projects/featured/')

export const getProjectBySlug = (slug) =>
  api.get(`/api/projects/${slug}/`)

// Contact
export const sendContactMessage = (data) =>
  api.post('/api/contact/', data)

// Resume
export const getResumeUrl = () =>
  `http://localhost:8000/api/resume/`

export default api
