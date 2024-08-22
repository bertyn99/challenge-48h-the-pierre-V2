<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { getPeopleById } from "../../service/module/people";
import { useQuery } from '@pinia/colada'
const props = defineProps({
  id: String,
});


/* let character = ref(null); */
const { data: character, isLoading, refetch, error } = useQuery({
  // recognizes this query as ['contacts', id]
  key: () => ['character', props.id],
  query: () => getPeopleById(props.id),
})


/* watch(async (id) => {
  isLoading.value = true;
  let data = await getPeopleById(props.id);
  character.value = data.data;
  isLoading.value = false;
}); */
const urlImg = computed(
  () => new URL(`../../assets/img/characters/${props.id}.png`, import.meta.url).href
);
</script>

<template>
  <div v-if="isLoading == true"
    class="max-w-7xl sm:px-6 lg:px-8 flex flex-col-reverse sm:flex-row justify-between mx-auto">
    <div class="sm:w-1/2 flex flex-col mt-8 justify-center">
      <h2 class="text-[30px] items-center">{{ '??' }}</h2>
      <ul class="m-2 text-[15px]">
        <li class="m-2">Height : {{ '??' }}</li>
        <li class="m-2">Mass : {{ '??' }}</li>
        <li class="m-2" v-if="character?.hair_color != 'n/a'">
          Hair Color : {{ '??' }}
        </li>
        <li class="m-2">Skin Color : {{ '??' }}</li>
        <li class="m-2">Eye Color : {{ '??' }}</li>
        <li class="m-2">BirthYear : {{ '??' }}</li>
        <li class="m-2" v-if="character?.gender != 'n/a'">
          Gender : {{ '??' }}
        </li>
        <li class="m-2">Home World : {{ '??' }}</li>
      </ul>
    </div>
    <div class="sm:w-1/2 h-auto max-h-[30vh] md:max-h-[55vh] aspect-[9/16]" alt=""></div>
  </div>
  <div v-else-if="character != null" id="character"
    class="max-w-7xl sm:px-6 lg:px-8 flex flex-col-reverse sm:flex-row justify-between mx-auto">
    <div class="sm:w-1/2 flex flex-col mt-8 justify-center">
      <h2 class="text-[30px] items-center">{{ character.name ?? '??' }}</h2>
      <ul class="m-2 text-[15px]">
        <li class="m-2">Height : {{ character.height ?? '??' }}</li>
        <li class="m-2">Mass : {{ character.mass ?? '??' }}</li>
        <li class="m-2" v-if="character.hair_color != 'n/a'">
          Hair Color : {{ character.hair_color ?? '??' }}
        </li>
        <li class="m-2">Skin Color : {{ character.skin_color ?? '??' }}</li>
        <li class="m-2">Eye Color : {{ character.eye_color ?? '??' }}</li>
        <li class="m-2">BirthYear : {{ character.birth_year ?? '??' }}</li>
        <li class="m-2" v-if="character.gender != 'n/a'">
          Gender : {{ character.gender ?? '??' }}
        </li>
        <li class="m-2">Home World : {{ character.homeworld.name ?? '??' }}</li>
      </ul>
    </div>
    <img class="sm:w-1/2 max-h-[30vh] md:max-h-[55vh] max-w-[420px] aspect-[9/16]" :src="urlImg" alt="" />
  </div>
</template>

<style scoped>
#character {
  position: relative;
  overflow: hidden;
  --left-position: 0%;
  --font-txt-bg: 4rem;
}

@media screen(sm) {
  #character {
    --left-position: 55%;
    --font-txt-bg: 5.75rem;
  }
}

@media screen(md) {
  #character {
    --left-position: 55%;
    --font-txt-bg: 7rem;
  }

  #character::after {
    z-index: -3 !important;
  }
}

#character::after {
  font-family: "Star Jhol";
  content: "character";
  position: absolute;
  top: var(--top-position);
  left: var(--left-position);
  font-size: var(--font-txt-bg);
  z-index: 3;
  margin-bottom: 400px;
}
</style>
