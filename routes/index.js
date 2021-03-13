const express = require("express");
const router = express.Router();
const myDB = require("../db/MongoDB.js");
const secret = require("./crypt.js");

let signinflag = false;
let signupflag = false;
router.post("/test/signin", async function (req, res) {
	if(req.body.userName === "") return;
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
		//res.redirect("/sign_in.html");
	}

});

router.post("/test/signup", async function (req, res) {
	if(req.body.userName === "") return;
	console.log("what is the body here??   ", req.body);
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
		//res.redirect("/sign_up.html");
	}
});

router.post("/getSigninFlag", async (req, res) =>{
	let textCont = "";
	if(signinflag) textCont = "Sign in Successful";
	else textCont = "Wrong User name or Password";
	res.send({flag: signinflag, text: textCont});
});

router.post("/getSignupFlag", async (req, res) =>{
	let textCont = "";
	if(signupflag) textCont = "Sign up Successful";
	else textCont = "User name is already taken";
	res.send({flag: signupflag, text: textCont});
});



module.exports = router;