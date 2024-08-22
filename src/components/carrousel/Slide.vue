<script setup lang="ts">
import { useCarousel } from "../../composables/useCarousel";
import { WithClassAsProps } from "../../types/carousel";
const { orientation } = useCarousel()
</script>

<template>
  <div class="min-w-0 shrink-0 grow-0 pl-4" aria-roledescription="slide" role="group">
    <slot></slot>
  </div>
</template>

<style scoped></style>
