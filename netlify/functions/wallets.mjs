import { listWallets } from '../../common/users.mjs'

exports.handler = async function (event, context) {
  try {
    const wallets = await listWallets()
    return { statusCode: 200, body: JSON.stringify(wallets)}
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}


