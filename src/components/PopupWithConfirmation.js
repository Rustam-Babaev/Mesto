import Popup from "./Popup"
export default class PopupWithConfirmation extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('form');
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this.getCardData())
        })

    }

    setCardData(cardId, elem) {
        this._cardData = {}
        this._cardData.cardId = cardId;
        this._cardData.elem = elem
    }

    getCardData() {
        return this._cardData
    }

}
