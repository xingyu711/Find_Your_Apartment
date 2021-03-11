const express = require("express");
const router = express.Router();
const myDB = require("../db/MongoDB.js");
const secret = require("./crypt.js");

let signinflag = false;
let signupflag = false;
router.post("/test/signin", async function (req, res) {
	const pw = secret.encrypt(req.body.passWord);
	const body = {
		"userName": req.body.userName,
		"passWord": pw
	};
	signinflag = await myDB.signin(body);
	console.log("flag is here: ", signinflag);
	if(signinflag) {
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
	signupflag = await myDB.signup(body);
	console.log("what is this flag here???", signupflag);
	if(signupflag){
		console.log(req.body, "注册成功");
		res.redirect("/sign_in.html");
	}else{
		console.log(req.body, "注册失败");
		res.redirect("/sign_up.html");
	}
});

router.get("/getflag", async (req, res) =>{
	console.log("what is the request here?  ", req.body);
	res.send({flag: signinflag});
});



module.exports = router;

