<script setup>
import DescriptionPeople from "../components/people/DescriptionPeople.vue";
import CardPeople from "../components/people/CardPeople.vue";
import ListPeople from "../components/people/ListPeople.vue";
import { ref, onMounted } from "vue";
</script>
<template>
  <router-view :id="$route.params.id"></router-view>
  <!-- ICI mettre un truc pour dérouler-->
  <ListPeople></ListPeople>
</template>
