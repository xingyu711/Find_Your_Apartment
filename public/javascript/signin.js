const divflag = document.querySelector(".container");

async function sendflag(){
	const flag = await fetch("/getflag", {
		method: "POST"
	});
	console.log("Have I been to here????");
	console.log("What is the flag HERE??  ", flag);
	const res = await flag.json();
	console.log("FLAG IS HERE  ", res);
	const divName = document.createElement("div");
	divName.textContent = res.text;
	if(res.flag){
		divName.className = "alert alert-success";
	} else{
		divName.className = "alert alert-danger";
	}

	divName.role = "alert";

	/*
	<div class="alert alert-primary" role="alert">
    A simple primary alert—check it out!
    </div>
    */

	divflag.appendChild(divName);
}

sendflag()