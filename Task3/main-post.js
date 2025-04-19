const params = new URLSearchParams(window.location.search);
const postId = params.get('postId');

const postInfo = document.getElementById('post-info');
const commentsDiv = document.getElementById('comments');

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(res => res.json())
    .then(post => {
        renderObject(post, postInfo);
    });

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then(res => res.json())
    .then(comments => {
        for (let comment of comments) {
            let commentDiv = document.createElement('div');
            commentDiv.style.marginBottom = '10px';
            commentDiv.style.padding = '10px';
            commentDiv.style.border = '1px solid #ccc';
            commentDiv.innerHTML = `
            <strong>${comment.name}</strong> (${comment.email})<br/>
            ${comment.body}
          `;
            commentsDiv.appendChild(commentDiv);
        }
    });

function renderObject(obj, parent) {
    for (let key in obj) {
        let value = obj[key];
        let el = document.createElement('div');
        if (typeof value === 'object') {
            el.innerHTML = `<strong>${key}:</strong>`;
            renderObject(value, el);
        } else {
            el.innerHTML = `<strong>${key}:</strong> ${value}`;
        }
        parent.appendChild(el);
    }
}