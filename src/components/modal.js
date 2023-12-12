function closePopup(popup) {
    if (popup.classList.contains('popup_is-opened')) {
        popup.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', closePopupEscape)
    }
}

const closePopupOverlay = (evt, popup) => {
    if (evt.target.classList.contains('popup')) {
        closePopup(popup);
    }
}

const closePopupEscape = (evt) => {
    console.log('Enter function closePopupEscape');
    if (evt.key === 'Escape') {
        const popupElement = document.querySelector('.popup_is-opened')
        closePopup(popupElement);
    }
}

function openPopup(popup) {
    if (!popup.classList.contains('popup_is-opened')) {
        popup.classList.add('popup_is-opened');
        popup.addEventListener('click', evt => closePopupOverlay(evt, popup) )
        document.addEventListener('keydown', closePopupEscape)
    }
}

export { openPopup, closePopup }
