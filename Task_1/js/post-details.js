/* ------------------------------------------------------------------ */
/* 1. Читаємо postId з адреси                                         */
const postId = new URL(window.location).searchParams.get('postId');
if (!postId) {
    document.getElementById('postBox').textContent = 'postId не передано.';
    document.getElementById('commentsBox').remove();
    throw new Error('No postId');
}

/* ------------------------------------------------------------------ */
/* 2. Завантажуємо об’єкт поста та показуємо всі його поля             */
fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(r => r.json())
    .then(post => {
        const box = document.getElementById('postBox');
        box.replaceChildren(renderObject(post));   // рекурсивний список усіх полів
    })
    .catch(() => document.getElementById('postBox').textContent =
        'Не вдалося завантажити пост.');

/* ------------------------------------------------------------------ */
/* 3. Завантажуємо всі коментарі цього поста                           */
fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then(r => r.json())
    .then(comments => {
        const wrap = document.getElementById('commentsBox');
        wrap.textContent = '';                     // прибираємо «завантаження…»

        comments.forEach(c => {
            const art   = document.createElement('article');

            const h3    = document.createElement('h3');
            h3.textContent = c.name;
            art.appendChild(h3);

            const email = document.createElement('p');
            email.textContent = `${c.email}`;
            art.appendChild(email);

            const p     = document.createElement('p');
            p.textContent = c.body;
            art.appendChild(p);

            wrap.appendChild(art);
        });
    })
    .catch(() => document.getElementById('commentsBox').textContent =
        'Не вдалося завантажити коментарі.');

/* ------------------------------------------------------------------ */
/* 4. Рекурсивно будує <ul><li> зі всіх вкладених полів об’єкта        */
function renderObject(obj){
    const ul = document.createElement('ul');

    for (const [key, val] of Object.entries(obj)){
        const li = document.createElement('li');

        if (typeof val === 'object' && val !== null){
            const strong = document.createElement('strong');
            strong.textContent = key + ': ';
            li.appendChild(strong);
            li.appendChild(renderObject(val));       // рекурсія
        } else {
            li.textContent = `${key}: ${val}`;
        }
        ul.appendChild(li);
    }
    return ul;
}