<script setup lang="ts">
import CardVehicle from "./CardVehicle.vue";
import { ref, watch } from "vue";
import Carrousel from "../carrousel/index.vue";
import CarrouselContent from "../carrousel/Content.vue";
import CarrouselControls from "../carrousel/Controls.vue";
import Slide from "../carrousel/Slide.vue";
import { listVehicles } from "../../service/module/vehicle";
import { useQuery } from '@pinia/colada';
import { UnwrapRefCarouselApi as CarouselApi } from "../../types/carousel";
import { watchOnce } from "@vueuse/core";

const page = ref(1);
const emit = defineEmits(["increment"]);

const api = ref<CarouselApi>();
const totalCount = ref(0);
const current = ref(0);
const accVehicles = ref([]);

const { data: vehicles, isLoading, refetch, error } = useQuery({
  key: () => ['vehicles', { page: page.value }],
  query: () => listVehicles(page.value),
});

function setApi(val: CarouselApi) {
  api.value = val;
}

watch(page, (newVal, oldVal) => {
  refetch();
});

watch(vehicles, (newVal, oldVal) => {
  if (newVal) {
    accVehicles.value = [...accVehicles.value, ...newVal.results];
    totalCount.value = newVal.count;
  }
});

watchOnce(api, (api) => {
  if (!api) return;
  current.value = api.selectedScrollSnap() + 1;

  api.on('select', () => {
    current.value = api.selectedScrollSnap() + 1;
    if (current.value + 4 >= accVehicles.value.length) {
      page.value += 1;
    }
  });
});


</script>

<template>
  <Carrousel :opts="{ align: 'start' }" @init-api="setApi" class="mx-4 md:mx-auto">
    <CarrouselContent class="-ml-4" id="dd">
      <Slide v-for="vehicle in accVehicles" :key="vehicle.id" class="basis-1/2 md:basis-1/3 lg:basis-1/5 pl-4">
        <div class="p-1">
          <CardVehicle :vehicle="vehicle"></CardVehicle>
        </div>
      </Slide>
    </CarrouselContent>
    <CarrouselControls></CarrouselControls>
  </Carrousel>
</template>