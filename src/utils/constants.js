const formsData = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disable',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
};

//Шаблон и контейнер карточек
const cardContainerSelector = '.cards';
const cardTemplateSelector = '#cardTemp';

// editPopup элементы
const editPopup = document.querySelector('.popup_type_edit');
const editPopupName = editPopup.querySelector('#userName-input');
const editPopupInfo = editPopup.querySelector('#userInfo-input');
const editButton = document.querySelector('.profile__edit-button');
const editSubmit = editPopup.querySelector('.popup__submit');


// addPopup элементы
const addButton = document.querySelector('.profile__add-button');
const addSubmit = document.querySelector('.popup_type_add').querySelector('.popup__submit');

// avatar элементы
const avatar = document.querySelector('.profile__avatar');
const avatarSubmit = document.querySelector('.popup_type_edit-avatar').querySelector('.popup__submit');

// confirmationPopup элументы
const confirmationSubmit = document.querySelector('.popup_type_confirmation').querySelector('.popup__submit');

// Escape клавиша
const esc = 'Escape';

export {
    formsData,
    cardContainerSelector,
    cardTemplateSelector,
    editPopupName,
    editPopupInfo,
    editButton,
    addButton,
    avatar,
    editSubmit,
    addSubmit,
    avatarSubmit,
    confirmationSubmit,
    esc
}
