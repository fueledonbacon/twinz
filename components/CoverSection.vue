<template>
	<section
		id="cover-section"
		class="bg-no-repeat bg-cover pt-24 min-h-screen lg:h-full bg-center">
		<div
			class="flex flex-col mx-auto text-center space-y-12">
			<BigTitle />
			<Mint v-if="1" />
			<Countdown v-else :end="presaleStartTime" />
		</div>
	</section>
</template>
<style scoped>
@media only screen and (max-width: 600px) {
	section {
		background-size: cover;
		min-height: 100vh;
	}
}
</style>

<script>
export default {
	mounted() {
		const interval = setInterval(() => {
			this.now = new Date().getTime()
			if (this.now > this.presaleStartTime) {
				clearInterval(interval)
			}
		}, 1000)
	},
	computed: {
		startMint() {
			console.log()
			return this.now < this.presaleStartTime
		},
	},
	data() {
		return {
			now: new Date().getTime(),
			presaleStartTime: 1617788950,
		}
	},
}
</script>

<style scoped>
section {
	background-image: url('@/assets/images/bg-image.jpeg');
}

@media only screen and (max-width: 600px) {
	section {
		background-size: cover;
		min-height: 100vh;
	}
}
</style>
