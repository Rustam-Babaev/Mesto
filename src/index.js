//Импорт данных и всех классов
import '../pages/index.css';
import { initialCards, formsData } from '../js/Data';
import Card from '../js/Card.js';
import FormValidator from '../js/FormValidator.js';
import Section from '../js/Section.js';
import PopupWithForm from '../js/PopupWithForm.js';
import PopupWithImage from '../js/PopupWithImage.js';
import UserInfo from '../js/UserInfo.js';

//Шаблон и контейнер карточек
const cardContainerSelector = '.cards';
const cardTemplateSelector = '#cardTemp';

// editPopup элементы
const editPopup = document.querySelector('.popup_type_edit');
const editPopupName = editPopup.querySelector('#userName-input');
const editPopupInfo = editPopup.querySelector('#userInfo-input');
const editButton = document.querySelector('.profile__edit-button');

// addPopup элементы
const addButton = document.querySelector('.profile__add-button');

//Инициализация класса FormValidator
const validFormEdit = new FormValidator(formsData[0], formsData[0].formSelector);
const validFormAdd = new FormValidator(formsData[1], formsData[1].formSelector);

//Инициализация класса превью поста
const previewPopup = new PopupWithImage('.popup_type_preview');
previewPopup.setEventListeners();



//Инициализация класса Section и отрисовка карточек на странице
//Также здесь передаюем функцию handleCardClick со слабой связью для показа превью поста
const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card({
            cardData: item,
            cardTemplate: cardTemplateSelector,
            handleCardClick: (image) => {
                image.addEventListener('click', (evt) => previewPopup.open(evt))
            }
        });
        const cardElement = card.createCard();
        cardsList.addItem(cardElement, 'append')
    }
}, cardContainerSelector);

cardsList.renderItems();




const addform = new PopupWithForm({
    popupSelector: '.popup_type_add',
    handleFormSubmit: (formData) => {
        const card = new Card({
            cardData: formData,
            cardTemplate: cardTemplateSelector,
            handleCardClick: (image) => {
                image.addEventListener('click', (evt) => previewPopup.open(evt))
            }
        });
        const cardElement = card.createCard();
        cardsList.addItem(cardElement, 'prepend')
    }
});

addform.setEventListeners();
addButton.addEventListener('click', () => addform.open());




//Инициализация классов UserInfo и PopupWithForm
const userInfo = new UserInfo({
    userNameSelector: '.profile__title',
    userInfoSelector: '.profile__subtitle'
})

const editForm = new PopupWithForm({
    popupSelector: '.popup_type_edit',
    handleFormSubmit: (formData) => {
        userInfo.setUserInfo(formData.userName, formData.userInfo);
    }
})

editForm.setEventListeners();

editButton.addEventListener('click', () => {
    editForm.open();
    const userData = userInfo.getUserInfo();
    editPopupName.value = userData.userName;
    editPopupInfo.value = userData.userInfo;
});




//Вызов метода валидации форм
validFormEdit.enableValidation();
validFormAdd.enableValidation();
