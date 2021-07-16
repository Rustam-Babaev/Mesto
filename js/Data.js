const santoriniImage = new URL('../images/Santorini.jpg',
    import.meta.url);
const korsicaImage = new URL('../images/Korsica.jpg',
    import.meta.url);
const siciliaImage = new URL('../images/Sicilia.jpg',
    import.meta.url);
const madeiraImage = new URL('../images/Madeira.jpg',
    import.meta.url);
const maltaImage = new URL('../images/Malta.jpg',
    import.meta.url);
const tenerifeImage = new URL('../images/Tenerife.jpg',
    import.meta.url);


const initialCards = [{
        namePost: 'Санторини самый',
        linkPost: santoriniImage
    },
    {
        namePost: 'Корсика',
        linkPost: korsicaImage
    },
    {
        namePost: 'Сицилия',
        linkPost: siciliaImage
    },
    {
        namePost: 'Мадейра',
        linkPost: madeiraImage
    },
    {
        namePost: 'Мальта',
        linkPost: maltaImage
    },
    {
        namePost: 'Тенерифе',
        linkPost: tenerifeImage
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
