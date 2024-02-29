import './pages/index.css';

import { createCard } from './components/card';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';

// API
import {getUser, getCards, editUser, addCard, deleteCard, addLikeCard, removeLikeCard, editAvatarProfile } from './api/api.js';

const placesList = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileEditAvatar = document.querySelector('.profile__image');
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

const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const formEditAvatar = document.forms['edit-avatar'];
const urlInputFormEditAvatar = formEditAvatar.elements['link'];

const configValidation = {
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_type_error',
    inputErrorActiveClass: 'popup__input_error-active',
    buttonSubmitSelector: '.popup__button',
    buttonSubmitDisableClass: 'popup__button_inactive',
}

const initialUser = (name, about, avatar) => {
    profileTitle.textContent = name;
    profileDescription.textContent = about;
    profileEditAvatar.style.backgroundImage = `url('${avatar}')`;
}

const handleEditAvatar = () => {
    clearValidation(formEditAvatar, configValidation);
    urlInputFormEditAvatar.value = '';
    openPopup(popupEditAvatar);
}
profileEditAvatar.addEventListener('click', () => handleEditAvatar());

// Открытие модального окна по нажатию кнопки редактирования
function handleButtonEdit() {
    clearValidation(formEdit, configValidation);
    nameInputFormEdit.value = profileTitle.textContent;
    descriptionInputFormEdit.value = profileDescription.textContent;
    openPopup(popupEdit)
}
buttonEdit.addEventListener('click', () => handleButtonEdit() );
const buttonClosePopupEdit = popupEdit.querySelector('.popup__close');
buttonClosePopupEdit.addEventListener('click', evt => closePopup(popupEdit))

buttonAdd.addEventListener('click', evt => {
    clearValidation(formNewCard, configValidation);
    openPopup(popupNewCard)
});
const buttonClosePopupNewCard = popupNewCard.querySelector('.popup__close');
buttonClosePopupNewCard.addEventListener('click', evt => closePopup(popupNewCard))

const buttonClosePopupImage = popupImage.querySelector('.popup__close');
buttonClosePopupImage.addEventListener('click', evt => closePopup(popupImage));

const buttonClosePopupEditAvatar = popupEditAvatar.querySelector('.popup__close');
buttonClosePopupEditAvatar.addEventListener('click', () => closePopup(popupEditAvatar));

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    buttonSubmitSelector: '.popup__button',
    inputErrorClass: 'popup__input_type_error',
    inputErrorActiveClass: 'popup__input_error-active',
    buttonSubmitDisableClass: 'popup__button_inactive',
});

function loadCards(placesList, cards, user) {
    cards.forEach(card => {
        placesList.append(createCard(card, user, handleDeleteCard, handleLikeCard, handleOpenCard));
    })
}

function handleFormSubmitAddCard(evt) {
    evt.preventDefault();
    evt.submitter.textContent = 'Сохранение...';

    const nameInputValue = nameInputFormNewCard.value;
    const urlInputValue = urlInputFormNewCard.value;

    addCard(nameInputValue, urlInputValue)
        .then(cardData => {
            const user = cardData.owner;
            const card = createCard(cardData, user, handleDeleteCard, handleLikeCard, handleOpenCard);
            placesList.prepend(card);
        })
        .catch(err => console.log(err))
        .finally(() => {
            nameInputFormNewCard.value = '';
            urlInputFormNewCard.value = '';
            evt.submitter.textContent = 'Сохранить';
            closePopup(popupNewCard);
        });
}

// Редактирование полей через модальное окно
function handleFormSubmitEditProfile(evt) {
    evt.preventDefault();
    evt.submitter.textContent = 'Сохранение...';

    const nameInputValue = nameInputFormEdit.value;
    const descriptionInputValue = descriptionInputFormEdit.value;

    editUser(nameInputValue, descriptionInputValue)
        .then(updateUser => {
            profileTitle.textContent = updateUser.name;
            profileDescription.textContent = updateUser.about;
        })
        .catch(err => console.log(err))
        .finally(() => {
            nameInputFormEdit.value = '';
            descriptionInputFormEdit.value = ''
            evt.submitter.textContent = 'Сохранить';
            closePopup(popupEdit);
        });
}

function handleFormSubmitEditAvatar(evt) {
    evt.preventDefault();
    evt.submitter.textContent = 'Сохранение...';

    const urlInputValue = urlInputFormEditAvatar.value;

    editAvatarProfile(urlInputValue)
        .then(avatar => {
            profileEditAvatar.style.backgroundImage = `url('${urlInputValue}')`;
        })
        .catch(err => console.log(err))
        .finally(() => {
            urlInputFormEditAvatar.value = '';
            evt.submitter.textContent = 'Сохранить';
            closePopup(popupEditAvatar);
        });
}

const handleOpenCard = (name, link) => {
    captionPopup.textContent = name;
    imagePopup.src = link;
    imagePopup.alt = `На фото ${name}`
    openPopup(popupImage);
}

const handleDeleteCard = (cardElement, idCard) => {
    deleteCard(idCard)
        .then((res) => {
            cardElement.remove();
        })
        .catch(err => console.log(err));
}

const handleLikeCard = (evt, cardElement, idCard) => {
    const likeMethod = evt.target.classList.contains('card__like-button') && evt.target.classList.contains('card__like-button_is-active') ? removeLikeCard : addLikeCard;
    likeMethod(idCard)
        .then((card) => {
            cardElement.querySelector('.card__like-counter').textContent = card.likes.length;
            evt.target.classList.toggle('card__like-button_is-active');
        })
        .catch(err => console.log(err));
}

Promise.all([getUser(), getCards()])
    .then(([user, cards]) => {
        initialUser(user.name, user.about, user.avatar);
        loadCards(placesList, cards, user);
    })
    .catch(err => console.log(err));

formEdit.addEventListener('submit', handleFormSubmitEditProfile);
formNewCard.addEventListener('submit', handleFormSubmitAddCard);
formEditAvatar.addEventListener('submit', handleFormSubmitEditAvatar);