<template>
	<div class="mx-auto max-w-7xl">
		<div class="container mx-auto py-32 text-center sm:px-4">
			<h1
				class="text-4xl font-extrabold leading-10 tracking-tight text-white sm:text-5xl sm:leading-none md:text-6xl xl:text-7xl">
				<span class="block text-cyan-300">Twitter </span>
				<span class="relative mt-3 inline-block">Challenge.</span>
			</h1>
			<div
				class="mx-auto mt-6 max-w-lg text-center text-sm text-indigo-200 sm:text-base md:mt-12 md:max-w-xl md:text-lg xl:text-xl">
				To begin gathering points toward whitelist, tweet your wallet address, and
				enter the tweet url above. Engage with us on Twitter by using our #hashtags
				and @mentions submitted by our Discord mods.
			</div>
			<div
				class="relative mx-auto mt-12 flex max-w-xl items-center overflow-hidden rounded-full text-center">
				<input
					type="text"
					placeholder="https://twitter.com/0x_bacon/status/1515429..."
					v-model="twitter_url"
					class="h-12 w-full px-6 py-2 font-medium text-gray-600 focus:outline-none" />
				<span class="relative top-0 right-0 block">
					<button
						type="button"
						class="inline-flex h-12 w-32 items-center border border-transparent bg-indigo-400 px-8 text-base font-bold leading-6 text-white transition duration-150 ease-in-out hover:bg-indigo-700 focus:outline-none active:bg-indigo-700"
						@click="twitterUrl()">
						Verify
					</button>
				</span>
			</div>
			<div
				v-if="message"
				:class="`mx-auto mt-6 max-w-lg text-center text-sm text-gray-700 sm:text-base md:mt-12 md:max-w-xl md:text-lg xl:text-xl ${
					success ? 'bg-green-400' : 'bg-orange-400'
				} rounded-lg p-4`">
				{{ message }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'WhiteListTool',
	async mounted() {},
	data() {
		return {
			twitter_url: '',
			message: '',
			success: false,
		}
	},
	methods: {
		async twitterUrl() {
			if (!this.$wallet.account) {
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
			}

			let tweet = this.twitter_url
			let tweetId = tweet.split('/').reverse()[0].split('?')[0]
			let address = this.$wallet.account

			const body = {
				ethAddress: address,
				tweetId: tweetId,
			}

			let response = await fetch('/.netlify/functions/whitelist-registration', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			})

			this.success = response.status == 200
			const text = await response.text()
			this.message = this.success ? 'Validation Sucesss' : text || 'error'
		},
	},
}
</script>
