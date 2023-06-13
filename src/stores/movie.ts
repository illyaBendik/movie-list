import { defineStore } from 'pinia'
import { apiPlugin } from '@/plugins/axios'
import type { GetAllMoviesParam, MovieStoreState } from '@/types'

export const useMovieStore = defineStore('movie', {
  state: (): MovieStoreState => ({
    listData: { page: 0, per_page: 0, total: 0, total_pages: 0, data: [] },
    listIdsFavoriteMovies: new Set()
  }),
  getters: {
    listMovies: (state) => state.listData.data,
    isFavorite: (state) => (id: string) => state.listIdsFavoriteMovies.has(id)
  },
  actions: {
    toggleFavorite(id: string) {
      if (this.listIdsFavoriteMovies.has(id)) {
        this.listIdsFavoriteMovies.delete(id)
      } else {
        this.listIdsFavoriteMovies.add(id)
      }
    },
    async getAll({ page, searchField, search }: GetAllMoviesParam) {
      try {
        const api = apiPlugin()
        const { data } = await api.movies.getAll({
          page,
          [searchField]: search ? search : ''
        })
        Object.assign(this.listData, data)
      } catch (error) {
        console.log(error)
      }
    }
  }
})
