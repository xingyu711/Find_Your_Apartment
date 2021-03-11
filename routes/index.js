const express = require("express");
const router = express.Router();
const myDB = require("../db/MongoDB.js");
const secret = require("./crypt.js");

router.post("/test/signin", async function (req, res) {
	const pw = secret.encrypt(req.body.passWord);
	const body = {
		"userName": req.body.userName,
		"passWord": pw
	};
	const flag = await myDB.signin(body);
	console.log("flag is here: ", flag);
	if(flag) {
		console.log(req.body, "登录成功");
		// 进入到登录成功的页面
		res.redirect("/post.html");

	} else {
		console.log(req.body, "登录失败");
		// 进入到登录失败的页面
		res.redirect("/sign_in.html");
	}

});

router.post("/test/signup", async function (req, res) {
	console.log("what is the body here??   ", req.body);
	if(req.body.passWord != req.body.passWord2){
		console.log("different password" + "   " + req.body.passWord + "   " + req.body.passWord2);
		return;
	}
	const pw = secret.encrypt(req.body.passWord);
	const body = {
		"userName": req.body.userName,
		"passWord": pw
	};
	const flag = await myDB.signup(body);
	console.log("what is this flag here???", flag);
	if(flag){
		console.log(req.body, "注册成功");
		res.redirect("/sign_in.html");
	}else{
		console.log(req.body, "注册失败");
		res.redirect("/sign_up.html");
	}
});

module.exports = router;

