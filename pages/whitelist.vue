<template>
  <main class="w-full">
    <section class="w-full  smm:h-screen sm:min-h-[56vw] bg-cover bg-center px-3 antialiased lg:px-6 bg-no-repeat">
          <WhiteListChecker/>
          <WhiteListTool/>
    </section>
  </main>
</template>
<script>

export default {
  data() {
    return {}
  },
  computed:{}
}
</script>
<style scoped>
section {
  background-image: url('@/assets/images/bg-image.jpeg');
}
</style>
