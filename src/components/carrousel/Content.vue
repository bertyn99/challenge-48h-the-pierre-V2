<script setup lang="ts">
import { useCarousel } from '../../composables/useCarousel';
import { WithClassAsProps } from '../../types/carousel';

defineOptions({
    inheritAttrs: false,
})

const props = defineProps<WithClassAsProps>()

const { carouselRef, orientation } = useCarousel()
</script>
<template>
    <div class="overflow-hidden" ref="carouselRef">



        <div class="flex -ml-4 " v-bind="$attrs">
            <slot />
        </div>

    </div>
</template>