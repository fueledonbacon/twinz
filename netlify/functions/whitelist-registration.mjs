import { createUser, verifyTwitter, getUser } from '../../common/users.mjs'
import { getTweet } from '../../common/twitterHelper.mjs'

exports.handler = async function (event, context) {
  try {
    const { ethAddress, tweetId } = JSON.parse(event.body)
    const { entities, text, id, author_id} =  await getTweet(tweetId)
    const address = text.match(/0x[a-fA-F0-9]{40}/)
    if(!address) throw new Error('No address in tweet')
    if(!address.includes(ethAddress)) throw new Error('Addresses don\'t match');
    //TODO: make sure the user doesn't already exist
    let user = await getUser(ethAddress)
    if(!user){
      await createUser(ethAddress)
    }
    await verifyTwitter(ethAddress, author_id)
    return { statusCode: 200, body: 'ok', }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}


