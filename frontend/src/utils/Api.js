 class Api {
    constructor({url, headers}) {
    this.url = url;
    this.headers = headers;
    }

    // Получаем массив карточек
    getAllCards() {
        return fetch(`${this.url}/cards`, {
            method: 'GET',
            headers: this.headers
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    //Загружаем информацию о пользователе с сервера
    getUserMe() {
        return fetch(`${this.url}/users/me`, {
            method: 'GET',
            headers: this.headers
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    //Сохраняем отредактированные данные профиля
    patchUsersMe(value) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: value.name,
                about: value.about
            })
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    //добавляем новую карточку
    postAddCard(value) {
        return fetch(`${this.url}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: value.name,
                link: value.link
            })
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    //Обновление аватара пользователя
    patchUsersAvatar(value) {
        return fetch(`${this.url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: value.avatar
            })
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    //Запрос на лайк карточки
    putLikeCards(id) {
        return fetch(`${this.url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this.headers,
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    //Запрос на снятие лайка
    deleteLikeCards(id) {
        return fetch(`${this.url}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this.headers,
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    //Запрос на удаление карточки
    deleteCards(id) {
        return fetch(`${this.url}/cards/${id}`, {
            method: 'DELETE',
            headers: this.headers,
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

     changeLikeCardStatus(id, isLiked) {
         return isLiked
             ? this.putLikeCards(id)
             : this.deleteLikeCards(id)
     }

}


const api = new Api({
    url: 'https://api.mesto.sektor.students.nomoredomains.icu',
    headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}` ,
        'Content-type': 'application/json'
    }
});

export default api;