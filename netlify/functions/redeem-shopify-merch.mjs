import { Shopify, DataType } from '@shopify/shopify-api'
import { verifySignature } from '../../common/verify-signer.mjs'
import { userHasRedeemed, redeem, getUser, createNewUser} from '../../common/customer-handlers.mjs'

const adminToken = process.env.SHOPIFY_ADMIN_TOKEN
const SHOPIFY_HOST = process.env.SHOPIFY_HOST

const shopifyRestClient = new Shopify.Clients.Rest(SHOPIFY_HOST, adminToken)

const handler = async event => {
  try {
    const body = JSON.parse(event.body)

    const { ethAddress, message, email, signature, redeemObject} = body
    
    try {
      let verified = await verifySignature(ethAddress, message, signature)
      if(!verified){
        return { statusCode: 401, body: 'Signature is invalid.' };
      }
     
    } catch (error) {
      return { statusCode: 500, body: 'Signature is invalid.' };
    }

    let user = await getUser(ethAddress)
    if(!user){
      user = await createNewUser(ethAddress)
    }
    const hasRedeemed = await userHasRedeemed(ethAddress)

    if(hasRedeemed){
       return { statusCode: 400, body: 'User has already redeemed.' }
    }
    // TAKE SOME ACT
    // const data = await shopifyRestClient.post({
    //   path: 'orders',
    //   data: {
    //     order: {
    //       customer: {
    //         first_name: name + ' ' + ethAddress,
    //         email
    //       },
    //       email,
    //       line_items: [
    //         {
    //           price: 0,
    //           title: `777 Hoodie, ${shirtColor}, ${shirtSize}`,
    //           // variant_id: exactProduct.id,
    //           // variant_title: shirtColor
    //         }
    //       ],
    //       shipping_address: {
    //         name,
    //         address1: address.address1,
    //         address2: address.address2,
    //         province: address.province,
    //         zip: address.zip,
    //         city: address.city,
    //         country: "US"
    //       }
    //     }
    //   },
    //   type: DataType.JSON
    // })
    await redeem(ethAddress);
    return { statusCode: 200, body: JSON.stringify(data.body.order) }
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify(error) }
  }
}

module.exports = { handler }
