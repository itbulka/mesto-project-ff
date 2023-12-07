import './pages/index.css';

import loadCards from './components/cards.js';
import { openPopup, closePopupForButton, closePopupKeyDown, closePopupForOverlay } from './components/modal.js';

const cardTemplate = document.querySelector('#card-template').content;

const placesList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');

editButton.addEventListener('click', () => openPopup(popupEdit) );

const popupCloseButton = popupEdit.querySelector('.popup__close');
popupCloseButton.addEventListener('click', evt => closePopupForButton(evt, popupEdit));

document.addEventListener('keydown', (evt) => closePopupKeyDown(evt, popupEdit) );

popupEdit.addEventListener('click', evt => closePopupForOverlay(evt, popupEdit));

loadCards(placesList, cardTemplate);
