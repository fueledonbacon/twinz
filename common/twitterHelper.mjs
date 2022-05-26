import { Client } from "twitter-api-sdk";
const client = new Client(process.env.TW_BEARER_TOKEN);

const params = {
  "expansions":['author_id'],
  "tweet.fields":['entities']
}


export const getTweet = async (tweetId) => {
    try {
      const tweet_obj = await client.tweets.findTweetById(tweetId, params).then(
        (data) => {
          return Object.keys(data).map(k => data[k])
        }
      )
      return tweet_obj[0]
    } catch (error) {
        throw new Error('Unsuccessful');
    }

}

export  const getUserTweets = async (query) => {
  try {
    const user_stream = await client.tweets.tweetsRecentSearch({...query, ...params}).then(
      (data) => {
        return Object.keys(data).map(k => data[k])
      }
    )
    return user_stream[0]
  } catch (error) {
    throw new Error(error);
  }

}
