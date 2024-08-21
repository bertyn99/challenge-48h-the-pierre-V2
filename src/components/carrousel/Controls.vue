<script setup lang="ts">
import { useCarousel } from '../../composables/useCarousel';


const { orientation, scrollNext, scrollPrev, canScrollNext, canScrollPrev } = useCarousel()
</script>

<template>
    <button @click="scrollPrev" :disabled="!canScrollPrev"
        class="hidden md:block touch-manipulation absolute h-8 w-8 rounded-full p-0 -left-12 top-1/2 -translate-y-1/2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        <span class="sr-only">Previous Slide</span>

    </button>
    <button @click="scrollNext" :disabled="!canScrollNext"
        class="hidden md:block touch-manipulation absolute h-8 w-8 rounded-full p-0 -right-12 top-1/2 -translate-y-1/2 ">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
        <span class="sr-only">Next Slide</span>
    </button>
</template>