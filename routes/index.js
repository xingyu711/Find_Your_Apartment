const express = require("express");
const router = express.Router();
const myDB = require("../db/MongoDB.js");
const secret = require("./crypt.js");

let signinflag = false;
let signupflag = false;
let pwflag = false;
let signinNM = false;
let signupNM = false;

router.post("/test/signin", async function (req, res) {
	const pw = secret.encrypt(req.body.passWord);
	const body = {
		"userName": req.body.userName,
		"passWord": pw
	};
	if(req.body.userName === ""){
		signinNM = true;
	}else{
		signinNM = false;
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
	}

});

router.post("/test/signup", async function (req, res) {
	if(req.body.userName === ""){
		signupNM = true;
	}else{
		signupNM = false;
		const pw = secret.encrypt(req.body.passWord);
		const body = {
			"userName": req.body.userName,
			"passWord": pw
		};

		signupflag = await myDB.signup(body);
		console.log("what is this flag here???", signupflag);
		if(req.body.passWord != req.body.passWord2){
			pwflag = true;
			signupflag = false;
			console.log("different password" + "   " + req.body.passWord + "   " + req.body.passWord2);
			res.redirect("/sign_up.html");
		} else if(signupflag){
			console.log(req.body, "注册成功");
			res.redirect("/sign_in.html");
		} else{
			pwflag = false;
			console.log(req.body, "注册失败");
			//res.redirect("/sign_up.html");
		}
	}
});

router.post("/getSigninFlag", (req, res) =>{

	if(signinNM){
		console.log("what is this???   signinNM   ", signinNM);
		res.send({flag: false, text: "Username is Empty"});
		signinNM = false;
		return;
	}
	if(!signinNM){
		let textCont = "";
		console.log("what is this???   signinflag   ", signinflag);
		if(signinflag) textCont = "Sign in Successful";
		else textCont = "Wrong User name or Password";
		res.send({flag: signinflag, text: textCont});
	}
});

router.post("/getSignupFlag", (req, res) =>{

	if(signupNM){
		res.send({flag: false, text: "Username is Empty"});
		signupNM = false;
		return;
	}else{
		let textCont = "";
		if(pwflag) textCont = "Passwords are not same";
		else if(signupflag) textCont = "Sign up Successful";
		else textCont = "User name is already taken";
		res.send({flag: signupflag, text: textCont});
	}
});



module.exports = router;