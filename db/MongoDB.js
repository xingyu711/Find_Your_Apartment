const { MongoClient, ObjectId } = require("mongodb");

function MyDB() {
	const myDB = {};

	const url = process.env.MONGO_URL || "mongodb://localhost:27017";
	const DB_NAME = "DB";

	myDB.getPosts = async (query = {}) => {
		let client;
		try {
			client = new MongoClient(url, { useUnifiedTopology: true });
			await client.connect();
			const db = client.db(DB_NAME);
			const posts = db.collection("posts");
			const post = await posts.find(query).toArray();
			return post;
		} finally {
			console.log("Closing the connection");
			client.close();
		}
	};

	myDB.deletePost = async (postTodelete) => {
		let client;
		try {
			client = new MongoClient(url, { useUnifiedTopology: true });
			await client.connect();
			const db = client.db(DB_NAME);
			const posts = db.collection("posts");
			const post = await posts.deleteOne({ _id: ObjectId(postTodelete._id) });
			return post;
		} finally {
			console.log("Closing the connection");
			client.close();
		}
	};

	myDB.createPost = async (newPost) => {
		let client;
		try {
			client = new MongoClient(url, { useUnifiedTopology: true });
			await client.connect();
			const db = client.db(DB_NAME);
			const posts = db.collection("posts");
			const post = await posts.insertOne(newPost);
			return post;
		} finally {
			console.log("Closing the connection");
			client.close();
		}
	};

	return myDB;
}

module.exports = MyDB();
