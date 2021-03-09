var express = require('express');
var router = express.Router();

/* GET home page. */
<<<<<<< HEAD
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
=======
router.get("/", function(req, res, next) {
	res.render("index", { title: "Express" });
});


router.get("/getPosts", async (req, res) => {
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
>>>>>>> cf42a68e36eb5f7c1b62712a8cfe6e366e56e737
});

module.exports = router;
