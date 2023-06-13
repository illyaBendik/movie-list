import { type MoviesService } from './services/movies'

export interface API {
  movies: MoviesService
}

export type CrudListServices = keyof API
