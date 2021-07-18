//Импорт данных и всех классов
import '../pages/index.css';
import {
    initialCards,
    formsData,
    cardContainerSelector,
    cardTemplateSelector,
    editPopupName,
    editPopupInfo,
    editButton,
    addButton
} from '../utils/constants';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';



//Инициализация класса FormValidator
const validFormEdit = new FormValidator(formsData.popupEditForm, formsData.popupEditForm.formSelector, editButton);
const validFormAdd = new FormValidator(formsData.popupAddForm, formsData.popupAddForm.formSelector, addButton);

//Инициализация класса превью поста
const previewPopup = new PopupWithImage('.popup_type_preview');
previewPopup.setEventListeners();




//Функция генерирования карточки
//Также здесь передаюем функцию handleCardClick со слабой связью для показа превью поста
function cardGenerate(item) {
    const card = new Card({
        cardData: item,
        cardTemplate: cardTemplateSelector,
        handleCardClick: (evt) => previewPopup.open(evt)
    });
    return card.createCard();
}




//Инициализация класса Section и отрисовка карточек на странице
const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        cardsList.addItem(cardGenerate(item), 'append')
    }
}, cardContainerSelector);

cardsList.renderItems();




const addform = new PopupWithForm({
    popupSelector: '.popup_type_add',
    handleFormSubmit: (formData) => {
        cardsList.addItem(cardGenerate(formData), 'prepend')
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