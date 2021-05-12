let popup = document.querySelector('.popup');
let editProfile = document.querySelector('.profile__edit-button');
let closeButton = popup.querySelector('.popup__close-button');
let formElement = popup.querySelector('.popup__form');
let editName = formElement.querySelector('.popup__nickname');
let editDiscription = formElement.querySelector('.popup__discription');
let profileName = document.querySelector('.profile__title');
let profileDiscription = document.querySelector('.profile__subtitle');


// Добавил изменение значка лайк
let cards = document.querySelector('.cards');
let card = cards.querySelectorAll('.card');
for (item of card) {
    let like = item.querySelector('.card__like');
    like.addEventListener('click', () => like.classList.toggle('card__like_active'))
}



function ClosePopup() {
    popup.classList.remove('popup_opened')
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = editName.value;
    profileDiscription.textContent = editDiscription.value;
    ClosePopup()
}

editProfile.addEventListener('click', () => {
    popup.classList.add('popup_opened');
    editName.value = profileName.textContent;
    editDiscription.value = profileDiscription.textContent;
});

closeButton.addEventListener('click', ClosePopup);

formElement.addEventListener('submit', formSubmitHandler);
