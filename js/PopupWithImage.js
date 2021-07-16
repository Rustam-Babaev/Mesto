import Popup from "./Popup"
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._previewImg = this._popup.querySelector('.popup__image');
        this._previewTittle = this._popup.querySelector('.popup__title');
    }

    open(evt) {
        super.open();
        const _card = evt.target.closest('.card');
        const _cardTittle = _card.querySelector('.card__title');
        this._previewImg.src = evt.target.src;
        this._previewImg.alt = evt.target.alt;
        this._previewTittle.textContent = _cardTittle.textContent;
    }

}
