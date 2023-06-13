import { AxiosError } from 'axios'
import { URLs } from '@/constants/urls'
import { buildURL } from '@/utils/url-builder'
import type { API } from '@/types'
import axios, { type AxiosInstance } from 'axios'

export const apiPlugin = () => {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  axiosInstance.interceptors.request.use(
    (config) => config,
    (error) => {
      return Promise.reject(error)
    }
  )

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      return Promise.reject(error.response)
    }
  )

  const API: API = {
    movies: {
      getAll(query) {
        return axiosInstance.get(buildURL(URLs.movies.search, undefined, query))
      }
    }
    // Rest of the API methods...
  }

  return API
}
