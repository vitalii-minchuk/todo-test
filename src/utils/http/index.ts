import axios from 'axios'

// create axios instance with config for json placeholder api
export const jsonPlaceholderApi = axios.create({
  baseURL: import.meta.env.VITE_GLOB_JSON_PLACEHOLDER_API_HOST,
})
