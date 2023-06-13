<template>
  <div>
    <header class="border-b bg-gray-800 border-gray-700">
      <nav class="border-gray-200 px-4 lg:px-6 py-2.5">
        <h1 class="text-white text-3xl font-bold text-right">Movies</h1>
      </nav>
    </header>
    <main class="bg-gray-900 min-h-screen">
      <div class="mx-auto max-w-screen-xl px-2 pt-5 text-white">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
