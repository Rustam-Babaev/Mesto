const initialCards = [{
        name: 'Санторини самый',
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


const formsData = [{
        formSelector: '.popup__form[name="popupEditForm"]',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__submit',
        inactiveButtonClass: 'popup__submit_disable',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error_visible'
    },
    {
        formSelector: '.popup__form[name="popupAddForm"]',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__submit',
        inactiveButtonClass: 'popup__submit_disable',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error_visible'
    }
]

export { initialCards, formsData }
