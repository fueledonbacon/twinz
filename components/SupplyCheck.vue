<template>
  <div>
  <div v-if="$wallet.account">
    <div>
      <div class="py-4 mx-auto text-center text-white">({{ totalSupply }} / {{ collectionSize }} minted)</div>
      <slot/>
    </div>
      
    <div v-if="soldOut" class="py-4 mx-auto max-w-md text-center text-white">
      Sold out. Buy one on <a
        class="underline decoration-2"
        href="https://opensea.io/collection/the-phunky-fungi"
        >OpenSea.</a
      >
    </div>
  </div>
  <div class="py-4 text-white" v-else>Please connect your wallet and let's get started.</div>
  </div>
</template>

<script>
export default {
  async mounted() {
    try {
      const watcher = this.$watch('$wallet.contract', async function(){

        this.$store.commit('contract/setCollectionSize', +(await this.$wallet.contract.COLLECTION_SIZE()))
        this.$store.commit('contract/setTotalSupply', +(await this.$wallet.contract.totalSupply()))
        this.$store.commit('contract/setPresaleLimit', +(await this.$wallet.contract.PRESALE_LIMIT()))
        this.$store.commit('contract/setPublicLimit', +(await this.$wallet.contract.PUBLIC_LIMIT()))
        this.$store.commit('contract/setPresaleActive', await this.$wallet.contract.isPresaleActive())
        this.$store.commit('contract/setPublicSaleActive', await this.$wallet.contract.isPublicSaleActive())
        this.$store.commit('contract/setPresalePrice', +(await this.$wallet.contract.PRESALE_PRICE()) * Math.pow(10, -18))
        this.$store.commit('contract/setPublicPrice', +(await this.$wallet.contract.PUBLIC_PRICE()) * Math.pow(10, -18))
        this.initialized = true
        if(this.COLLECTION_SIZE > 0 && this.totalSupply < this.collectionSize){
          const supplyWatcher = setInterval(async () => {
            if(this.soldOut){
              clearInterval(supplyWatcher)
              watcher()
            }
            this.$store.commit('contract/setTotalSupply' +(await this.$wallet.contract.totalSupply()))
          }, 6000)
        }
      })
    } catch (error) {
      
    }

  },
  computed: {
    totalSupply(){
      return this.$store.state.contract.totalSupply ? this.$store.state.contract.totalSupply : 0 ;
    },
    collectionSize(){
      // return 5300;
      return this.$store.state.contract.collectionSize;
    },
    soldOut() {
      return this.initialized && this.totalSupply >= this.collectionSize
    },
  },
  data() {
    return {
      initialized: false,
    }
  },
}
</script>