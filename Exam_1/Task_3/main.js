//В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід
// на сторінку user-details.html, котра має детальну інфорацію про об'єкт на який клікнули

fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(cards => {
        const container = document.getElementById('users-container');

        for (let card of cards) {
            let userDiv = document.createElement('div');
            userDiv.classList.add('card');

            let userInfo = document.createElement('p');
            userInfo.textContent = `ID: ${card.id}, Name: ${card.name}`;

            let link = document.createElement('a');
            link.href = `user-details.html?id=${card.id}`;
            link.textContent = 'Детальніше';
            link.classList.add('details-link');

            userDiv.appendChild(userInfo);
            userDiv.appendChild(link);
            container.appendChild(userDiv);
        }
    });

//--------------------------------------