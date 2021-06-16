//Шаблон и контейнер карточек
const cardContainer = document.querySelector('.cards')
const cardTemplate = document.querySelector('#cardTemp');

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

//previewImg элементы
const previewPopup = document.querySelector('.popup_type_preview');
const previewImg = previewPopup.querySelector('.popup__image');
const previewTittle = previewPopup.querySelector('.popup__title');




//Функции создания и отрисовки карточек
function createCard(cardData) {
    const cardElement = cardTemplate.content.cloneNode(true);
    const cardElementImage = cardElement.querySelector('.card__image');
    const сardElementLike = cardElement.querySelector('.card__like');
    const сardElementTrash = cardElement.querySelector('.card__delete');
    cardElementImage.src = cardData.link;
    cardElementImage.alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    сardElementLike.addEventListener('click', handleLikeClick);
    сardElementTrash.addEventListener('click', handledeleteCard);
    cardElementImage.addEventListener('click', handlepreviewCard);
    return cardElement
}

function renderCard(card, container, position) {
    if (position === 'append') { container.append(card) } else
    if (position === 'prepend') { container.prepend(card) }
}

//Функция смены состояния лайка
function handleLikeClick(evt) {
    evt.target.classList.toggle('card__like_active')
}

//Функия удаления карточек
function handledeleteCard(evt) {
    evt.target.closest('.card').remove()
}

//Функция открытие и редактирования превью попапа
function handlepreviewCard(evt) {
    openPopup(previewPopup);
    const card = evt.target.closest('.card');
    const cardTittle = card.querySelector('.card__title');
    previewImg.src = evt.target.src;
    previewImg.alt = evt.target.alt;
    previewTittle.textContent = cardTittle.textContent;
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
    if (evt.target === evt.currentTarget) { closePopup(evt.target.closest('.popup')) };
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
    renderCard(createCard(newCard), cardContainer, 'prepend');
    addForm.reset();
    closePopup(addPopup);
}




//Добавления на страницу списка постов из массива данных
initialCards.forEach(item => {
    renderCard(createCard(item), cardContainer, 'append');
})

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
    addSubmitDisabled(addSubmitButton, addSubmitClassDisabled)
});
