async function loadPosts() {
    const postRequest = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await postRequest.json();
    const container = document.getElementById("container");
    data.forEach(post => {
        const postCard = document.createElement("div");
        postCard.className = "card";
        const postTitle = document.createElement("h2");
        postTitle.textContent = post.title;
        const postBody = document.createElement("p");
        postBody.textContent = post.body;
        postCard.appendChild(postTitle);
        postCard.appendChild(postBody);
        container.appendChild(postCard);        
    });
}
loadPosts()
