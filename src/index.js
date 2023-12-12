import './pages/index.css';

import { initialCards } from './components/cards.js';
import { createCard, deleteCard, likeCard } from './components/card';
import { openPopup, closePopup } from './components/modal.js';

const placesList = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

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
buttonEdit.addEventListener('click', () => openPopup(popupEdit) );
const buttonClosePopupEdit = popupEdit.querySelector('.popup__close');
buttonClosePopupEdit.addEventListener('click', evt => closePopup(popupEdit))

buttonAdd.addEventListener('click', evt => openPopup(popupNewCard));
const buttonClosePopupNewCard = popupNewCard.querySelector('.popup__close');
buttonClosePopupNewCard.addEventListener('click', evt => closePopup(popupNewCard))

const buttonClosePopupImage = popupImage.querySelector('.popup__close');
buttonClosePopupImage.addEventListener('click', evt => closePopup(popupImage));

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
function handleFormSubmitEditProfile(evt) {
    evt.preventDefault();

    const nameInputValue = nameInputFormEdit.value;
    const descriptionInputValue = descriptionInputFormEdit.value;

    profileTitle.textContent = nameInputValue;
    profileDescription.textContent = descriptionInputValue;

    nameInputFormEdit.value = '';
    descriptionInputFormEdit.value = ''

    closePopup(popupEdit);
}

const handleOpenCard = (name, link) => {
    captionPopup.textContent = name;
    imagePopup.src = link;
    imagePopup.alt = `На фото ${name}`
    openPopup(popupImage);
}

loadCards(placesList);

formEdit.addEventListener('submit', handleFormSubmitEditProfile);
formNewCard.addEventListener('submit', handleFormSubmitAddCard);