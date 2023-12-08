function closePopup(popup) {
    if (popup.classList.contains('popup_is-opened')) {
        popup.classList.remove('popup_is-opened');
    }
}

const closePopupOverlay = (evt, popup) => {
    if (evt.target.classList.contains('popup')) {
        closePopup(popup);
    }
}

const closePopupEscape = (evt, popup) => {
    console.log('Enter function closePopupEscape');
    if (evt.key === 'Escape') {
        closePopup(popup);
        document.removeEventListener('keydown', evt => closePopupEscape(evt, popup))
    }
}

function openPopup(popup) {
    if (!popup.classList.contains('popup_is-opened')) {
        popup.classList.add('popup_is-opened');
        popup.addEventListener('click', evt => closePopupOverlay(evt, popup) )
        document.addEventListener('keydown', evt => closePopupEscape(evt, popup) )
    }
}

export { openPopup, closePopup }
