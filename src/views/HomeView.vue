<template>
  <main>
    <h1 class="font-bold text-2xl mb-4">List movies</h1>

    <search-input v-model="search"></search-input>

    <ul class="divide-y divide-gray-200 dark:divide-gray-700">
      <li class="pb-3 sm:pb-4" data-cy="movie-item" v-for="movie in listMovies" :key="movie.imdbID">
        <div class="flex items-center space-x-4">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
              {{ movie.Title }}
            </p>
            <p class="text-sm text-gray-500 truncate dark:text-gray-400">Year: {{ movie.Year }}</p>
          </div>
          <div
            class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
          >
            <button aria-label="toggle" @click="toggleFavorite(movie.imdbID)">
              <svg
                class="h-8"
                :fill="isFavorite(movie.imdbID) ? 'yellow' : 'none'"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  stroke="yellow"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </li>
    </ul>

    <pagination-list
      @on-change-page="($event) => getList($event)"
      :totalPages="totalPages"
      :current-page="currentPage"
    ></pagination-list>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useMovieStore } from '@/stores/movie'
import PaginationList from '@/components/PaginationList.vue'
import { debounce } from '@/utils/debounce'
import SearchInput from '@/components/SearchInput.vue'

const DEFAULT_PAGE = 1
const SEARCH_FIELD = 'Title'

export default defineComponent({
  components: {
    PaginationList,
    SearchInput
  },
  setup() {
    const useMovie = useMovieStore()
    const search = ref('')

    const listMovies = computed(() => useMovie.listMovies)
    const totalPages = computed(() => useMovie.listData.total_pages)
    const currentPage = computed(() => useMovie.listData.page)

    const getList = (page = DEFAULT_PAGE) =>
      useMovie.getAll({ page, searchField: SEARCH_FIELD, search: search.value })

    onMounted(() => getList())

    watch(
      search,
      debounce(() => {
        getList()
      }, 400)
    )

    return {
      search,
      getList,
      totalPages,
      currentPage,
      listMovies,
      toggleFavorite: useMovie.toggleFavorite,
      isFavorite: useMovie.isFavorite
    }
  }
})
</script>
