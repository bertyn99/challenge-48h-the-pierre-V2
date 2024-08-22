<script setup lang="ts">
import CardSpecie from "./CardSpecie.vue";
import { ref, watch } from "vue";
import Carrousel from "../carrousel/index.vue";
import CarrouselContent from "../carrousel/Content.vue";
import CarrouselControls from "../carrousel/Controls.vue";
import Slide from "../carrousel/Slide.vue";
import { listSpecies } from "../../service/module/specie";
import { useQuery } from '@pinia/colada';
import { UnwrapRefCarouselApi as CarouselApi } from "../../types/carousel";
import { watchOnce } from "@vueuse/core";

const page = ref(1);
const emit = defineEmits(["increment"]);

const api = ref<CarouselApi>();
const totalCount = ref(0);
const current = ref(0);
const accSpecies = ref([]);

const { data: species, isLoading, refetch, error } = useQuery({
  key: () => ['species', { page: page.value }],
  query: () => listSpecies(page.value),
});

function setApi(val: CarouselApi) {
  api.value = val;
}

watch(page, (newVal, oldVal) => {
  refetch();
});

watch(species, (newVal, oldVal) => {
  if (newVal) {
    accSpecies.value = [...accSpecies.value, ...newVal.results];
    totalCount.value = newVal.count;
  }
});

watchOnce(api, (api) => {
  if (!api) return;
  current.value = api.selectedScrollSnap() + 1;

  api.on('select', () => {
    current.value = api.selectedScrollSnap() + 1;
    if (current.value + 4 >= accSpecies.value.length) {
      page.value += 1;
    }
  });
});

</script>

<template>
  <Carrousel :opts="{ align: 'start' }" @init-api="setApi">
    <CarrouselContent class="-ml-4">
      <Slide v-for="specie in accSpecies" :key="specie.id" class="basis-1/2 md:basis-1/3 lg:basis-1/5 pl-4">
        <div class="p-1">
          <CardSpecie :spec="specie"></CardSpecie>
        </div>
      </Slide>
    </CarrouselContent>
    <CarrouselControls></CarrouselControls>
  </Carrousel>
</template>