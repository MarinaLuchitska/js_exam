const params = new URLSearchParams(window.location.search);
const userId = params.get('id');

const userInfoDiv = document.getElementById('user-info');
const postsContainer = document.getElementById('user-posts');

fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(res => res.json())
    .then(user => {
        renderObject(user, userInfoDiv);
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

document.getElementById('show-posts').addEventListener('click', () => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        .then(res => res.json())
        .then(posts => {
            postsContainer.innerHTML = '';
            for (let post of posts) {
                let postDiv = document.createElement('div');
                postDiv.classList.add('post');

                let title = document.createElement('p');
                title.textContent = post.title;

                let detailsBtn = document.createElement('a');
                detailsBtn.textContent = 'Переглянути пост';
                detailsBtn.href = `post.html?postId=${post.id}`;
                postDiv.appendChild(title);
                postDiv.appendChild(detailsBtn);
                postsContainer.appendChild(postDiv);
            }
        });
});