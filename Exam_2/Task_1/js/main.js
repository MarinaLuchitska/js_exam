//В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід
// на сторінку user-details.html, котра має детальну інфорацію про об'єкт на який клікнули


fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(users => {
        let blockContainer = document.getElementById('blockContainer')
        for (let user of users){
            let userDiv = document.createElement('div')
            userDiv.classList.add('userDiv')
            let userInfo = document.createElement('p')
            userInfo.classList.add('userInfo')
            userInfo.textContent =`ID:${user.id}, Name:${user.name}`

            const btn = document.createElement('a');
            btn.textContent = 'Details';
            btn.href = `user-details.html?id=${user.id}`;
            btn.classList.add('detailsBtn');

            userDiv.append(userInfo, btn);
            blockContainer.appendChild(userDiv);
        }
    });
