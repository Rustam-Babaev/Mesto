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



//Функция проверки на валидность формы с изменениями стандартных фраз
function isValid(form, input, errorClass, inputErrorClass) {
    const formError = form.querySelector(`.${input.id}-error`);
    if (!input.validity.valid) {
        if (input.validity.valueMissing) { input.setCustomValidity('Вы пропустили это поле.') } else
        if (input.validity.typeMismatch) { input.setCustomValidity('Введите адрес сайта.') } else { input.setCustomValidity('') }
        showInputError(formError, input, input.validationMessage, errorClass, inputErrorClass);
    } else {
        hideInputError(formError, input, errorClass, inputErrorClass);
    }
};



//Функция проверки валидности всех инпутов формы для переключения состояния submit
function hasInvalidInput(inputs) {
    return inputs.some(item => !item.validity.valid)
}

//Функции для управления состоянием Submit формы добавления поста, с параметром класса неактивной кнопки
function addSubmitDisabled(submit, buttonDisabledClass) {
    submit.classList.add(buttonDisabledClass);
    submit.setAttribute('disabled', 'disabled')
}

function addSubmitActive(submit, buttonDisabledClass) {
    submit.classList.remove(buttonDisabledClass);
    submit.removeAttribute("disabled");
}

//Переключения состояния submit
function toggleSubmit(inputs, submit, buttonDisabledClass) {
    hasInvalidInput(inputs) ? addSubmitDisabled(submit, buttonDisabledClass) : addSubmitActive(submit, buttonDisabledClass)
}



//Функция которая выполняет валидацию формы и показывает ошибки, на вход принимает массив с обьектами которые являются отдельными формами
function enableValidation(forms) {
    forms.forEach(obj => {
        const form = document.querySelector(obj.formSelector);
        const inputs = Array.from(form.querySelectorAll(obj.inputSelector));
        const submit = form.querySelector(obj.submitButtonSelector);
        const errorClass = obj.errorClass;
        const inputErrorClass = obj.inputErrorClass;
        const buttonDisabledClass = obj.inactiveButtonClass;

        form.addEventListener('submit', evt => evt.preventDefault());
        form.addEventListener('input', evt => {
            isValid(form, evt.target, errorClass, inputErrorClass);
            toggleSubmit(inputs, submit, buttonDisabledClass)
        })
    })
}



//Вызов функции валидации форм с данными форм из другого js файла
enableValidation(formsData);
