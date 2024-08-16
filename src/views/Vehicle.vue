<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref, onMounted } from "vue";
import Vehicle from "../components/vehicle/CardVehicle.vue";

import ListVehicle from "../components/vehicle/ListVehicle.vue";

</script>

<template>
  <router-view :id="$route.params.id"></router-view>

  <ListVehicle />
</template>

<style></style>
