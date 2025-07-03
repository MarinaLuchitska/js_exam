
const userId = new URL(window.location).searchParams.get('id');
//Вивід всіх полів користувача
fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(r => r.json())
    .then(user => {
        const box = document.getElementById('userContainer');
        box.textContent = '';
        box.appendChild(renderObject(user));
        document.getElementById('postsBtn').disabled = false; // активуємо кнопку
    })
function renderObject(obj) {
    const ul = document.createElement('ul');
    for (const [key, val] of Object.entries(obj)) {
        const li = document.createElement('li');
        if (typeof val === 'object' && val !== null) {
            const strong = document.createElement('strong');
            strong.textContent = key + ': ';
            li.appendChild(strong);
            li.appendChild(renderObject(val));
        } else {
            li.textContent = `${key}: ${val}`;
        }
        ul.appendChild(li);
    }
    return ul;
}


//Кнопка: "post of current user"
const btn       = document.getElementById('postsBtn');
const postList  = document.getElementById('postList');
let postsLoaded = false;

btn.addEventListener('click', () => {
    if (postsLoaded) {
        postList.hidden = !postList.hidden;
        return;
    }

    btn.disabled = true;
    btn.textContent = 'Завантаження…';

    const postsUrl = new URL('https://jsonplaceholder.typicode.com/posts');
    postsUrl.searchParams.set('userId', userId);

    fetch(postsUrl)
        .then(r => r.json())
        .then(posts => {
            postList.textContent = '';
            posts.forEach(post => {
                const li = document.createElement('li');
                const a  = document.createElement('a');
                a.href = `post-details.html?postId=${post.id}`;
                a.textContent = post.title;
                a.className = 'postLink';
                a.target = '_blank';
                li.appendChild(a);
                postList.appendChild(li);
            });
            postList.hidden = false;
            postsLoaded = true;
            btn.textContent = 'Hide posts';
        })

});
