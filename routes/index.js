var express = require("express");
var router = express.Router();
const myDB = require("../db/MongoDB.js");

/* GET home page. */
router.get("/", function(req, res, next) {
	res.render("index", { title: "Express" });
});


router.get("/posts", async (req, res) => {
	try {
		console.log("myDB", myDB);
		const posts = await myDB.getPosts();
		res.send(JSON.stringify(posts));
	} catch (e) {
		console.log("Error", e);
		res.status(400).send({ err: e });
	}
});

router.post("/deletePost", async (req, res) => {
	console.log("Delete Post", req.body);
	try {
		const posts = req.body;
		const dbRes = await myDB.deletePost(posts);
		res.send({ done: dbRes });
	} catch (e) {
		console.log("Error", e);
		res.status(400).send({ err: e });
	}
});

router.post("/createPost", async (req, res) => {
	console.log("Create Post", req.body);

	try {
		const posts = req.body;
		const dbRes = await myDB.createPost(posts);
		res.send({ done: dbRes });
	} catch (e) {
		console.log("Error", e);
		res.status(400).send({ err: e });
	}
});

module.exports = router;
