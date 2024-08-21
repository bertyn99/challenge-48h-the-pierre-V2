<script setup lang="ts">
import CardPeople from "./CardPeople.vue";
import { onMounted, ref, computed, watch, nextTick } from "vue";
import Carrousel from "../carrousel/index.vue";
import CarrouselContent from "../carrousel/Content.vue";
import CarrouselControls from "../carrousel/Controls.vue";
import Slide from "../carrousel/Slide.vue";
import { listPeople } from "../../service/module/people";
import { useQuery } from '@pinia/colada'
import {

  UnwrapRefCarouselApi as CarouselApi,
} from "../../types/carousel";
import { watchOnce } from "@vueuse/core";

const page = ref(1);
const emit = defineEmits(["increment"]);


const api = ref<CarouselApi>()
const totalCount = ref(0)
const current = ref(0)

const accPepole = ref([])


const { data: peoples, isLoading, refetch, error } = useQuery({
  key: () => ['peoples', { page: page.value }],
  query: () => listPeople(page.value),
})



function setApi(val: CarouselApi) {
  api.value = val
}



watch(page, (newVal, oldVal) => {
  refetch()
})


watch(peoples, (newVal, oldVal) => {
  console.log('peoples', accPepole.value);
  if (newVal) {
    console.log('newVal', newVal);
    accPepole.value = [...accPepole.value, ...newVal.results]
    totalCount.value = newVal.count
  }
})



watchOnce(api, (api) => {
  if (!api)
    return
  current.value = api.selectedScrollSnap() + 1

  api.on('select', () => {
    current.value = api.selectedScrollSnap() + 1
    if (current.value + 4 >= accPepole.value.length) {
      page.value += 1;
    }
  })
})




</script>

<template>



  <Carrousel :opts="{
    align: 'start',
  }" @init-api="setApi">
    <CarrouselContent>
      <Slide v-for="person in accPepole" :key="person.id" class="basis-1/2 md:basis-1/3 lg:basis-1/5 ">
        <div class="p-1">
          <CardPeople :person="person" @click="
            clickeOnPeople(
              person.url.split('/')[person.url.split('/').length - 2]
            )
            "></CardPeople>
        </div>
      </Slide>
    </CarrouselContent>
    <CarrouselControls></CarrouselControls>
  </Carrousel>
  {{ current }} / {{ totalCount }}
</template>
