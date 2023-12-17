import axios from 'axios'

export const jsonPlaceholderApi = axios.create({
  baseURL: import.meta.env.VITE_GLOB_JSON_PLACEHOLDER_API_HOST,
})
