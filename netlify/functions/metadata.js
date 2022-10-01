export const handler = async event => {
  try {
    return { statusCode: 200, body: JSON.stringify({ event }) }

  } catch (error) {
    return { statusCode: 500, body: JSON.stringify(error) }
  }
}
