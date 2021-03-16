const divflag = document.querySelector(".containAlert");

async function sendflag(){
	const nm = document.getElementsByName("userName")[0].value;
	const pw = document.getElementsByName("passWord")[0].value;
	const userinfo = {
		userName: nm,
		passWord: pw
	};
	if(nm === ""){
		const divName = document.createElement("div");
		divName.className = "alert alert-danger alert-dismissible fade show";
		divName.textContent = "Username is Empty";
		divName.role = "alert";
		divflag.appendChild(divName);
		window.setTimeout(function(){
			divflag.removeChild(divName);
		}, 2000);

	}else if(pw === ""){
		const divName = document.createElement("div");
		divName.className = "alert alert-danger alert-dismissible fade show";
		divName.textContent = "Password is Empty";
		divName.role = "alert";
		divflag.appendChild(divName);
		window.setTimeout(function(){
			divflag.removeChild(divName);
		}, 2000);
	} else{
		const flag = await fetch("/test/signin", {
			method: "POST",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userinfo)
		});


		const res = await flag.json();
		console.log("Have I been here????    ", res);
		console.log("What is the flag HERE??  ", res.flag);
		const divName = document.createElement("div");

		if(res.flag){
			divName.className = "alert alert-success alert-dismissible fade show";
			//divName.textContent = "Sign in successful";
		}else{
			console.log("FLAG IS HERE  ", res);
			divName.className = "alert alert-danger alert-dismissible fade show";
			//divName.textContent = "Wrong user name or password";
			/*
			try to add some html directly:
			const temp = document.createElement("div");
			const trytext = "<div class=\"alert alert-primary\" role=\"alert\">\n" +
				"  A simple primary alert—check it out!\n" +
				"</div>";
			temp.innerHTML = trytext;
			*/
		}

		divName.role = "alert";
		divName.textContent = res.text;
		divflag.appendChild(divName);
		window.setTimeout(function(){
			divflag.removeChild(divName);
		}, 2000);
		if(res.flag) window.location.href = "/post.html";
	}
}

function test(){
	const btn = document.getElementById("button");
	if(btn == null){
		console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwhyyyyyyyyyyyyyyyyyyyyyyyyy");
	}
	btn.addEventListener("click", sendflag);
}
test();