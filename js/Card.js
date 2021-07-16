export default class Card {

    constructor({ cardData, cardTemplate, handleCardClick }) {
        this._cardData = cardData;
        this._cardTemplate = cardTemplate;
        this._handleCardClick = handleCardClick;
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
        _cardElementImage.src = this._cardData.linkPost;
        _cardElementImage.alt = this._cardData.namePost;
        this._element.querySelector('.card__title').textContent = this._cardData.namePost;

        this._setEventListeners();
        this._handleCardClick(_cardElementImage);

        return this._element
    }

    //Метод для прикрепления обработчиков событий при создании карточек
    _setEventListeners() {
        this._element.querySelector('.card__like').addEventListener('click', (evt) => this._handleLikeClick(evt));
        this._element.querySelector('.card__delete').addEventListener('click', () => this._handledeleteCard());
    }

    //Методы класса для обработчика событий
    _handleLikeClick(evt) {
        evt.target.classList.toggle('card__like_active')
    }

    //Функия удаления карточек. (Предыдущий ревьюер сказал что затирать значения лучше с помощью пустой строки чем null, верно ли это утверждение?)
    _handledeleteCard() {
        this._element.remove();
        this._element = '';
    }


}
