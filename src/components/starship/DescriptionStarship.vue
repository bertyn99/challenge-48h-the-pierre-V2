<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { getStarshipById } from "../../service/module/starship";

const props = defineProps({
  id: String,
});

let loading = ref(true);
let oneStarship = ref(null);

onMounted(async () => {
  let data = await getStarshipById(props.id);
  oneStarship.value = data.data;
  loading.value = false;
});

watch(async (id) => {
  loading.value = true;
  let data = await getStarshipById(props.id);
  oneStarship.value = data.data;
  loading.value = false;
});
const urlImg = computed(
  () => new URL(`../../assets/img/starships/${props.id}.png`, import.meta.url).href
);
</script>

<template>
  <div v-if="loading == true">loading</div>
  <div v-else-if="oneStarship != null" id="starship"
    class="max-w-7xl sm:px-6 lg:px-8 flex flex-col-reverse sm:flex-row justify-between mx-auto">
    <div class="sm:w-1/2 flex flex-col justify-end">
      <h2 class="text-[30px] items-center">{{ oneStarship.name }}</h2>
      <ul class="m-2 text-[15px]">
        <li class="m-2">model : {{ oneStarship.model }}</li>
        <li class="m-2">manufacturer : {{ oneStarship.manufacturer }}</li>
        <li class="m-2" v-if="oneStarship.cost_in_credits != 'n/a'">
          cost in credits : {{ oneStarship.cost_in_credits }}
        </li>
        <li class="m-2" v-if="oneStarship.length != 'n/a'">
          length : {{ oneStarship.length }}
        </li>
        <li class="m-2" v-if="oneStarship.max_atmosphering_speed != 'n/a'">
          max atmosphering speed : {{ oneStarship.max_atmosphering_speed }}
        </li>
        <li class="m-2" v-if="oneStarship.crew != 'n/a'">
          crew : {{ oneStarship.crew }}
        </li>
        <li class="m-2" v-if="oneStarship.passengers != 'n/a'">
          passengers : {{ oneStarship.passengers }}
        </li>
        <li class="m-2" v-if="oneStarship.cargo_capacity != 'n/a'">
          cargo capacity : {{ oneStarship.cargo_capacity }}
        </li>
        <li class="m-2" v-if="oneStarship.consumables != 'n/a'">
          consumables : {{ oneStarship.consumables }}
        </li>
        <li class="m-2" v-if="oneStarship.hyperdrive_rating != 'n/a'">
          hyperdrive rating : {{ oneStarship.hyperdrive_rating }}
        </li>
        <li class="m-2" v-if="oneStarship.MGLT != 'n/a'">
          MGLT : {{ oneStarship.MGLT }}
        </li>
        <li class="m-2" v-if="oneStarship.starship_class != 'n/a'">
          starship class : {{ oneStarship.starship_class }}
        </li>
        <li class="m-2">Manufacturer : {{ oneStarship.manufacturer }}</li>
      </ul>
    </div>
    <img class="sm:w-1/2 md:max-h-[500px] md:max-w-[420px]" :src="urlImg" alt="" />
  </div>
</template>

<style scoped>
#starship {
  position: relative;
}

@media screen(sm) {
  #starship {
    --left-position: 55%;
    --font-txt-bg: 6rem;
  }
}

@media screen(md) {
  #starship {
    --left-position: 55%;
    --font-txt-bg: 7rem;
  }

  #starship::after {
    z-index: -3 !important;
  }
}

#starship::after {
  font-family: "Star Jhol";
  content: "starship";
  position: absolute;
  top: var(--top-position);
  left: var(--left-position);
  font-size: var(--font-txt-bg);
  z-index: 3;
}
</style>
