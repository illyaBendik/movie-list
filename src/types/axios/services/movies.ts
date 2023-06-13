import { type AxiosResponse } from 'axios'
import { type ResponseGetAll } from '../utils'
import { type Movie } from '../../movie'

export interface ApiMovieQuery {
  page: number
  Title?: string
}

export interface MoviesService {
  getAll: (query?: ApiMovieQuery) => Promise<AxiosResponse<ResponseGetAll<Movie>>>
}
