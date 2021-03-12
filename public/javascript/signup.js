const divflag = document.querySelector(".containAlert");

async function sendflag(){
	const flag = await fetch("/getSignupFlag", {
		method: "POST"
	});
	console.log("Have I been here????");
	console.log("What is the flag HERE??  ", flag);
	const res = await flag.json();
	if(res.flag){
		//divName.className = "alert alert-success alert-dismissible fade show";
	}else{
		console.log("FLAG IS HERE  ", res);
		const divName = document.createElement("div");
		/*
        try to add some html directly:
        const temp = document.createElement("div");
        const trytext = "<div class=\"alert alert-success alert-dismissable\" role=\"alert\" id=\"windows\">\n" +
            "    <button class=\"close\" type=\"button\" data-dismiss=\"alert\">×</button>\n" +
            "    \n" +
            "</div>";
        temp.innerHTML = trytext;
         */

		divName.textContent = res.text;
		divName.className = "alert alert-danger alert-dismissible fade show";
		divName.role = "alert";
		divflag.appendChild(divName);
		window.setTimeout(function(){
			divflag.removeChild(divName);
		}, 2000);
	}
}

sendflag();