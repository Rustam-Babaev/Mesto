//Функции для управления состоянием Submit формы добавления поста, с параметром класса неактивной кнопки
function addSubmitDisabled(submit, buttonDisabledClass) {
    submit.classList.add(buttonDisabledClass);
    submit.setAttribute('disabled', 'disabled')
}

function addSubmitActive(submit, buttonDisabledClass) {
    submit.classList.remove(buttonDisabledClass);
    submit.removeAttribute("disabled");
}



class FormValidator {

    constructor(formsData, formElement) {
        this._formsData = formsData;
        this._formElement = formElement
    }

    //Метод для отображения ошибок и их скрытие
    _showInputError(error, input, errorMessage, errorClass, inputErrorClass) {
        error.classList.add(errorClass);
        error.textContent = errorMessage;
        input.classList.add(inputErrorClass);
    }

    //Методы для отображения ошибок и их скрытие
    _showInputError(error, input, errorMessage, errorClass, inputErrorClass) {
        error.classList.add(errorClass);
        error.textContent = errorMessage;
        input.classList.add(inputErrorClass);
    }

    _hideInputError(error, input, errorClass, inputErrorClass) {
        error.classList.remove(errorClass);
        input.classList.remove(inputErrorClass);

    }

    //Метод проверки на валидность формы с изменениями стандартных фраз
    _isValid(form, input, errorClass, inputErrorClass) {
        const formError = form.querySelector(`.${input.id}-error`);
        if (!input.validity.valid) {
            if (input.validity.valueMissing) { input.setCustomValidity('Вы пропустили это поле.') } else
            if (input.validity.typeMismatch) { input.setCustomValidity('Введите адрес сайта.') } else { input.setCustomValidity('') }
            this._showInputError(formError, input, input.validationMessage, errorClass, inputErrorClass);
        } else {
            this._hideInputError(formError, input, errorClass, inputErrorClass);
        }
    }

    //Метод проверки валидности всех инпутов формы для переключения состояния submit
    _hasInvalidInput(inputs) {
        return inputs.some(item => !item.validity.valid)
    }


    //Метод переключения состояния submit
    _toggleSubmit(inputs, submit, buttonDisabledClass) {
        this._hasInvalidInput(inputs) ? addSubmitDisabled(submit, buttonDisabledClass) : addSubmitActive(submit, buttonDisabledClass)
    }



    //Метод который выполняет валидацию формы и показывает ошибки
    enableValidation() {
        const _form = document.querySelector(this._formElement);
        const _inputs = Array.from(_form.querySelectorAll(this._formsData.inputSelector));
        const _submit = _form.querySelector(this._formsData.submitButtonSelector);
        const _errorClass = this._formsData.errorClass;
        const _inputErrorClass = this._formsData.inputErrorClass;
        const _buttonDisabledClass = this._formsData.inactiveButtonClass;

        _form.addEventListener('submit', evt => evt.preventDefault());
        _form.addEventListener('input', evt => {
            this._isValid(_form, evt.target, _errorClass, _inputErrorClass);
            this._toggleSubmit(_inputs, _submit, _buttonDisabledClass)
        })
    }

}

export { FormValidator, addSubmitDisabled }
