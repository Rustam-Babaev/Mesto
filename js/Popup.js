export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    }
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', (evt) => this._handleEscClose(evt))
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close()
        }
    }
    _handleOverlayClose(evt) {
        if (evt.target === evt.currentTarget) { this.close() };
    }


    setEventListeners() {
        this._popup.querySelector('.popup__close-button').addEventListener('click', () => { this.close() });
        this._popup.addEventListener('mousedown', (evt) => this._handleOverlayClose(evt));
    }
}
