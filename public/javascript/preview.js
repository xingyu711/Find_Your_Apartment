const divPosts = document.querySelector("#viewposts");

async function reloadPosts() {
	const resRaw = await fetch("/getPosts");
	const res = await resRaw.json();

	divPosts.innerHTML = "";
	res.posts.forEach(renderPosts);
}

function renderPosts(post) {
	const divPost = document.createElement("div");
	divPost.className = "post card p-1 col-9";

	divPost.innerHTML = `
	<div class="title">${post.title}</div>
	<hr />
	<div class="content">${post.content}</div>
	<br />`;

	divPosts.appendChild(divPost);
}


reloadPosts();
