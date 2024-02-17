const cardTemplate = document.querySelector('#card-template').content;

const createCard = ({name, link, likes, owner, _id}, user, handleDeleteCard, handleLikeCard, handleOpenCard) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = `На фотке ${name}`
    cardElement.querySelector('.card__title').textContent = name;
    if (user['_id'] === owner['_id']) {
        cardElement.querySelector('.card__delete-button').addEventListener('click', () => handleDeleteCard(cardElement, _id));
    } else {
        cardElement.querySelector('.card__delete-button').hidden = true;
    }

    if (likes.some((owner => owner['_id'] === user['_id']))) {
        cardElement.querySelector('.card__like-button').classList.add('card__like-button_is-active');
    }

    cardElement.querySelector('.card__like-button').addEventListener('click', evt => handleLikeCard(evt, cardElement, _id));
    cardElement.querySelector('.card__like-counter').textContent = likes.length;
    cardElement.querySelector('.card__image').addEventListener('click', () => handleOpenCard(name, link));
    return cardElement;
}

export { createCard }