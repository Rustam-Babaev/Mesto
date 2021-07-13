//Импорт данных карточек и параметров форм
import '../pages/index.css';
import { initialCards, formsData } from '../js/Data';
import { Card } from '../js/Card.js';
//Импорт класса для валидации форм и функция изменяющая состояние кнопки submit у формы
import { FormValidator } from '../js/FormValidator.js'

//Шаблон и контейнер карточек
const cardContainer = document.querySelector('.cards');
const cardTemplateSelector = '#cardTemp';

//Коллекии попопов и кнопок закрытия
const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close-button');

//Профайл пользователя
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');

// editPopup элементы
const editPopup = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const editForm = editPopup.querySelector('.popup__form');
const editName = editForm.querySelector('.popup__input_value_nickname');
const editDescription = editForm.querySelector('.popup__input_value_description');

// addPopup элементы
const addPopup = document.querySelector('.popup_type_add');
const addButton = document.querySelector('.profile__add-button');
const addForm = addPopup.querySelector('.popup__form');
const addSubmitButton = addPopup.querySelector('.popup__submit');
const placeName = addForm.querySelector('.popup__input_value_placeName');
const link = addForm.querySelector('.popup__input_value_link');

//Находим в массиве данных форм класс неактивной кнопки для попапа добавления карточки
const addSubmitClassDisabled = formsData.find(item => item.formSelector === '.popup__form[name="popupEditForm"]').inactiveButtonClass;

//
const validFormEdit = new FormValidator(formsData[0], formsData[0].formSelector);
const validFormAdd = new FormValidator(formsData[1], formsData[1].formSelector);





//Функция для добавления карточки в общий контейнер с выбором расположения
function renderCard(card, container, position) {
    if (position === 'append') { container.append(card) } else
    if (position === 'prepend') { container.prepend(card) }
}


//Функции Открытие и закрытие  попапов
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEscape);

}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEscape);
}

function closePopupbutton(evt) {
    if (evt.target.classList.contains('popup__close-button')) { closePopup(evt.target.closest('.popup')) };
}

function closePopupOverlay(evt) {
    if (evt.target === evt.currentTarget) { closePopup(evt.target) };
}

//Функция закрытия попапа при нажитие клавиши escape
function closePopupEscape(event) {
    if (event.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
}

//Функции для работы с editPopup.
function editProfile(evt) {
    openPopup(editPopup);
    editName.value = profileName.textContent;
    editDescription.value = profileDescription.textContent;
}

function editFormSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = editName.value;
    profileDescription.textContent = editDescription.value;
    closePopup(editPopup)
}

//Функция добавление карточки при нажатии submit и стирание формы с последующим закрытия попапа
function addFormSubmitHandler(evt) {
    const newCard = {
        name: placeName.value,
        link: link.value
    }
    evt.preventDefault();
    const card = new Card(newCard, '#cardTemp');
    const cardElement = card.createCard();
    renderCard(cardElement, cardContainer, 'prepend');
    addForm.reset();
    closePopup(addPopup);
}




//Проход по массиву предоставленных данных и создания карточек с помощью класса Card с последующим добавленим на страницу
initialCards.forEach(item => {
    const card = new Card(item, cardTemplateSelector);
    const cardElement = card.createCard();
    renderCard(cardElement, cardContainer, 'append');
})


//Вызов метода валидации форм
validFormEdit.enableValidation();
validFormAdd.enableValidation();




//Коллекция попапов проверяем на клик оверлея, прогоняем и находим ближайший родитель попап и закрываем его
//Коллекция кнопок закрытия попапов, прогоняем и находим ближайший родитель попап и закрываем его
popups.forEach(item => item.addEventListener('mousedown', closePopupOverlay));
closeButtons.forEach(item => item.addEventListener('click', closePopupbutton));

//editPopup события
editButton.addEventListener('click', editProfile);
editForm.addEventListener('submit', editFormSubmitHandler);


//addPopup события
addButton.addEventListener('click', evt => openPopup(addPopup));
addForm.addEventListener('submit', evt => {
    addFormSubmitHandler(evt);
    validFormAdd.addSubmitDisabled()
});


//Экспорт функции открытия попапа
export { openPopup }
