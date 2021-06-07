//Добавления на страницу списка постов из массива данных
const initialCards = [{
        name: 'Санторини самый романтичный остров в мире',
        link: './images/Santorini.jpg'
    },
    {
        name: 'Корсика',
        link: './images/Korsica.jpg'
    },
    {
        name: 'Сицилия',
        link: './images/Sicilia.jpg'
    },
    {
        name: 'Мадейра',
        link: './images/Madeira.jpg'
    },
    {
        name: 'Мальта',
        link: './images/Malta.jpg'
    },
    {
        name: 'Тенерифе',
        link: './images/Tenerife.jpg'
    }
];
const cardConteiner = document.querySelector('.cards')
const cardTemplate = document.querySelector('#cardTemp');
initialCards.forEach(item => {
    let cardElement = cardTemplate.content.cloneNode(true);
    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;
    cardConteiner.append(cardElement);
})




//Функции Открытие и закрытие  попапов
function togglePopup(evt) {
    if (evt.target === addButton) { addPopup.classList.toggle('popup_opened') } else
    if (evt.target === editButton) { editPopup.classList.toggle('popup_opened') } else
    if (evt.target.classList.contains('card__image')) { previewPopup.classList.toggle('popup_opened') } else { evt.target.closest('.popup').classList.toggle('popup_opened') }
}

function closePopup(evt) {
    if (evt.target === evt.currentTarget) { togglePopup(evt) };
}

//Коллекии попопов и кнопок закрытия
const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close-button');

//Коллекция попапов проверяем на клик оверлея, прогоняем и находим ближайший родитель попап и закрываем его
//Коллекция кнопок закрытия попапов, прогоняем и находим ближайший родитель попап и закрываем его
popups.forEach(item => item.addEventListener('click', closePopup));
closeButtons.forEach(item => item.addEventListener('click', closePopup));




//Профайл пользователя
let profileName = document.querySelector('.profile__title');
let profileDiscription = document.querySelector('.profile__subtitle');

// editPopup элементы
const editPopup = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const editForm = editPopup.querySelector('.popup__form');
let editName = editForm.querySelector('.popup__input_value_nickname');
let editDiscription = editForm.querySelector('.popup__input_value_discription');

//Функции для работы с editPopup
function editProfile(evt) {
    togglePopup(evt);
    editName.value = profileName.textContent;
    editDiscription.value = profileDiscription.textContent;
}

function editFormSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = editName.value;
    profileDiscription.textContent = editDiscription.value;
    togglePopup(evt)
}

//editPopup события
editButton.addEventListener('click', editProfile);
editForm.addEventListener('submit', editFormSubmitHandler);




// addPopup элементы
const addPopup = document.querySelector('.popup_type_add');
const addButton = document.querySelector('.profile__add-button');
const addForm = addPopup.querySelector('.popup__form');
let placeName = addForm.querySelector('.popup__input_value_placeName');
let link = addForm.querySelector('.popup__input_value_link');

//Добавление карточки и проверка на кол-во карточек чтобы они выстраивались по центру
function addFormSubmitHandler(evt) {
    evt.preventDefault();
    let cardElement = cardTemplate.content.cloneNode(true);
    cardElement.querySelector('.card__image').src = link.value;
    cardElement.querySelector('.card__image').alt = placeName.value;
    cardElement.querySelector('.card__title').textContent = placeName.value;
    cardConteiner.prepend(cardElement);
    link.value = null;
    placeName.value = null;
    let arr = cardConteiner.getElementsByClassName('card');
    if (arr.length === 2) { cardConteiner.style.width = '581px' };
    if (arr.length > 2) { cardConteiner.style.width = null };
    togglePopup(evt)
}

//addPopup события
addButton.addEventListener('click', togglePopup);
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
        let arr = cardConteiner.getElementsByClassName('card');
        if (arr.length === 2) { cardConteiner.style.width = '581px' } else
        if (arr.length === 1) { cardConteiner.style.width = '282px' }
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
        togglePopup(evt);
        let card = evt.target.closest('.card');
        let cardTittle = card.querySelector('.card__title');
        previewImg.src = evt.target.src;
        previewImg.alt = evt.target.alt;
        previewTittle.textContent = cardTittle.textContent;
    }
}

cardConteiner.addEventListener('click', previewCard);
