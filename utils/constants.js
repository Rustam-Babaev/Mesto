const formsData = {
    popupEditForm: {
        formSelector: '.popup__form[name="popupEditForm"]',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__submit',
        inactiveButtonClass: 'popup__submit_disable',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error_visible'
    },
    popupAddForm: {
        formSelector: '.popup__form[name="popupAddForm"]',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__submit',
        inactiveButtonClass: 'popup__submit_disable',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error_visible'
    },
    popupEditAvatarForm: {
        formSelector: '.popup__form[name="popupEditAvatarForm"]',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__submit',
        inactiveButtonClass: 'popup__submit_disable',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error_visible'
    }
}

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

// avatar элементы
const avatar = document.querySelector('.profile__avatar');

export { formsData, cardContainerSelector, cardTemplateSelector, editPopupName, editPopupInfo, editButton, addButton, avatar }
