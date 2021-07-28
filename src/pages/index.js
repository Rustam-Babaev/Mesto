//Импорт данных и всех классов
import '../pages/index.css';
import {
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
    confirmationSubmit
} from '../utils/constants';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';



//Инициализация класса api
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
    headers: {
        authorization: 'f4a0975c-9f5e-42b4-a1a3-2878883687ab',
        'Content-Type': 'application/json'
    }
});

//Запрос на сервер для получения информации о пользователе и дальнейшее использования результата ответа для отображении кнопок удаления карточек
//только у владельца карточки а также отображения инфо о пользователе
api.getOwner()
    .then(user => {

        //Функция прелодер, изменяет текс Submit при ожидании ответа сервера и возвращает страндартный текст после получения ответа
        function renderLoading(isLoading, button, buttonText = 'Cохранить') {
            if (isLoading) {
                button.textContent = 'Сохранение...';
            } else { button.textContent = buttonText }
        }


        //Функция генерирования карточки
        function cardGenerate(item) {
            const card = new Card({
                cardData: item,
                handleCardClick: (evt) => previewPopup.open(evt),
                userId: user._id,

                //Настройка метода добавления лайка, проверка на наличие лайка с помощью проставленного при загрузке карточек класса
                handleLikeClick: (evt, elem) => {
                    if (evt.target.classList.contains('card__like_active')) {
                        api.deleteLikeRequest(item._id)
                            .then(res => {
                                evt.target.classList.remove('card__like_active');
                                elem.querySelector('.card__like-number').textContent = res.likes.length;
                            })
                            .catch(err => console.log(err))
                    } else {
                        api.putLikeRequest(item._id)
                            .then(res => {
                                evt.target.classList.add('card__like_active');
                                elem.querySelector('.card__like-number').textContent = res.likes.length;
                            })
                            .catch(err => console.log(err))
                    }
                },

                //Настройка метода удаления карточки, прокидываем данные карточки на которой нажали кнопку удалить
                handledeleteCard: (elem) => {
                    popupConfirmation.setCardData(item._id, elem);
                    popupConfirmation.open()
                },

                //Все обработчики для карточки устанавливаются извне для связи с другими классами
                setEventListeners: function(elem) {
                    elem.querySelector('.card__like').addEventListener('click', (evt) => this._handleLikeClick(evt, elem));
                    if (elem.querySelector('.card__delete')) { elem.querySelector('.card__delete').addEventListener('click', () => this._handledeleteCard(elem)) };
                    elem.querySelector('.card__image').addEventListener('click', (evt) => this._handleCardClick(evt));
                }
            }, cardTemplateSelector);

            return card.createCard();
        }




        //Инициализация класса UserInfo
        const userInfo = new UserInfo({
            userNameSelector: '.profile__title',
            userInfoSelector: '.profile__subtitle'
        })

        //Инициализация класса FormValidator
        const validFormEdit = new FormValidator(formsData, '.popup__form[name="popupEditForm"]', editButton);
        const validFormAdd = new FormValidator(formsData, '.popup__form[name="popupAddForm"]', addButton);
        const validFormEditAvatar = new FormValidator(formsData, '.popup__form[name="popupEditAvatarForm"]', avatar);

        //Инициализация класса превью поста
        const previewPopup = new PopupWithImage('.popup_type_preview');

        //Инициализация класса PopupWithForm для добавления карточек
        const addform = new PopupWithForm({
            popupSelector: '.popup_type_add',
            handleFormSubmit: (formData) => {
                renderLoading(true, addSubmit);
                api.addCardRequest(formData.name, formData.link)
                    .then(res => {
                        cardsList.addItem(cardGenerate(res), 'prepend');
                        addform.close();
                        validFormAdd.addSubmitDisabled()
                    })
                    .catch(err => console.log(err))
                    .finally(() => renderLoading(false, addSubmit, 'Создать'))
            }
        });

        //Контейнер где размещаются все посты
        let cardsList;

        //Инициализация класса PopupWithForm для редактировния инфо пользователя
        const editForm = new PopupWithForm({
            popupSelector: '.popup_type_edit',
            handleFormSubmit: (formData) => {
                renderLoading(true, editSubmit);
                userInfo.setUserInfo(formData.userName, formData.userInfo);
                api.editNameRequest(formData.userName, formData.userInfo)
                    .then(res => {
                        editForm.close();
                        validFormEdit.addSubmitDisabled();
                    })
                    .catch(err => console.log(err))
                    .finally(() => renderLoading(false, editSubmit, 'Сохранить'))
            }
        })

        //Инициализация класса PopupWithForm для изменения аватара пользователя
        const avatarPopup = new PopupWithForm({
            popupSelector: '.popup_type_edit-avatar',
            handleFormSubmit: (formData) => {
                renderLoading(true, avatarSubmit);
                api.editAvatarRequest(formData.link)
                    .then(res => {
                        avatar.style.backgroundImage = `url('${res.avatar}')`;
                        avatarPopup.close();
                        validFormEditAvatar.addSubmitDisabled();
                    })
                    .catch(err => console.log(err))
                    .finally(() => renderLoading(false, avatarSubmit, 'Сохранить'))
            }
        });

        //Инициализация класса PopupWithConfirmation и настройка метода при нажатии Submit
        const popupConfirmation = new PopupWithConfirmation({
            popupSelector: '.popup_type_confirmation',
            handleFormSubmit: (cardData) => {
                renderLoading(true, confirmationSubmit);
                api.deleteCardRequest(cardData.cardId)
                    .then(res => {
                        popupConfirmation.close();
                        cardData.elem.remove();
                    })
                    .catch((err) => console.log(err))
                    .finally(() => renderLoading(false, confirmationSubmit, 'Да'))
            }
        });




        //Запрос к серверу и добавления карточек на страницу
        api.getInitialCards()
            .then(res => {
                cardsList = new Section({
                    items: res,
                    renderer: (item) => {
                        cardsList.addItem(cardGenerate(item), 'append')
                    }
                }, cardContainerSelector);

                cardsList.renderItems();
            });

        //Добавления аватара и инфо на страницу
        userInfo.setUserInfo(user.name, user.about);
        avatar.style.backgroundImage = `url('${user.avatar}')`;




        //Включение валидации форм
        validFormEditAvatar.enableValidation();
        validFormAdd.enableValidation();
        validFormEdit.enableValidation();


        //Установка всех обработчиков события для превью попапа
        previewPopup.setEventListeners();

        //Установка всех обработчиков события для аватар попапа
        avatarPopup.setEventListeners();

        //Установка всех обработчиков события для попапа подтверждения удаления карточки
        popupConfirmation.setEventListeners();

        //Установка всех обработчиков события для попапа добавления карточек
        addform.setEventListeners();

        //Установка всех обработчиков события для попапа редактирования инфо пользователя
        editForm.setEventListeners();

        //Обработчик события при нажатии на кнопку добавления карточки и включение валидации формы
        addButton.addEventListener('click', () => {
            addform.open();
        });

        //Обработчик события при нажатии на аватар и включение валидации формы
        avatar.addEventListener('click', () => {
            avatarPopup.open();
        });

        //Обработчик события при нажатии на кнопку редактирования инфо пользователя и включение валидации формы
        editButton.addEventListener('click', () => {
            editForm.open();
            const userData = userInfo.getUserInfo();
            editPopupName.value = userData.userName;
            editPopupInfo.value = userData.userInfo;
        });

    })
    .catch(err => console.log(err));
