import './pages/index.css';

import { initialCards } from './components/cards.js';
import { createCard, deleteCard, likeCard } from './components/card';
import { openPopup, closePopup } from './components/modal.js';

const placesList = document.querySelector('.places__list');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_type_edit');
const formEdit = document.forms['edit-profile'];
const nameInputFormEdit = formEdit.elements.name;
const descriptionInputFormEdit = formEdit.elements.description;

const popupNewCard = document.querySelector('.popup_type_new-card');
const formNewCard = document.forms['new-place'];
const nameInputFormNewCard = formNewCard.elements['place-name'];
const urlInputFormNewCard = formNewCard.elements['link'];

const popupImage = document.querySelector('.popup_type_image');
const captionPopup = popupImage.querySelector('.popup__caption');
const imagePopup = popupImage.querySelector('.popup__image');

// Открытие модального окна по нажатию кнопки редактирования
editButton.addEventListener('click', () => openPopup(popupEdit) );
const closeButtonPopupEdit = popupEdit.querySelector('.popup__close');
closeButtonPopupEdit.addEventListener('click', evt => closePopup(popupEdit))

addButton.addEventListener('click', evt => openPopup(popupNewCard));
const closeButtonPopupNewCard = popupNewCard.querySelector('.popup__close');
closeButtonPopupNewCard.addEventListener('click', evt => closePopup(popupNewCard))

const closePopupImage = popupImage.querySelector('.popup__close');
closePopupImage.addEventListener('click', evt => closePopup(popupImage));

function loadCards(placesList) {
    initialCards.forEach(item => {
        placesList.append(createCard(item, deleteCard, likeCard, handleOpenCard));
    })
}

function handleFormSubmitAddCard(evt) {
    evt.preventDefault();

    const nameInputValue = nameInputFormNewCard.value;
    const urlInputValue = urlInputFormNewCard.value;

    const card = createCard({ name: nameInputValue, link: urlInputValue }, deleteCard, likeCard, handleOpenCard);
    console.log(card);
    placesList.prepend(card);

    nameInputFormNewCard.value = '';
    urlInputFormNewCard.value = '';

    closePopup(popupNewCard);
}

// Редактирование полей через модальное окно
function handleFormSubmit(evt) {
    evt.preventDefault();

    const nameInputValue = nameInputFormEdit.value;
    const descriptionInputValue = descriptionInputFormEdit.value;

    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    profileTitle.textContent = nameInputValue;
    profileDescription.textContent = descriptionInputValue;

    nameInputFormEdit.value = '';
    descriptionInputFormEdit.value = ''

    closePopup(popupEdit);
}

const handleOpenCard = (name, link) => {
    captionPopup.textContent = name;
    imagePopup.src = link;
    openPopup(popupImage);
}

loadCards(placesList);

formEdit.addEventListener('submit', handleFormSubmit);
formNewCard.addEventListener('submit', handleFormSubmitAddCard);