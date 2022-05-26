import {allUsers, updateUserScore} from '../../common/users.mjs'
import {getUserTweets,  } from '../../common/twitterHelper.mjs'
import {validateChallenge } from '../../common/challengeHelper.mjs'

exports.handler = async function (event, context) {
  try {
    // To-DO use mongo db to get date and hashtags
    const users = await allUsers()
    users.forEach(async user => {
      const challenge = {
        id: 1,
        raw: {
          //We can use AND OR OPERATORS AS LITERAL TO CONTACT CONDITIONS IN QUERY
          query:`from:${user.twitter_id} #web3`,
          //https://time.lol/#tomorrow YYYY-MM-DDTHH:mm:ssZ
          // End time must be a minimum of 10 seconds prior to the request time."
          start_time:'2022-04-25T00:00:00-05:00',
          end_time: date = new Date().toISOString()
        }
      }

      if(user.last_challenge==challenge.id) return
      if(await !getUserTweets(challenge.raw)) return 
      
      await updateUserScore(user.adress,user.score+1, challenge.id)

    });





    return { statusCode: 200, body: 'ok'}
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}


