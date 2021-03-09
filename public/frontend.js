/* eslint-disable no-mixed-spaces-and-tabs */
const divPosts = document.querySelector("#posts");

async function deletePost(post) {
	// Default options are marked with *
	const resRaw = await fetch("/deletePost", {
	  	method: "POST",
	  	headers: {
			"Content-Type": "application/json",
	  	},
	  	body: JSON.stringify(post), // body data type must match "Content-Type" header
	});
	const res = await resRaw.json(); // parses JSON response into native JavaScript objects
  
	console.log("delete", res);
  
	reloadPosts();
}
  
function renderPosts(post) {
	const divPost = document.createElement("div");
  
	divPost.className = "post card p-2 col-6";
	divPost.innerHTML = `<div>${post.title}</div>
	<br />
	<div>${post.content}</div>`;
  
	const divName = document.createElement("div");
	divName.textContent = post.name;
	divPost.appendChild(divName);
  
	const btnDelete = document.createElement("button");
	btnDelete.textContent = "x";
	btnDelete.className = "btn btn-danger";
	btnDelete.addEventListener("click", () => deletePost(post));
	divPost.appendChild(btnDelete);
  
	divPosts.appendChild(divPost);
}

async function reloadPosts() {
	const resRaw = await fetch("/getPosts");
	const res = await resRaw.json();
  
	console.log("Got data", res);
  
	res.posts.forEach(renderPosts);
}

reloadPosts();
