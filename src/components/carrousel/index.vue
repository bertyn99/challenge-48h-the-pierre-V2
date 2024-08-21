<script setup lang="ts">
import { ref } from "vue";

import { CarouselProps, CarouselEmits } from "../../types/carousel";
import { useCarousel, useProvideCarousel } from "../../composables/useCarousel";

const props = withDefaults(defineProps<CarouselProps>(), {
  orientation: 'horizontal',
})

const emits = defineEmits<CarouselEmits>()
const carouselArgs = useProvideCarousel(props, emits)
defineExpose(carouselArgs)

function onKeyDown(event: KeyboardEvent) {
  const prevKey = props.orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft'
  const nextKey = props.orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight'

  if (event.key === prevKey) {
    event.preventDefault()
    carouselArgs.scrollPrev()

    return
  }

  if (event.key === nextKey) {
    event.preventDefault()
    carouselArgs.scrollNext()
  }
}


</script>

<template>
  <div class="relative w-full max-w-5xl mx-auto" role="region" aria-roledescription="carousel" tabindex="0"
    @keydown="onKeyDown">
    <slot v-bind="carouselArgs"></slot>
    <!--    sm:px-6 lg:px-8 bg-red-400 relative px-4 -->

  </div>

</template>

<style scoped lang="postcss">
.embla__viewport {
  overflow: hidden;

}
</style>
