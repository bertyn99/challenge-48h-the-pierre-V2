<script setup lang="ts">
import CardStarship from "./CardStarship.vue";
import { ref, watch } from "vue";
import Carrousel from "../carrousel/index.vue";
import CarrouselContent from "../carrousel/Content.vue";
import CarrouselControls from "../carrousel/Controls.vue";
import Slide from "../carrousel/Slide.vue";
import { listStarships } from "../../service/module/starship";
import { useQuery } from '@pinia/colada';
import { UnwrapRefCarouselApi as CarouselApi } from "../../types/carousel";
import { watchOnce } from "@vueuse/core";

const page = ref(1);
const emit = defineEmits(["increment"]);

const api = ref<CarouselApi>();
const totalCount = ref(0);
const current = ref(0);
const accStarships = ref([]);

const { data: starships, isLoading, refetch, error } = useQuery({
  key: () => ['starships', { page: page.value }],
  query: () => listStarships(page.value),
});

console.log('starships', starships);
function setApi(val: CarouselApi) {
  api.value = val;
}

watch(page, (newVal, oldVal) => {
  refetch();
});

watch(starships, (newVal, oldVal) => {
  if (newVal) {
    accStarships.value = [...accStarships.value, ...newVal.results];
    totalCount.value = newVal.count;
  }
});

watchOnce(api, (api) => {
  if (!api) return;
  current.value = api.selectedScrollSnap() + 1;

  api.on('select', () => {
    current.value = api.selectedScrollSnap() + 1;
    if (current.value + 4 >= accStarships.value.length) {
      page.value += 1;
    }
  });
});


</script>

<template>
  <Carrousel :opts="{ align: 'start' }" @init-api="setApi">
    <CarrouselContent>
      <Slide v-for="starship in accStarships" :key="starship.id" class="basis-1/2 md:basis-1/3 lg:basis-1/5">
        <div class="p-1">
          <CardStarship :starship="starship"></CardStarship>
        </div>
      </Slide>
    </CarrouselContent>
    <CarrouselControls></CarrouselControls>
  </Carrousel>
</template>