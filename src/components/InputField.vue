<template>
  <div class="mb-5">
    <label v-if="label" class="block text-text-muted mb-2 text-left font-medium">
      {{ label }}
    </label>
    <input
      :type="type"
      :placeholder="placeholder"
      class="w-full bg-dark-accent border border-dark-accent/50 rounded-lg px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-primary"
    />
  </div>
</template>

<script setup>
defineProps({
  label: String,
  type: { type: String, default: "text" },
  placeholder: String,
});
</script>
