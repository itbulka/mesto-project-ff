// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
const createCard = ({name, link}, deleteCard) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(cardElement));
    return cardElement;
}

// @todo: Функция удаления карточки
const deleteCard = cardElement => cardElement.remove();

// @todo: Вывести карточки на страницу
function loadCards() {
    initialCards.forEach(item => {
        placesList.append(createCard(item, deleteCard));
    })
}

loadCards()