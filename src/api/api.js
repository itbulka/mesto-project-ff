const config = {
    url: "https://mesto.nomoreparties.co/v1/",
    token: "6223133f-511d-41ca-ae06-fcd11b2453ad",
    identifierGroup: "cohort-magistr-2",
}

const handleResponse = res => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Status ${res.status}`);
    }
}

// Метод для получения данных пользвоателя
export const getUser = () => {
    return fetch(`${config.url}${config.identifierGroup}/users/me`, {
        headers: {
            authorization: config.token
        }
    }).then(handleResponse);
}

export const editUser = (name, about) => {
    return fetch(`${config.url}${config.identifierGroup}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: config.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: about
        })
    }).then(handleResponse);
}

export const getCards = () => {
    return fetch(`${config.url}${config.identifierGroup}/cards`, {
        headers: {
            authorization: config.token
        }
    }).then(handleResponse);
}

export const addCard = (name, link) => {
    return fetch(`${config.url}${config.identifierGroup}/cards`, {
        method: 'POST',
        headers: {
            authorization: config.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            link: link
        })
    }).then(handleResponse);
}

export const deleteCard = (cardId) => {
    return fetch(`${config.url}${config.identifierGroup}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: config.token
        }
    }).then(handleResponse);
}

export const addLikeCard = (cardId) => {
    return fetch(`${config.url}${config.identifierGroup}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: config.token
        }
    }).then(handleResponse);
}

export const removeLikeCard = (cardId) => {
    return fetch(`${config.url}${config.identifierGroup}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: config.token
        }
    }).then(handleResponse);
}

export const editAvatarProfile = (urlAvatar) => {
    return fetch(`${config.url}${config.identifierGroup}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: config.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: urlAvatar
        })
    }).then(handleResponse);
}