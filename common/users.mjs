import { MongoClient } from "mongodb";

const dbName = process.env.MONGODB_NAME;
const URI = process.env.MONGODB_URL;

export const createUser = async (address) => {
	const client = await MongoClient.connect(URI, { useUnifiedTopology: true });
	const db = client.db(dbName);

	const collection = db.collection("users");
	collection.createIndex({ "address": 1 }, { unique: true })

	await collection.insertOne({
		address,
		twitter_id: null,
		twitter_verified: false,
		engagement_tweet_ids: [],
		score: 0,
		last_challenge: null
	});

	await client.close();
	return true;
};

export const verifyTwitter = async (address, twitter_id) => {
	const client = await MongoClient.connect(URI, { useUnifiedTopology: true });
	const db = client.db(dbName);
	const collection = db.collection("users");
	await collection.updateOne(
		{ address },
		{ $set: { twitter_verified: true, twitter_id } }
	);
	await client.close();
	return true;
};

export const updateUserScore = async (address, score, challenge_id) => {
	const client = await MongoClient.connect(URI, { useUnifiedTopology: true });
	const db = client.db(dbName);
	const collection = db.collection("users");
	await collection.updateOne(
		{ address },
		{ $set: { score: score, last_challenge: challenge_id } }
	);
	await client.close();
	return true;
};

export const whiteListUser = async address => {
	const db = client.db(dbName);
	const collection = db.collection("users");
	const response = await collection.updateOne(
		{ address },
		{ $set: { whitelisted: true } }
	);
	await client.close();
	return true;
};

export const getUser = async address => {
	const client = await MongoClient.connect(URI, { useUnifiedTopology: true });
	const db = client.db(dbName);
	const collection = db.collection("users");
	const document = await collection.findOne({ address });
	await client.close();
	return document;
};



export const allUsers = async (query) => {
	const client = await MongoClient.connect(URI, { useUnifiedTopology: true });
	const db = client.db(dbName);
	const users = db.collection("users");
	const arr = await users.find({}).toArray()
	await client.close();
	return arr;
}

export const listWallets = async () => {
	const client = await MongoClient.connect(URI, { useUnifiedTopology: true });
	const db = client.db(dbName);
	const users = db.collection("users");
	const arr = await users.find({}).toArray()
	// TODO: add conditions to judge whether or not the user is on the whitelist based on our opinionated conditions
	const wallets = arr.map(row => row.address)
	await client.close();
	return wallets;
}
