<script setup lang="ts">
import CardPlanet from "./CardPlanet.vue";
import { onMounted, ref, computed, watch, nextTick } from "vue";
import Carrousel from "../carrousel/index.vue";
import CarrouselContent from "../carrousel/Content.vue";
import CarrouselControls from "../carrousel/Controls.vue";
import Slide from "../carrousel/Slide.vue";
import { listPlanets } from "../../service/module/planet.js";
import { useQuery } from '@pinia/colada';
import { UnwrapRefCarouselApi as CarouselApi } from "../../types/carousel";
import { watchOnce } from "@vueuse/core";

const page = ref(1);
const emit = defineEmits(["increment"]);

const api = ref<CarouselApi>();
const totalCount = ref(0);
const current = ref(0);
const accPlanets = ref([]);

const { data: planets, isLoading, refetch, error } = useQuery({
  key: () => ['planets', { page: page.value }],
  query: () => listPlanets(page.value),
});

function setApi(val: CarouselApi) {
  api.value = val;
}

watch(page, (newVal, oldVal) => {
  refetch();
});

watch(planets, (newVal, oldVal) => {
  if (newVal) {
    accPlanets.value = [...accPlanets.value, ...newVal.results];
    totalCount.value = newVal.count;
  }
});

watchOnce(api, (api) => {
  if (!api) return;
  current.value = api.selectedScrollSnap() + 1;

  api.on('select', () => {
    current.value = api.selectedScrollSnap() + 1;
    if (current.value + 4 >= accPlanets.value.length) {
      page.value += 1;
    }
  });
});


</script>

<template>
  <Carrousel :opts="{ align: 'start' }" @init-api="setApi">
    <CarrouselContent>
      <Slide v-for="planet in accPlanets" :key="planet.id" class="basis-1/2 md:basis-1/3 lg:basis-1/5">
        <div class="p-1">
          <CardPlanet :planet="planet"></CardPlanet>
        </div>
      </Slide>
    </CarrouselContent>
    <CarrouselControls></CarrouselControls>
  </Carrousel>
</template>