<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref, onMounted } from "vue";

import ListSpecie from "../components/specie/ListSpecie.vue";
import DescriptionSpecie from "../components/specie/DescriptionSpecie.vue";
</script>

<template>

  <router-view :id="$route.params.id"></router-view>
  <!-- <DescriptionSpecie></DescriptionSpecie> -->
  <ListSpecie />

</template>

<style></style>
