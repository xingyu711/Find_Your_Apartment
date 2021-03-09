var express = require("express");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const path = require("path");
var testRouter = require("./routes/test");
var flash        = require("req-flash");
var app = express();
var session = require("express-session");const bodyParser = require("body-parser");
//配置body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post("/addPage", function (req) {
	//req.query只能拿到get参数
	//post请求使用 body-parser拿到
	console.log(req.body);
});



app.use(session({ cookie: { maxAge: 60000 },
	secret: "woot",
	resave: false,
	saveUninitialized: false}));

app.use(flash());
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/test", testRouter);


console.log("                              " + path.join(__dirname, "public"))
app.use(express.static(path.join(__dirname, "public")));
// error handler
app.use(function(err, req, res) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	// set specical env
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X_BPI_CONTEXT");
	res.header("Content-Type", "application/json");
	next();
});

module.exports = app;