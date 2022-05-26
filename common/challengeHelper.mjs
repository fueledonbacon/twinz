
export const validateChallenge = async (tweet,challenge_obj) => {
  console.log(challenge_obj.hashtags);
  tweet.forEach(element => {
    const { entities, text, id, author_id} =  element
    // const hashtags = [...new Set(entities.hashtags.map(hashtag => hashtag.tag ))]
    console.log(entities.hashtags);
  });


	return true;
};



