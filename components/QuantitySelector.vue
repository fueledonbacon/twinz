<template>
  <div
    class="bg-white/50 mb-7 rounded flex items-center justify-around w-full max-w-md mx-auto"
  >
    <button
      @click="quantity = Math.max(min, quantity - 1)"
      class="flex items-center justify-center text-4xl font-medium text-center text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 p-4"
    >
      -
    </button>
    <span class="text-4xl text-lionz-accent">{{ quantity }}</span>
    <button
      @click="quantity = Math.min(max, quantity + 1)"
      class="flex items-center justify-center text-4xl font-medium text-center text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 p-4"
    >
      +
    </button>
  </div>
</template>
<script>
export default {
  props: {
    value: Number,
    min: Number,
    max: Number,
  },
  computed: {
    quantity: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('input', v)
      },
    },
  },
}
</script>
