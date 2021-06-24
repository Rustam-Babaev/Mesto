//Импорт функции открытия превью попапа
import { openPopup } from './index.js'

//Переменные для превью попапа
const previewPopup = document.querySelector('.popup_type_preview');
const previewImg = previewPopup.querySelector('.popup__image');
const previewTittle = previewPopup.querySelector('.popup__title');


//Экспорт класса при обьявлении
export class Card {

    constructor(cardData, cardTemplate) {
        this._cardData = cardData;
        this._cardTemplate = cardTemplate;
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
        _cardElementImage.src = this._cardData.link;
        _cardElementImage.alt = this._cardData.name;
        this._element.querySelector('.card__title').textContent = this._cardData.name;

        this._setEventListeners();

        return this._element
    }

    //Метод для прикрепления обработчиков событий при создании карточек
    _setEventListeners() {
        this._element.querySelector('.card__like').addEventListener('click', (evt) => this._handleLikeClick(evt));
        this._element.querySelector('.card__image').addEventListener('click', (evt) => this._handlepreviewCard(evt));
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

    //Функция открытие и редактирования превью попапа
    _handlepreviewCard(evt) {
        openPopup(previewPopup);
        const _card = evt.target.closest('.card');
        const _cardTittle = _card.querySelector('.card__title');
        previewImg.src = evt.target.src;
        previewImg.alt = evt.target.alt;
        previewTittle.textContent = _cardTittle.textContent;
    }

}
