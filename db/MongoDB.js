const { MongoClient } = require("mongodb");

function MyDB() {
	const myDB = {};

	const uri =
		process.env.MONGO_URL || "mongodb://localhost:27017";


	myDB.initializeUsers = async () => {	
		const client = new MongoClient(uri, { useUnifiedTopology: true });
		await client.connect();

		const db = client.db("db");
		const users = db.collection("users");
		return users;
	};

	myDB.getUsers = async () => {
		const client = new MongoClient(uri, { useUnifiedTopology: true });
		await client.connect();
		//database
		const db = client.db("db");
		//collection
		const users = db.collection("users");

		const query = {};
		return users
			.find(query)
			.toArray()
			.finally(() => client.close());
	};


	myDB.signin = async (Users) => {
		console.log("users are here:  ", Users);
		const client = new MongoClient(uri, {useUnifiedTopology: true});
		await client.connect();
		//database
		const db = client.db("fristNode");
		let flag = false;
		const result = await db.collection("userInfo").find().toArray();
		console.log("result is here:   ", result);
		result.forEach(item => {
			if (item.name === Users.userName && item.password === Users.passWord || flag) {
				flag = true;
			} else {
				flag = false;
			}
		});
		console.log("db flag is :   ", flag);
		return flag;
	};

	myDB.signup = async (Users) =>{
		const client = new MongoClient(uri, {useUnifiedTopology: true});
		await client.connect();
		//database
		const db = client.db("fristNode");
		const result = await db.collection("userInfo");
		const users = await result.find().toArray();
		console.log("what is users I have now?   ", users);
		let flag = true;
		await users.every(item => {
			if (item.name === Users.userName) {
				//console.log("I'm HERERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
				flag =  false;
				return flag;
			}
		});
		if(flag){
			const myobj = {name: Users.userName,password: Users.passWord};
			await result.insertOne(myobj, function(err) {
				if (err) throw err;
				//console.log("WTFFFFFFF");
			});
		}
		return flag;
	};

	return myDB;
}

module.exports = MyDB();
