const cardTemplate = document.querySelector('#card-template').content;

const createCard = ({name, link, likes, owner, _id}, idUser, handleDeleteCard, handleLikeCard, handleOpenCard) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = `На фотке ${name}`
    cardElement.querySelector('.card__title').textContent = name;
    if (idUser === owner['_id']) {
        cardElement.querySelector('.card__delete-button').addEventListener('click', () => handleDeleteCard(cardElement, _id));
    } else {
        cardElement.querySelector('.card__delete-button').hidden = true;
    }
    cardElement.querySelector('.card__like-button').addEventListener('click', handleLikeCard);
    cardElement.querySelector('.card__like-counter').textContent = likes.length;
    cardElement.querySelector('.card__image').addEventListener('click', () => handleOpenCard(name, link));
    return cardElement;
}

// const deleteCard = cardElement => cardElement.remove();

const likeCard = evt => {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active')
    }
}

export { createCard, likeCard }