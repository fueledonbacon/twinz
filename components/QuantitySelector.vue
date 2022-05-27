<template>
	<div
		class="mx-auto mb-7 flex w-full max-w-md items-center justify-around rounded bg-white/50">
		<button
			@click="quantity = Math.max(min, quantity - 1)"
			class="flex items-center justify-center rounded-lg p-4 text-center text-4xl font-medium text-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
			-
		</button>
		<span class="text-lionz-accent text-4xl">{{ quantity }}</span>
		<button
			@click="quantity = Math.min(max, quantity + 1)"
			class="flex items-center justify-center rounded-lg p-4 text-center text-4xl font-medium text-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
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
