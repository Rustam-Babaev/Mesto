export default class Card {

    constructor({ cardData, handleCardClick, handleLikeClick, handledeleteCard, setEventListeners, userId }, cardTemplate) {
        this._cardData = cardData;
        this._cardTemplate = cardTemplate;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handledeleteCard = handledeleteCard;
        this._setEventListeners = setEventListeners;
        this._userId = userId;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardTemplate)
            .content
            .querySelector('.card')
            .cloneNode(true);

        return cardElement;
    }

    //Публичный метод создания карточек
    createCard() {
        this._element = this._getTemplate();
        const _cardElementImage = this._element.querySelector('.card__image');
        const _cardElementLike = this._element.querySelector('.card__like-number');
        const _cardElementTitle = this._element.querySelector('.card__title');
        if (this._cardData.owner && this._cardData.owner._id !== this._userId) { this._element.querySelector('.card__delete').remove() };
        this._cardData.likes.forEach(item => {
            if (item._id === this._userId) { this._element.querySelector('.card__like').classList.add('card__like_active') }
        });
        _cardElementImage.src = this._cardData.link;
        _cardElementImage.alt = this._cardData.name;
        _cardElementLike.textContent = this._cardData.likes.length;
        _cardElementTitle.textContent = this._cardData.name;

        this._setEventListeners(this._element);

        return this._element
    }


}
