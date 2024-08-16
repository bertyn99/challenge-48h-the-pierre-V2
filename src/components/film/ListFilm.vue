<script setup>
import CardFilm from "./CardFilm.vue";
import { listFilm } from "../../service/module/film";
import { useQuery } from '@pinia/colada'
const { data: movies, isLoading, refetch, error } = useQuery({
  // recognizes this query as ['contacts', id]
  key: () => ['movies'],
  query: () => listFilm(),
})
</script>

<template>
  <div class="container w-full p-3 mx-auto flex justify-center">
    <CardFilm v-for="movie in movies" :key="movie" :film="movie"></CardFilm>
  </div>
</template>
