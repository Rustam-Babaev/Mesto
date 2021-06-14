//Функции для отображения ошибок и их скрытие, привел к общему виду чтобы можно было работать с большим кол-вом форм
function showInputError(error, input, errorMessage, errorClass, inputErrorClass) {
    error.classList.add(errorClass);
    error.textContent = errorMessage;
    input.classList.add(inputErrorClass);
}

function hideInputError(error, input, errorClass, inputErrorClass) {
    error.classList.remove(errorClass);
    input.classList.remove(inputErrorClass);
}



//Функция проверки на валидность формы, немного изменил стандартные фразы на фразы из превью проектной работы
function isValid(form, input, errorClass, inputErrorClass) {
    const formError = form.querySelector(`.${input.id}-error`);
    if (!input.validity.valid) {
        let validMessage = input.validationMessage;
        if (validMessage === 'Введите URL.') { validMessage = 'Введите адрес сайта.' };
        if (validMessage === 'Заполните это поле.') { validMessage = 'Вы пропустили это поле.' }
        showInputError(formError, input, validMessage, errorClass, inputErrorClass);
    } else {
        hideInputError(formError, input, errorClass, inputErrorClass);
    }
};



//Функция проверки валидности всех инпутов формы для переключения состояния submit
function hasInvalidInput(inputs) {
    return inputs.some(item => !item.validity.valid)
}

//Переключения состояния submit
function toggleSubmit(inputs, submit) {
    if (hasInvalidInput(inputs)) {
        submit.classList.add('popup__submit_disable');
        submit.setAttribute('disabled', 'disabled')
    } else {
        submit.classList.remove('popup__submit_disable');
        submit.removeAttribute("disabled");
    }
}



//Функция которая выполняет валидацию формы и показывает ошибки, на вход принимает массив с обьектами которые являются отдельными формами
function enableValidation(forms) {
    forms.forEach(obj => {
        const form = document.querySelector(obj.formSelector);
        const inputs = Array.from(form.querySelectorAll(obj.inputSelector));
        const submit = form.querySelector(obj.submitButtonSelector);
        const errorClass = obj.errorClass;
        const inputErrorClass = obj.inputErrorClass;

        form.addEventListener('submit', evt => evt.preventDefault());
        form.addEventListener('input', evt => isValid(form, evt.target, errorClass, inputErrorClass));
        form.addEventListener('input', item => toggleSubmit(inputs, submit))
    })
}

//Вызов функции валидации форм с данными форм из другого js файла
enableValidation(formsData);
