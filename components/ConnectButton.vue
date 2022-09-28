<template>
	<div>
		<a
			href="#_"
			class="whitespace-no-wrap inline-flex items-center justify-center  bg-red-600 px-6 py-3 text-lg font-medium leading-tight text-black shadow-sm hover:bg-black hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-600"
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
