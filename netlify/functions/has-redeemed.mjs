import { userHasRedeemed } from '../../common/customer-handlers.mjs'

const handler = async event => {
  try {
    const body = JSON.parse(event.body)

    const { ethAddress } = body
    
    const hasRedeemed = await userHasRedeemed(ethAddress)

    return { statusCode: 200, body: JSON.stringify({ redeemed: hasRedeemed }) }

  } catch (error) {
    return { statusCode: 500, body: JSON.stringify(error) }
  }
}

module.exports = { handler }
