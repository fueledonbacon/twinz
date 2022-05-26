export const state = () => ({
  collectionSize: 0,
  totalSupply: 0,
  soldOut: false,
  collabListVerified: false,
  presaleListVerified: false,
  publicSaleActive: false,
  presaleActive: false,
  collabSaleActive: false,
  PRESALE_PRICE: 0,
  PUBLIC_PRICE: 0,
  PRESALE_LIMIT: 0,
  PUBLIC_LIMIT: 0,
})

export const mutations = {
  setCollectionSize(state, collectionSize){
    state.collectionSize = collectionSize
  },
  setTotalSupply(state, totalSupply){
    state.totalSupply = totalSupply;
  },
  setCollabListVerified(state, flag){
    state.collabListVerified = flag
  },
  setPresaleListVerified(state, flag){
    state.presaleListVerified = flag
  },
  setPublicSaleActive(state, flag){
    state.publicSaleActive = flag
  },
  setPresaleActive(state, flag){
    state.presaleActive = flag
  },
  setCollabSaleActive(state, flag){
    state.collabSaleActive = flag
  },
  setPresalePrice(state, price){
    state.PRESALE_PRICE = price
  },
  setPublicPrice(state, price){
    state.PUBLIC_PRICE = price
  },
  setPresaleLimit(state, limit){
    state.PRESALE_LIMIT = limit
  },
  setPublicLimit(state, limit){
    state.PUBLIC_LIMIT = limit
  }
}
