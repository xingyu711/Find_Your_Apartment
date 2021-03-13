const divPosts = document.querySelector("#posts");

async function showPosts() {
	const btn = document.getElementById("button");
	btn.addEventListener("click", function(){
		document.location.href="post.html";
	});
	const resRaw = await fetch("/getPosts");
	const res = await resRaw.json();

	console.log("Title: ", res.title);
	console.log("Content: ", res.content);
	divPosts.innerHTML = "";
	res.posts.forEach(renderPosts);
}

function renderPosts(post) {
	const divPost = document.createElement("div");
	divPost.className = "post card p-1 col-6";

	divPost.innerHTML = `
	<div>${post.title}</div>
	<br />
	<div>${post.content}</div>`;
	//<div><button class=btn btn-danger">Delete</button></div>;

	const btnDelete = document.createElement("button");
	btnDelete.textContent = "Delete";
	btnDelete.className = "btn btn-danger";
	btnDelete.addEventListener("click", () => deletePost(post));

	// const btnComment = document.createElement("button");
	// btnDelete.textContent = "Comment";
	// btnDelete.className = "btn";
	// btnDelete.addEventListener("click", () => addComment(comment));

	divPost.appendChild(btnDelete);
	//divPost.appendChild(btnComment);
	divPosts.appendChild(divPost);
}

async function deletePost(post) {
	const resRaw = await fetch("/deletePost", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(post), // body data type must match "Content-Type" header
	});
	const res = await resRaw.json(); // parses JSON response into native JavaScript objects

	console.log("delete", res);

	showPosts();
}

// async function addComment(comment) {
// 	// Default options are marked with *
// 	const resRaw = await fetch("/createComment", {
// 	  	method: "POST",
// 	  	headers: {
// 			"Content-Type": "application/json",
// 	  	},
// 	  	body: JSON.stringify(comment), // body data type must match "Content-Type" header
// 	});
// 	const res = await resRaw.json(); // parses JSON response into native JavaScript objects

// 	console.log("Create", res);

// 	showPosts();
// }

showPosts();
