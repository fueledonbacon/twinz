export const handler = async event => {
  try {
    const { path } = event
    const id = path.split('/')[4]
    if(id === undefined) throw new Error("ID is undefined")
    let metadata = {
        name: `Twinz NFT Founder's Pass #${id}`,
        description: "TwinZ is a collection of 10,000 digital individuals living as NFTs 5 different societies with completely different visual atmospheres",
        image: "https://twinznftfp.s3.amazonaws.com/TwinZNFTFoundersPass.gif"
    }
    return { statusCode: 200, body: JSON.stringify(metadata) }

  } catch (error) {
    return { statusCode: 500, body: JSON.stringify(error) }
  }
}
