<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref, onMounted, watch } from "vue";

import ListFilm from "../components/film/ListFilm.vue";

</script>

<template>
  <router-view :id="$route.params.id"></router-view>

  <ListFilm />
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 5s;
}

::view-transition-old(film-image),
::view-transition-new(film-image) {
  animation-duration: 5s;
}
</style>
