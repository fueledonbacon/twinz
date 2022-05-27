<template>
	<div>
		<a
			href="#_"
			class="whitespace-no-wrap inline-flex items-center justify-center rounded-full border border-blue-300 bg-blue-50 px-6 py-3 text-lg font-medium leading-tight text-blue-500 shadow-sm hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-offset-2 focus:ring-offset-blue-600"
			:disabled="!!$wallet.account"
			@click="connectWallet">
			<strong>{{ $wallet.accountCompact }}</strong>
		</a>
	</div>
</template>

<script>
export default {
	methods: {
		async connectWallet() {
			try {
				await this.$wallet.connect()
			} catch (err) {
				console.error({ err })
				this.$toast.error(err.message || 'Wallet connection failed', {
					title: 'Wallet',
					variant: 'danger',
					action: {
						text: 'Close',
						onClick: (e, toastObject) => {
							toastObject.goAway(0)
						},
					},
				})
			}
		},
	},
}
</script>
