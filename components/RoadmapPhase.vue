<template>
  <div
    ref="block"
    class="relative flex flex-col rounded-tr-3xl px-8 pt-4 pb-6 sm:rounded-tr-[150px] sm:px-24 sm:pt-16 sm:pb-20 md:flex-row duration-300"
    :class="{
      'bg-primary': alwaysActive || active,
      'bg-neutral-400/10 backdrop-blur-md': !(alwaysActive || active),
    }">
    <div class="mb-5 w-full text-xl font-bold sm:text-4xl md:w-2/5">
      <div class="lg:w-2/3">
        <span class="inline-block whitespace-nowrap">
          {{ data.title }} -&nbsp;
        </span>
        <span class="inline-block whitespace-nowrap"> {{ data.period }} </span>
      </div>
    </div>
    <div class="font-lato w-full text-sm sm:text-lg md:w-3/5">
      {{ data.todo }}
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    active: false
  }),
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    alwaysActive: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    document.addEventListener('scroll', this.checkScrolling)
  },
  beforeUnmount () {
    document.removeEventListener('scroll', this.checkScrolling)
  },
  methods: {
    checkScrolling () {
      if (!this.$refs.block) { return }

      const { top, bottom } = this.$refs.block.getBoundingClientRect()
      this.active = top < 150
    }
  }
}
</script>
