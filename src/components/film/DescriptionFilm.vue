<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { getFilmById } from "../../service/module/film";
import { useMutation, useQuery } from '@pinia/colada'
const props = defineProps({
  id: String,
});



/* let character = ref(null); */
const { data: movie, isLoading, refetch, error } = useQuery({
  // recognizes this query as ['contacts', id]
  key: () => ['movie', props.id],
  query: () => getFilmById(props.id),
})

const movieID = computed(() => movie.value?.url.split("/")[movie.value?.url.split("/").length - 2])
console.log(isLoading.value);
/* watch(async (id) => {
  loading.value = true;
  let data = await getFilmById(props.id);
  movie.value = data.data;
  loading.value = false;
}); */
const urlImg = computed(() => new URL("../src/assets/img/films/" + props.id + ".png", import.meta.url).href);
</script>

<template>

  <div id="film" class="max-w-7xl sm:px-6 lg:px-8 flex flex-col-reverse sm:flex-row justify-between mx-auto">
    <div class="sm:w-1/2 flex flex-col justify-end">
      <h2 class="text-[30px] items-center">{{ movie?.title }}</h2>
      <ul class="m-2 text-[15px]">
        <li class="m-2" v-if="movie?.episode_id != 'n/a'">
          episode id : {{ movie?.episode_id }}
        </li>
        <li class="m-2" v-if="movie?.opening_crawl != 'n/a'">
          opening crawl : {{ movie?.opening_crawl }}
        </li>
        <li class="m-2" v-if="movie?.director != 'n/a'">
          director : {{ movie?.director }}
        </li>
        <li class="m-2" v-if="movie?.producer != 'n/a'">
          producer: {{ movie?.producer }}
        </li>
        <li class="m-2" v-if="movie?.release_date != 'n/a'">
          release date : {{ movie?.release_date }}
        </li>
      </ul>
    </div>
    <img class="sm:w-1/2 max-h-[500px] max-w-[420px]" :src="urlImg" alt=""
      :style="{ viewTransitionName: `film-image-${movieID}` }" />
  </div>
</template>

<style scoped>
#film {
  position: relative;
  --font-txt-bg: 5.25rem;
}

@media screen(sm) {
  #film {
    --left-position: 55%;
    --font-txt-bg: 6rem;
  }
}

@media screen(md) {
  #film {
    --left-position: 55%;
    --font-txt-bg: 7rem;
  }
}

#film::after {
  font-family: "Star Jhol";
  content: "films";
  position: absolute;
  top: var(--top-position);
  left: var(--left-position);
  font-size: var(--font-txt-bg);
  z-index: 3;
}
</style>
