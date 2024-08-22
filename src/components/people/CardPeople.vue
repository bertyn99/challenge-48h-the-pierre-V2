<script setup>
import { ref, computed } from "vue";
const props = defineProps({
  person: Object,
});
const personID = computed(() =>
  props.person.url.split("/")[props.person.url.split("/").length - 2]
);
console.log("personID:", personID.value);

const urlImg = computed(() => {
  try {
    return new URL(`../../assets/img/characters/${personID.value}.png`, import.meta.url).href;
  } catch (error) {
    console.error('Error loading image:', error);
    return null; // or a default image URL
  }
});

console.log(urlImg.value);
let urlPeople = ref(null);
urlPeople.value = "/people/" + personID.value;
</script>

<template>
  <router-link :to="urlPeople">
    <div class="group w-full h-72 pt-2 m-2 overflow-hidden">
      <p class="h-1/4 mt-1 invisible group-hover:visible text-sm mb-5">
        {{ person?.name }}
      </p>
      <img class="object-cover w-full h-3/4 aspect-[4/3] transition-all delay-150 hover:-translate-y-1 hover:scale-110"
        :src="urlImg" />
    </div>
  </router-link>
</template>

<style scoped>
img {
  filter: grayscale(100%);
  width: 100%;
  -webkit-transition: all 0.2s;
  -moz-transition: all 0.2s;
  -ms-transition: all 0.2s;
  -o-transition: all 0.2s;
  transition: all 0.2s;
}

img:hover {
  background-color: black;
  filter: grayscale(0);
  transform: scale(1.15);
}

div:hover {
  background-color: black;
  border: 2px solid yellow;
  transform: scale(1.2);
}
</style>
