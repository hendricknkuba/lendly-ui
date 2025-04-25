<template>
  <button
    :class="[
      'rounded-lg px-6 py-3 font-medium transition-all',
      primary
        ? 'bg-primary hover:bg-primary-hover text-white'
        : 'bg-dark-secondary hover:bg-dark-accent text-text-main',
    ]"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  primary: { type: Boolean, default: true },
});
</script>
