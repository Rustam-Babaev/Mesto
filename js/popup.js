const cardConteiner = document.querySelector('.cards')
const cardTemplate = document.querySelector('#cardTemp');

function createCard(name, link) {
    let cardElement = cardTemplate.content.cloneNode(true);
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    cardElement.querySelector('.card__title').textContent = name;
    return cardElement
}

function renderCard(card, container, position) {
    if (position === 'append') { container.append(card) } else
    if (position === 'prepend') { container.prepend(card) }
}


//Добавления на страницу списка постов из массива данных
initialCards.forEach(item => {
    renderCard(createCard(item.name, item.link), cardConteiner, 'append');
})




//Функции Открытие и закрытие  попапов

function closestPopup(evt) {
    return evt.target.closest('.popup')
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function closePopupbutton(evt) {
    if (evt.target.classList.contains('popup__close-button')) { closePopup(closestPopup(evt)) };
}

function closePopupOverlay(evt) {
    if (evt.target === evt.currentTarget) { closePopup(closestPopup(evt)) };
}

function openDifferentPopup(evt) {
    if (evt.target === addButton) { openPopup(addPopup) } else
    if (evt.target === editButton) { openPopup(editPopup) } else
    if (evt.target.classList.contains('card__image')) { openPopup(previewPopup) }
}

//Коллекии попопов и кнопок закрытия
const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close-button');

//Коллекция попапов проверяем на клик оверлея, прогоняем и находим ближайший родитель попап и закрываем его
//Коллекция кнопок закрытия попапов, прогоняем и находим ближайший родитель попап и закрываем его
popups.forEach(item => item.addEventListener('click', closePopupOverlay));
closeButtons.forEach(item => item.addEventListener('click', closePopupbutton));




//Профайл пользователя
const profileName = document.querySelector('.profile__title');
const profileDiscription = document.querySelector('.profile__subtitle');

// editPopup элементы
const editPopup = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const editForm = editPopup.querySelector('.popup__form');
const editName = editForm.querySelector('.popup__input_value_nickname');
const editDiscription = editForm.querySelector('.popup__input_value_discription');

//Функции для работы с editPopup
function editProfile(evt) {
    openDifferentPopup(evt);
    editName.value = profileName.textContent;
    editDiscription.value = profileDiscription.textContent;
}

function editFormSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = editName.value;
    profileDiscription.textContent = editDiscription.value;
    closePopup(closestPopup(evt))
}

//editPopup события
editButton.addEventListener('click', editProfile);
editForm.addEventListener('submit', editFormSubmitHandler);




// addPopup элементы
const addPopup = document.querySelector('.popup_type_add');
const addButton = document.querySelector('.profile__add-button');
const addForm = addPopup.querySelector('.popup__form');
const placeName = addForm.querySelector('.popup__input_value_placeName');
const link = addForm.querySelector('.popup__input_value_link');
//Добавление карточки и проверка на кол-во карточек чтобы они выстраивались по центру
function addFormSubmitHandler(evt) {
    evt.preventDefault();
    renderCard(createCard(placeName.value, link.value), cardConteiner, 'prepend');
    link.value = '';
    placeName.value = '';
    closePopup(closestPopup(evt))
}

//addPopup события
addButton.addEventListener('click', openDifferentPopup);
addForm.addEventListener('submit', addFormSubmitHandler);




//Лайк для карточек, делегирую на контейнер карточек и проверяю имеет ли нажатый элемент класс лайка
function like(evt) {
    if (evt.target.classList.contains('card__like')) { evt.target.classList.toggle('card__like_active') }
}
cardConteiner.addEventListener('click', like);




//Удаление карточек и проверка кол-во карточек для выравнивания по центру при маленьком кол-ве карточек
function deleteCard(evt) {
    if (evt.target.classList.contains('card__delete')) {
        evt.target.closest('.card').remove();
    };

}

cardConteiner.addEventListener('click', deleteCard);



//previewImg элементы
const previewPopup = document.querySelector('.popup_type_preview');
const previewImg = previewPopup.querySelector('.popup__image');
const previewTittle = previewPopup.querySelector('.popup__title');

//Функция открытие и редактирования превью попапа
function previewCard(evt) {
    if (evt.target.classList.contains('card__image')) {
        openDifferentPopup(evt);
        let card = evt.target.closest('.card');
        let cardTittle = card.querySelector('.card__title');
        previewImg.src = evt.target.src;
        previewImg.alt = evt.target.alt;
        previewTittle.textContent = cardTittle.textContent;
    }
}

cardConteiner.addEventListener('click', previewCard);
