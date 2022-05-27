<template>
	<div class="mt-5">
		<form
			action="#"
			method="POST">
			<div class="overflow-hidden shadow sm:rounded-md">
				<div class="py-5">
					<div class="mb-4">
						<h3 class="text-lg font-medium leading-6">Shipping Information</h3>
						<p class="mt-1 bg-transparent text-sm">
							Address where you will receive your merch and email for shipping updates.
						</p>
					</div>
					<div class="grid grid-cols-6 gap-6">
						<div class="col-span-6 sm:col-span-3">
							<label
								for="first-name"
								class="block text-sm font-medium"
								>First name</label
							>
							<input
								v-model="first_name"
								type="text"
								name="first-name"
								id="first-name"
								autocomplete="given-name" />
						</div>

						<div class="col-span-6 sm:col-span-3">
							<label
								for="last-name"
								class="block text-sm font-medium"
								>Last name</label
							>
							<input
								v-model="last_name"
								type="text"
								name="last-name"
								id="last-name"
								autocomplete="family-name" />
						</div>

						<div class="col-span-6 sm:col-span-4">
							<label
								for="email-address"
								class="block text-sm font-medium"
								>Email address</label
							>
							<input
								type="text"
								name="email-address"
								id="email-address"
								autocomplete="email"
								v-model="email" />
						</div>

						<div class="col-span-6">
							<label
								for="street-address"
								class="block text-sm font-medium"
								>Street address</label
							>
							<input
								v-model="address1"
								placeholder="Address 1"
								type="text"
								name="street-address"
								id="street-address"
								autocomplete="street-address" />
							<input
								v-model="address2"
								placeholder="Address"
								type="text"
								name="street-address-2"
								id="street-address-2"
								autocomplete="street-address-2" />
						</div>

						<div class="col-span-6 sm:col-span-6 lg:col-span-2">
							<label
								for="city"
								class="block text-sm font-medium"
								>City</label
							>
							<input
								v-model="city"
								type="text"
								name="city"
								id="city"
								autocomplete="address-level2" />
						</div>

						<div class="col-span-6 sm:col-span-3 lg:col-span-2">
							<label
								for="region"
								class="block text-sm font-medium"
								>State/Province</label
							>
							<input
								v-model="province"
								type="text"
								name="region"
								id="region"
								autocomplete="address-level1" />
						</div>

						<div class="col-span-6 sm:col-span-3 lg:col-span-2">
							<label
								for="postal-code"
								class="block text-sm font-medium"
								>ZIP/Postal Code</label
							>
							<input
								v-model="zip"
								type="text"
								name="postal-code"
								id="postal-code"
								autocomplete="postal-code" />
						</div>
						<div class="col-span-6 sm:col-span-6 lg:col-span-2">
							<label
								for="country"
								class="block text-sm font-medium"
								>Country<br />
								<span class="text-xs">(2-Letter Code)</span></label
							>
							<input
								v-model="country"
								type="text"
								name="country"
								id="country"
								autocomplete="country" />
						</div>
					</div>
				</div>
				<div class="py-3 text-center">
					<button
						@click.prevent="submitRedemption()"
						type="submit"
						class="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
						Redeem
					</button>
				</div>
				<div
					v-if="!fresh && errors.length > 0"
					class="my-4 rounded-sm bg-orange-700 p-4">
					<p
						v-for="(msg, i) in errors"
						:key="`form_validation_error_${i}`">
						{{ msg }}
					</p>
				</div>
			</div>
		</form>
	</div>
</template>
<script>
export default {
	computed: {
		first_name: {
			get() {
				return this.info.first_name
			},
			set(v) {
				this.info.first_name = v
				this.info.name = v + ' ' + this.info.last_name
				this.updateInput()
			},
		},
		last_name: {
			get() {
				return this.info.last_name
			},
			set(v) {
				this.info.last_name = v
				this.info.name = this.info.first_name + ' ' + v
				this.updateInput()
			},
		},
		email: {
			get() {
				return this.info.email
			},
			set(v) {
				this.info.email = v
				this.updateInput()
			},
		},

		address1: {
			get() {
				return this.info.address1
			},
			set(v) {
				this.info.address1 = v
				this.updateInput()
			},
		},
		address2: {
			get() {
				return this.info.address2
			},
			set(v) {
				this.info.address2 = v
				this.updateInput()
			},
		},
		city: {
			get() {
				return this.info.city
			},
			set(v) {
				this.info.city = v
				this.updateInput()
			},
		},
		province: {
			get() {
				return this.info.province
			},
			set(v) {
				this.info.province = v
				this.updateInput()
			},
		},
		zip: {
			get() {
				return this.info.zip
			},
			set(v) {
				this.info.zip = v
				this.updateInput()
			},
		},
		country: {
			get() {
				return this.info.country
			},
			set(v) {
				if (!v) {
					this.info.country = ''
					return
				} else {
					this.info.country = v.toUpperCase()
				}
				this.updateInput()
			},
		},
	},
	data() {
		return {
			fresh: true,
			errors: [],
			info: {
				first_name: '',
				last_name: '',
				name: '',
				email: '',
				address1: '',
				address2: '',
				city: '',
				province: '',
				zip: '',
				country: 'US',
			},
		}
	},
	methods: {
		updateInput() {
			// only emits valid data for submission
			// calls validInput on every keypress so errors are real time
			if (this.validInput()) this.$emit('input', this.info)
		},
		emailIsValid(email) {
			return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
		},
		validInput() {
			let errors = []
			if (!this.info.first_name) errors.push('Must enter a first name.')
			if (!this.info.last_name) errors.push('Must enter a last name.')
			if (!this.emailIsValid(this.info.email)) errors.push('Email is invalid.')
			if (!this.info.address1) {
				errors.push('Must enter a street address')
			}
			if (!this.info.city) {
				errors.push('Must enter a city')
			}
			if (!this.info.province) {
				errors.push('Must enter a state or province')
			}
			if (!this.info.zip) {
				errors.push('Must enter a zip or postal code')
			}
			if (
				!this.info.country ||
				this.info.country.match(/[A-Z]/g)?.join('').length !== 2 ||
				this.info.country.length !== 2
			) {
				errors.push('Must enter a 2-letter country code')
			}
			this.errors = errors
			return !(errors.length > 0)
		},
		submitRedemption() {
			// doesn't show errors until user attempts submission once.
			if (this.fresh) this.fresh = false
			if (!this.validInput()) {
				this.$toast.error('Invalid form entries. Correct errors and try again.', {
					variant: 'danger',
					action: {
						text: 'Close',
						onClick: (e, toastObject) => {
							toastObject.goAway(0)
						},
					},
				})
				return
			}
			this.$emit('redeem')
		},
	},
}
</script>
