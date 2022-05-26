<template>

<div class="bg-black pt-8 text-white">
  <div class="pt-6 pb-16 sm:pb-24">

    <div class="mt-8 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
        <div class="lg:col-start-8 lg:col-span-5">
          <div class="flex justify-between">
            <h1 class="text-xl font-medium">AWESOME MINTER MERCH</h1>
          </div>

        </div>

        <!-- Image gallery -->
        <div class="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
          <h2 class="sr-only">Images</h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
            <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg" alt="Back of women&#039;s Basic Tee in black." class="lg:col-span-2 lg:row-span-2 rounded-lg">

            <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-01.jpg" alt="Side profile of women&#039;s Basic Tee in black." class="hidden lg:block rounded-lg">

            <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-02.jpg" alt="Front of women&#039;s Basic Tee in black." class="hidden lg:block rounded-lg">
          </div>
        </div>

        <div class="mt-8 lg:col-span-5">
          <form>
            <!-- Color picker -->
            <div>
              <h2 class="text-sm font-medium">Color</h2>

              <fieldset class="mt-2">
                <legend class="sr-only">Choose a color</legend>
                <div class="flex items-center space-x-3">
                  <!--
                    Active and Checked: "ring ring-offset-1"
                    Not Active and Checked: "ring-2"
                  -->
                  <label class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-900">
                    <input type="radio" name="color-choice" value="Black" class="sr-only" aria-labelledby="color-choice-0-label">
                    <p id="color-choice-0-label" class="sr-only">Black</p>
                    <span aria-hidden="true" class="h-8 w-8 bg-gray-900 border border-black border-opacity-10 rounded-full"></span>
                  </label>

                  <!--
                    Active and Checked: "ring ring-offset-1"
                    Not Active and Checked: "ring-2"
                  -->
                  <label class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-400">
                    <input type="radio" name="color-choice" value="Heather Grey" class="sr-only" aria-labelledby="color-choice-1-label">
                    <p id="color-choice-1-label" class="sr-only">Heather Grey</p>
                    <span aria-hidden="true" class="h-8 w-8 bg-gray-400 border border-black border-opacity-10 rounded-full"></span>
                  </label>
                </div>
              </fieldset>
            </div>

            <!-- Size picker -->
            <div class="mt-8">
              <div class="flex items-center justify-between">
                <h2 class="text-sm font-medium">Size</h2>
                <a href="#" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">See sizing chart</a>
              </div>

              <fieldset class="mt-2">
                <legend class="sr-only">Choose a size</legend>
                <div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
                  <!--
                    In Stock: "cursor-pointer", Out of Stock: "opacity-25 cursor-not-allowed"
                    Active: "ring-2 ring-offset-2 ring-indigo-500"
                    Checked: "bg-indigo-600 border-transparent text-white hover:bg-indigo-700", Not Checked: "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
                  -->
                  <label class="border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none">
                    <input type="radio" name="size-choice" value="XXS" class="sr-only" aria-labelledby="size-choice-0-label">
                    <p id="size-choice-0-label">XXS</p>
                  </label>

                  <!--
                    In Stock: "cursor-pointer", Out of Stock: "opacity-25 cursor-not-allowed"
                    Active: "ring-2 ring-offset-2 ring-indigo-500"
                    Checked: "bg-indigo-600 border-transparent text-white hover:bg-indigo-700", Not Checked: "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
                  -->
                  <label class="border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none">
                    <input type="radio" name="size-choice" value="XS" class="sr-only" aria-labelledby="size-choice-1-label">
                    <p id="size-choice-1-label">XS</p>
                  </label>

                  <!--
                    In Stock: "cursor-pointer", Out of Stock: "opacity-25 cursor-not-allowed"
                    Active: "ring-2 ring-offset-2 ring-indigo-500"
                    Checked: "bg-indigo-600 border-transparent text-white hover:bg-indigo-700", Not Checked: "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
                  -->
                  <label class="border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none">
                    <input type="radio" name="size-choice" value="S" class="sr-only" aria-labelledby="size-choice-2-label">
                    <p id="size-choice-2-label">S</p>
                  </label>

                  <!--
                    In Stock: "cursor-pointer", Out of Stock: "opacity-25 cursor-not-allowed"
                    Active: "ring-2 ring-offset-2 ring-indigo-500"
                    Checked: "bg-indigo-600 border-transparent text-white hover:bg-indigo-700", Not Checked: "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
                  -->
                  <label class="border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none">
                    <input type="radio" name="size-choice" value="M" class="sr-only" aria-labelledby="size-choice-3-label">
                    <p id="size-choice-3-label">M</p>
                  </label>

                  <!--
                    In Stock: "cursor-pointer", Out of Stock: "opacity-25 cursor-not-allowed"
                    Active: "ring-2 ring-offset-2 ring-indigo-500"
                    Checked: "bg-indigo-600 border-transparent text-white hover:bg-indigo-700", Not Checked: "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
                  -->
                  <label class="border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none">
                    <input type="radio" name="size-choice" value="L" class="sr-only" aria-labelledby="size-choice-4-label">
                    <p id="size-choice-4-label">L</p>
                  </label>

                  <!--
                    In Stock: "cursor-pointer", Out of Stock: "opacity-25 cursor-not-allowed"
                    Active: "ring-2 ring-offset-2 ring-indigo-500"
                    Checked: "bg-indigo-600 border-transparent text-white hover:bg-indigo-700", Not Checked: "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
                  -->
                  <label class="border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 opacity-25 cursor-not-allowed">
                    <input type="radio" name="size-choice" value="XL" disabled class="sr-only" aria-labelledby="size-choice-5-label">
                    <p id="size-choice-5-label">XL</p>
                  </label>
                </div>
              </fieldset>
            </div>

            <button type="submit" class="mt-8 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Redeem</button>
          </form>
          <address-form v-if="1" v-model="customerData" @redeem="redeem()"/>

          <!-- Product details -->
          <div class="mt-10">
            <h2 class="text-sm font-medium text-gray-900">Description</h2>

            <div class="mt-4 prose prose-sm text-gray-500">
              <p>The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.</p>
              <p>Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.</p>
            </div>
          </div>

          <div class="mt-8 border-t border-gray-200 pt-8">
            <h2 class="text-sm font-medium text-gray-900">Fabric &amp; Care</h2>

            <div class="mt-4 prose prose-sm text-gray-500">
              <ul role="list">
                <li>Only the best materials</li>

                <li>Ethically and locally made</li>

                <li>Pre-washed and pre-shrunk</li>

                <li>Machine wash cold with similar colors</li>
              </ul>
            </div>
          </div>


        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>

export default {
  name: 'redeem',
  computed: {
    isLoggedIn(){
      return this.$wallet.account
    },
    isMinter(){
      return true
      // return this.isLoggedIn && MINTERS.includes(this.$wallet.account.toLowerCase())
    }
  },
  watch: {
    isLoggedIn: function(){
      if(this.isLoggedIn && this.isMinter){
        this.$nextTick(function(){
          this.checkRedemption()
        })
      }
    }
  },
  data() {
    return {
      redeemModal: false,
      shirtSize: 'L',
      shirtColor: 'White',
      hasRedeemed: false,
      customerData: {},
      errors:[]
    }
  },
  methods: {
    async checkRedemption(){
      try{

        const response = await fetch('/.netlify/functions/has-redeemed', {method: 'POST', body: JSON.stringify({ethAddress: this.$wallet.account })})
        const data = await response.json()
        this.hasRedeemed = data.redeemed

      }catch(e){
        //do nothing
      }
    },
    toggleRedeem() {
      this.redeemModal = !this.redeemModal
    },
    validateData()  {
      this.errors = [];

      (!this.customerData.name) ? this.errors.push('Name'): '';
      (!this.customerData.email) ? this.errors.push('Email'): '';
      (!this.customerData.address1) ? this.errors.push('Address'): '';
      (!this.customerData.city) ? this.errors.push('City'): '';
      (!this.customerData.province) ? this.errors.push('Province') : '';
      (!this.customerData.zip) ? this.errors.push('zip') : '';
      if(this.errors.length > 0) { return false  } return true
      
    },
    async redeem() {
      if(!this.validateData()) return false
      try{
        console.log('attempt to process order')
        const signer = await this.$wallet.provider.getSigner();
        const message = `I'm signing to redeem this hoodie at ${new Date().getTime()}`
        const signature = await signer.signMessage(message, this.$wallet.account)
        const response  = await fetch('/.netlify/functions/redeem-shopify-merch', {
          method: 'POST',
          headers: { 'Accept': 'application/json'},
          body: JSON.stringify({
            ethAddress: this.$wallet.account,
            signature,
            message,
            name: this.customerData.name,
            email: this.customerData.email,
            address:{
              address1: this.customerData.address1,
              address2: this.customerData.address2,
              city: this.customerData.city,
              province: this.customerData.province,
              zip: this.customerData.zip
            },
            shirtSize: this.shirtSize,
            shirtColor: this.shirtColor
          })
        })
        const data = await response.json()
        console.log(data)
        this.$toast.show('Your hoodie has been redeemed, thanks for minting!', {
          variant: 'success',
          action: {
            text: 'Close',
            onClick: (e, toastObject) => {
              toastObject.goAway(0)
            },
          },
        })
      } catch (e) {
        this.$toast.error('Something went wrong. Try again.', {
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
  }
}
</script>

<style >
header{
  @apply  sm:bg-black
}
input[type=text]{
  @apply p-2 border-2 bg-transparent mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md;
}
</style>