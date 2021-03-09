var express = require("express");
var router = express.Router();
var fs = require("fs");
//连接数据库操作
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

//进去登录页面
router.post("/login", function (req, res) {
	//读取html文件
	fs.readFile("./public/sign_in.html", function(err,data) {
		if (err) return console.log(err);
		res.setHeader("Content-Type", "text/html");
		res.send(data);
		console.log("async: " + data.toString());
	});
});

//进去注册页面
router.post("/regin", function (req, res) {
	fs.readFile("./public/sign_up.html", function(err,data) {
		if (err) return console.log(err);
		res.setHeader("Content-Type", "text/html");
		res.send(data);
	});
});

//点击登录触发事件
router.post("/process_get", function (req, res) {
	console.log("what do I got??   %j", req.body);
	var response = {
		"userName":req.body.userName,
		"passWord":req.body.passWord
	};
	// 放入cookie中
	res.cookie("userInfo",response);
	// res.end(JSON.stringify(response));
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		//数据库中的db是 fristNode 表格是userInfo，将登录信息放在这里
		var dbo = db.db("fristNode");
		dbo.collection("userInfo").find().toArray((err, result)=> { // 返回集合中所有数据
			if (err) throw err;
			console.log(result);
			let flag = false;
			result.forEach( item => {
				console.log("username::::    " + req.body.userName + item.name );
				console.log("userpassword::::    " + req.body.passWord + item.password);
				if (item.name === req.body.userName && item.password === req.body.passWord || flag) {
					flag = true;
				}
				else {
					flag = false;
				}
			});
			if(flag) {
				console.log(result, "登录成功");
				// 进入到登录成功的页面
				res.redirect(301, "/index.html");

			} else {
				console.log("login errrrrr");
				req.flash("errorMessage", "Wrong user name or password");
				fs.readFile("./public/sign_up.html", function(err,data) {
					if (err) return console.log(err);
					// res.setHeader('Content-Type', 'text/html');
					res.end(data,JSON.stringify(response));
				});
				console.log("login errrrrr here??");
			}
			db.close();
		});
	});
});

//点击注册触发事件
router.post("/Regin_get", function (req, res) {
	var response = {
		"userName":req.body.userName,
		"passWord":req.body.passWord
	};
	console.log("regin name:  " + req.body.userName);
	console.log("regin PW:  " + req.body.passWord);
	// 放入cookie中
	res.cookie("userInfo",response);
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("fristNode");
		var myobj = {name: req.body.userName,password: req.body.passWord};
		dbo.collection("userInfo").insertOne(myobj, function(err) {
			if (err) throw err;
			console.log("注册成功");
			db.close();
		});
	});
	res.redirect(301, "/sign_in.html");
// 输出 JSON 格式
});

module.exports = router;
