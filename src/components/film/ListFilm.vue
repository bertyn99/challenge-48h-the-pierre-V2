<script setup>
import CardFilm from "./CardFilm.vue";
import { ref, onMounted } from "vue";
import { listFilm } from "../../service/module/film";
let films = ref(null);
onMounted(async () => {
  let data = await listFilm();
  films.value = data.data.results;
});
</script>

<template>
  <div class="container w-full p-3 mx-auto flex justify-center">
    <CardFilm v-for="mov in films" :key="mov" :film="mov"></CardFilm>
  </div>
</template>
