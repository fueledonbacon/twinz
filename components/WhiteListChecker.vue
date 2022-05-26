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
				<span class="block">Verify you're on the </span>
				<span class="relative inline-block mt-3 text-orange-300">whitelist.</span>
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
				Enter your Ethereum address or ENS name to confirm that you're on our
				whitelist for the launch!
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
					placeholder="0x1...123 or ENS"
					v-model="address"
					@input="ensListener"
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
						@click="ensListener($event, true)">
						Verify
					</button>
				</span>
			</div>
			<div
				v-if="message"
				:class="`max-w-lg mx-auto mt-6 text-sm text-center text-gray-700 md:mt-12 sm:text-base md:max-w-xl md:text-lg xl:text-xl ${
					success ? 'bg-green-400' : 'bg-orange-400'
				} rounded-lg p-4`">
				{{ message }}
			</div>
		</div>
	</div>
</template>

<script>
import whitelist from '@/assets/json/whitelist.json'
import { ethers } from 'ethers'

export default {
	name: 'WhiteListChecker',
	async mounted() {
		const response = await fetch('/.netlify/functions/wallets')
		const wallets = await response.json()

		console.log('fetched wallets', wallets)
	},
	data() {
		return {
			address: '',
			message: '',
			resolveName: {},
			success: false,
		}
	},
	methods: {
		async resolveEns(a) {
			let address = ''
			try {
				let provider
				if (window?.ethereum) {
					provider = new ethers.providers.Web3Provider(window.ethereum)
				} else {
					return
				}
				address = await provider.resolveName(a)
			} catch (err) {
				console.log(err)
			} finally {
				return address || ''
			}
		},
		async ensListener(event, clicked) {
			if (this.success) this.success = false
			const isEns = this.address.match(/\.eth$/)
			let address = this.address
			if (isEns) {
				address = await this.resolveEns(address)
			}
			if (address.length == 42) {
				this.address = address
				this.verify()
			} else {
				if (this.message) {
					this.message = ''
				}
				if (clicked) {
					//
					if (!this.address) {
						this.message = 'Address field is empty'
					} else {
						this.message = 'Not a valid address or ENS name'
					}
				}
			}
		},

		onWhitelist() {
			return whitelist.includes(this.address.toLowerCase())
		},

		verify() {
			const onWhitelist = this.onWhitelist()

			if (onWhitelist) {
				this.success = true
				this.message = 'This address on the whitelist!'
			} else {
				this.message = 'This address is not on the whitelist.'
			}
		},
	},
}
</script>
