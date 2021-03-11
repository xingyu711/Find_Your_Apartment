const { MongoClient } = require("mongodb");

function MyDB() {
	const myDB = {};

	const uri =
		process.env.MONGO_URL || "mongodb://localhost:27017";


	myDB.signin = async (Users) => {
		console.log("users are here:  ", Users);
		const client = new MongoClient(uri, {useUnifiedTopology: true});
		await client.connect();
		//database
		const db = client.db("UserPw");
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
		const db = client.db("UserPw");
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
