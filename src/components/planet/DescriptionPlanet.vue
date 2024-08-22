<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { getPlanetById } from "../../service/module/planet";
import { useQuery } from '@pinia/colada'

const props = defineProps({
  id: String,
});



const { data: planet, isLoading, refetch, error } = useQuery({
  // recognizes this query as ['contacts', id]
  key: () => ['planet', props.id],
  query: () => getPlanetById(props.id),
})





const urlImg = computed(() => "/src/assets/img/planets/" + props.id + ".png");
</script>

<template>
  <div v-if="isLoading == true">loading</div>
  <div v-else-if="planet != null" id="planet"
    class="container px-1 md:px-10 md:py-10 flex flex-col-reverse sm:flex-row justify-between mx-auto">
    <div class="sm:w-1/2 flex flex-col justify-end">
      <h2 class="text-[30px] items-center">{{ planet.name }}</h2>
      <ul class="m-2 text-[15px]">
        <li class="m-2">rotation_period : {{ planet.rotation_period }}</li>
        <li class="m-2">orbital_period : {{ planet.orbital_period }}</li>
        <li class="m-2" v-if="planet.diameter != 'n/a'">
          diameter : {{ planet.diameter }}
        </li>
        <li class="m-2" v-if="planet.climate != 'n/a'">
          climate : {{ planet.climate }}
        </li>
        <li class="m-2" v-if="planet.gravity != 'n/a'">
          gravity : {{ planet.gravity }}
        </li>
        <li class="m-2" v-if="planet.terrain != 'n/a'">
          terrain : {{ planet.terrain }}
        </li>
        <li class="m-2" v-if="planet.surface_water != 'n/a'">
          surface_water : {{ planet.surface_water }}
        </li>
        <li class="m-2" v-if="planet.population != 'n/a'">
          population : {{ planet.population }}
        </li>
      </ul>
    </div>
    <img class="sm:w-1/2 max-h-[500px] max-w-[420px]" :src="urlImg" alt="" />
  </div>
</template>

<style scoped>
#planet {
  position: relative;
  --font-txt-bg: 5.75rem;
}

@media screen(sm) {
  #planet {
    --left-position: 55%;
    --font-txt-bg: 6rem;
  }
}

@media screen(md) {
  #planet {
    --left-position: 50%;
    --font-txt-bg: 7rem;
  }

  #planet::after {
    z-index: -3 !important;
  }
}

#planet::after {
  font-family: "Star Jhol";
  content: "planet";
  position: absolute;
  top: var(--top-position);
  left: var(--left-position);
  font-size: var(--font-txt-bg);
  z-index: 3;
}
</style>
