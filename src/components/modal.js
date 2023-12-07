
function closePopupForOverlay(evt, popup) {
    if (evt.target.classList.contains('popup')) {
        popup.classList.remove('popup_is-opened');
    }
}

function closePopupKeyDown(evt, popup) {
    console.log(evt.key);
    if (evt.key === 'Escape' && popup.classList.contains('popup_is-opened')) {
        console.log('close')
        popup.classList.remove('popup_is-opened');
        evt.target.removeEventListener('keydown', closePopupKeyDown);
    }
}

function closePopupForButton(evt, popup) {
    if(evt.target.classList.contains('popup__close')) {
        popup.classList.remove('popup_is-opened');
    }
}

function openPopup(popup) {
    if (!popup.classList.contains('popup_is-opened')) {
        popup.classList.add('popup_is-opened');
    }
}

export { openPopup, closePopupForButton, closePopupKeyDown, closePopupForOverlay }
