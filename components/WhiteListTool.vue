<template>
	<div class="mx-auto max-w-7xl">
		<div class="container py-32 mx-auto text-center sm:px-4">
			<h1
				class="
					text-4xl
					font-extrabold
					leading-10
					tracking-tight
					text-white
					sm:text-5xl sm:leading-none
					md:text-6xl
					xl:text-7xl
				">
				<span class="block text-cyan-300">Twitter </span>
				<span class="relative inline-block mt-3">Challenge.</span>
			</h1>
			<div
				class="
					max-w-lg
					mx-auto
					mt-6
					text-sm text-center text-indigo-200
					md:mt-12
					sm:text-base
					md:max-w-xl md:text-lg
					xl:text-xl
				">
				To begin gathering points toward whitelist, tweet your wallet address, and
				enter the tweet url above. Engage with us on Twitter by using our #hashtags
				and @mentions submitted by our Discord mods.
			</div>
			<div
				class="
					relative
					flex
					items-center
					max-w-xl
					mx-auto
					mt-12
					overflow-hidden
					text-center
					rounded-full
				">
				<input
					type="text"
					placeholder="https://twitter.com/0x_bacon/status/1515429..."
					v-model="twitter_url"
					class="
						w-full
						h-12
						px-6
						py-2
						font-medium
						focus:outline-none
						text-gray-600
					" />
				<span class="relative top-0 right-0 block">
					<button
						type="button"
						class="
							inline-flex
							items-center
							w-32
							h-12
							px-8
							text-base
							font-bold
							leading-6
							text-white
							transition
							duration-150
							ease-in-out
							bg-indigo-400
							border border-transparent
							hover:bg-indigo-700
							focus:outline-none
							active:bg-indigo-700
						"
						@click="twitterUrl()">
						Verify
					</button>
				</span>
			</div>
			<div
				v-if="message"
				:class="`max-w-lg mx-auto mt-6 text-sm text-center text-gray-700 md:mt-12 sm:text-base md:max-w-xl md:text-lg xl:text-xl ${ success ? 'bg-green-400' : 'bg-orange-400' } rounded-lg p-4`">
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
			success: false
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
