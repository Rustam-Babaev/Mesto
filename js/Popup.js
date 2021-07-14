export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector
    }

    open() {
        popup.classList.add('popup_opened');
    }
    close() {
        popup.classList.remove('popup_opened');
    }

    _handleEscClose() {

    }

    setEventListeners() {

    }
}