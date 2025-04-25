<template>
  <div class="mb-5">
    <label
      v-if="label"
      class="block text-text-muted mb-2 text-left font-medium"
    >
      {{ label }}
    </label>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
      class="w-full bg-dark-accent border border-dark-accent/50 rounded-lg px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-primary"
      :class=" error ? 'border-loss' : 'border-dark-accent/50'"
    />
    <p v-if="error" class="mt-1 text-sm text-loss text-red-400">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  type: { type: String, default: "text" },
  placeholder: String,
  modelValue: [String, Number],
  error: String,
  required: Boolean,
});
defineEmits(["update:modelValue", "blur"]);
</script>
