<template>
	<div class="mx-auto max-w-7xl">
		<div class="container mx-auto py-32 text-center sm:px-4">
			<h1
				class="text-4xl font-extrabold leading-10 tracking-tight text-white sm:text-5xl sm:leading-none md:text-6xl xl:text-7xl">
				<span class="block">Verify you're on the </span>
				<span class="relative mt-3 inline-block text-orange-300">whitelist.</span>
			</h1>
			<div
				class="mx-auto mt-6 max-w-lg text-center text-sm text-indigo-200 sm:text-base md:mt-12 md:max-w-xl md:text-lg xl:text-xl">
				Enter your Ethereum address or ENS name to confirm that you're on our
				whitelist for the launch!
			</div>
			<div
				class="relative mx-auto mt-12 flex max-w-xl items-center overflow-hidden rounded-full text-center">
				<input
					type="text"
					placeholder="0x1...123 or ENS"
					v-model="address"
					@input="ensListener"
					class="h-12 w-full px-6 py-2 font-medium text-gray-600 focus:outline-none" />
				<span class="relative top-0 right-0 block">
					<button
						type="button"
						class="inline-flex h-12 w-32 items-center border border-transparent bg-indigo-400 px-8 text-base font-bold leading-6 text-white transition duration-150 ease-in-out hover:bg-indigo-700 focus:outline-none active:bg-indigo-700"
						@click="ensListener($event, true)">
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
