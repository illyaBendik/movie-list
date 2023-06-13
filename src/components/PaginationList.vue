<template>
  <nav
    class="flex flex-col md:flex-row justify-center items-center md:items-center space-y-3 md:space-y-0 p-4"
    aria-label="Table navigation"
  >
    <ul class="inline-flex items-stretch -space-x-px">
      <li>
        <button
          aria-label="Prev"
          type="button"
          @click="$emit('on-change-page', currentPage - 1)"
          :disabled="isDisabledPrevBtn"
          :class="{
            'cursor-pointer dark:hover:bg-gray-700 dark:hover:text-white': !isDisabledPrevBtn
          }"
          class="flex items-center justify-center h-full py-1.5 px-3 ml-0 rounded-l-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
        >
          Prev
        </button>
      </li>
      <li v-for="page in pages" :key="page" @click="$emit('on-change-page', page)">
        <button
          :class="{ 'bg-gray-700': page === currentPage, 'bg-gray-800': page !== currentPage }"
          class="cursor-pointer flex items-center justify-center text-sm py-2 px-3 leading-tight border border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
        >
          {{ page }}
        </button>
      </li>

      <li>
        <button
          aria-label="Next"
          type="button"
          @click="$emit('on-change-page', currentPage + 1)"
          :disabled="isDisabledNextBtn"
          :class="{
            'cursor-pointer dark:hover:bg-gray-700 dark:hover:text-white': !isDisabledNextBtn
          }"
          class="flex items-center justify-center h-full py-1.5 px-3 leading-tight rounded-r-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
export default defineComponent({
  props: {
    totalPages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    maxVisiblePages: {
      type: Number,
      default: 5
    }
  },
  setup(props) {
    const isDisabledNextBtn = computed(() => props.currentPage === props.totalPages)
    const isDisabledPrevBtn = computed(() => props.currentPage === 1)

    const pages = computed(() => {
      const currentPage = props.currentPage
      const totalPages = props.totalPages
      const maxVisiblePages = props.maxVisiblePages

      let startIndex = Math.max(currentPage - 2, 1)
      let endIndex = Math.min(startIndex + maxVisiblePages - 1, totalPages)

      if (endIndex - startIndex < maxVisiblePages - 1) {
        startIndex = Math.max(endIndex - maxVisiblePages + 1, 1)
      }

      return Array.from({ length: endIndex - startIndex + 1 }, (_, i) => startIndex + i)
    })

    return {
      pages,
      isDisabledNextBtn,
      isDisabledPrevBtn
    }
  }
})
</script>
