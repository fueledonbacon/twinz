<template>
	<main class="w-full">
		<section
			class="smm:h-screen w-full bg-cover bg-center bg-no-repeat px-3 antialiased sm:min-h-[56vw] lg:px-6">
			<WhiteListChecker />
			<WhiteListTool />
		</section>
	</main>
</template>
<script>
export default {
	data() {
		return {}
	},
	computed: {},
}
</script>
<style scoped>
section {
	background-image: url('@/assets/images/bg-image.jpeg');
}
</style>
