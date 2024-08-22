<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { getSpecieById } from "../../service/module/specie";
import { useQuery } from '@pinia/colada'

const props = defineProps({
  id: String,
});


const { data: specie, isLoading, refetch, error } = useQuery({
  // recognizes this query as ['contacts', id]
  key: () => ['specie', props.id],
  query: () => getSpecieById(props.id),
})

console.log(specie.value);
const urlImg = computed(() => new URL(`../../assets/img/species/${props.id}.png`, import.meta.url).href);
</script>

<template>
  <div v-if="isLoading == true">...Loading</div>
  <div v-else-if="specie != null" id="specie"
    class="container px-1 md:px-10 md:py-10 flex flex-col-reverse sm:flex-row justify-between mx-auto">
    <div class="sm:w-1/2 flex flex-col justify-end">
      <h2 class="text-[30px] items-center">{{ specie?.name }}</h2>
      <ul class="m-2 text-[15px]">
        <li class="m-2">classification : {{ specie?.classification }}</li>
        <li class="m-2">designation : {{ specie?.designation }}</li>
        <li class="m-2" v-if="specie?.average_height != 'n/a'">
          average height : {{ specie?.average_height }}
        </li>
        <li class="m-2">Skin Colors : {{ specie?.skin_colors }}</li>
        <li class="m-2">Hair Colors : {{ specie?.hair_colors }}</li>

        <li class="m-2">Eye Colors : {{ specie?.eye_colors }}</li>
        <li class="m-2">average lifespan : {{ specie?.average_lifespan }}</li>
        <li class="m-2" v-if="specie?.language != 'n/a'">
          language : {{ specie?.language }}
        </li>
        <li class="m-2">Home World : {{ specie?.homeworld?.name }}</li>
      </ul>
    </div>
    <img class="sm:w-1/2 max-h-[30vh] md:max-h-[55vh] max-w-[420px] aspect-[8/11] " :src="urlImg" alt="" />
  </div>
</template>

<style scoped>
#specie {
  position: relative;

  --font-txt-bg: 5.75rem;
}

@media screen(sm) {
  #specie {
    --left-position: 55%;
    --font-txt-bg: 7rem;
  }
}

@media screen(md) {
  #specie {
    --left-position: 55%;
    --font-txt-bg: 8rem;
  }
}

#specie::after {
  font-family: "Star Jhol";
  content: "specie";
  position: absolute;
  top: var(--top-position);
  left: var(--left-position);
  font-size: var(--font-txt-bg);
  z-index: -3;
}
</style>
