import type { ResponseGetAll } from '../axios/utils'
import type { Movie } from '../movie'

export interface MovieStoreState {
  listData: ResponseGetAll<Movie>
  listIdsFavoriteMovies: Set<string>
}

export type GetAllMoviesParam = {
  page: number
  searchField: keyof Movie
  search?: string
}
