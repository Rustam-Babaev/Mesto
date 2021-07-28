import { esc } from '../utils/constants';
export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this.escClose = this._handleEscClose.bind(this)
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this.escClose);
    }
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this.escClose)
    }

    _handleEscClose(evt) {
        if (evt.key === esc) {
            this.close()
        }
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
                this.close();
            }
        });
    }
}
