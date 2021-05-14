let popup = document.querySelector('.popup');
let editProfile = document.querySelector('.profile__edit-button');
let closeButton = popup.querySelector('.popup__close-button');
let formElement = popup.querySelector('.popup__form');
let editName = formElement.querySelector('.popup__input_nickname');
let editDiscription = formElement.querySelector('.popup__input_discription');
let profileName = document.querySelector('.profile__title');
let profileDiscription = document.querySelector('.profile__subtitle');


function togglePopup() {
    popup.classList.toggle('popup_opened')
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = editName.value;
    profileDiscription.textContent = editDiscription.value;
    togglePopup()
}

function editInformation() {
    togglePopup();
    editName.value = profileName.textContent;
    editDiscription.value = profileDiscription.textContent;
}

//Добавил закрытие попапа при щелчке по оверлею, спасибо вебинару от 13.05
popup.addEventListener('click', evt => { if (evt.target === evt.currentTarget) { togglePopup() } });

editProfile.addEventListener('click', editInformation);

closeButton.addEventListener('click', togglePopup);

formElement.addEventListener('submit', formSubmitHandler);