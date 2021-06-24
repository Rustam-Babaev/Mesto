//Был не уверен в предыдущем решении, но было написанно что нужно иметь только один публичный метод у класса и это ввело в ступор.
//Убрал проброс параметров, оставил только


class FormValidator {

    constructor(formsData, formElement) {
        this._formsData = formsData;
        this._formElement = formElement
    }

    //Метод для отображения ошибок и их скрытие
    _showInputError() {
        this._formError.classList.add(this._errorClass);
        this._formError.textContent = this._input.validationMessage;
        this._input.classList.add(this._inputErrorClass);
    }

    _hideInputError() {
        this._formError.classList.remove(this._errorClass);
        this._input.classList.remove(this._inputErrorClass);

    }

    //Публичные методы для управления состоянием Submit формы
    addSubmitDisabled() {
        this._submit.classList.add(this._buttonDisabledClass);
        this._submit.setAttribute('disabled', 'disabled')
    }

    _addSubmitActive() {
        this._submit.classList.remove(this._buttonDisabledClass);
        this._submit.removeAttribute("disabled");
    }


    //Метод проверки на валидность формы с изменениями стандартных фраз
    _isValid(input) {
        this._input = input;
        this._formError = this._form.querySelector(`.${this._input.id}-error`);
        if (!this._input.validity.valid) {
            if (this._input.validity.valueMissing) { this._input.setCustomValidity('Вы пропустили это поле.') } else
            if (this._input.validity.typeMismatch) { this._input.setCustomValidity('Введите адрес сайта.') } else { input.setCustomValidity('') }
            this._showInputError();
        } else {
            this._hideInputError();
        }
    }

    //Метод проверки валидности всех инпутов формы для переключения состояния submit
    _hasInvalidInput() {
        return this._inputs.some(item => !item.validity.valid)
    }


    //Метод переключения состояния submit
    _toggleSubmit() {
        this._hasInvalidInput() ? this.addSubmitDisabled() : this._addSubmitActive()
    }



    //Метод который выполняет валидацию формы и показывает ошибки
    enableValidation() {
        this._form = document.querySelector(this._formElement);
        this._inputs = Array.from(this._form.querySelectorAll(this._formsData.inputSelector));
        this._submit = this._form.querySelector(this._formsData.submitButtonSelector);
        this._errorClass = this._formsData.errorClass;
        this._inputErrorClass = this._formsData.inputErrorClass;
        this._buttonDisabledClass = this._formsData.inactiveButtonClass;

        this._form.addEventListener('submit', evt => evt.preventDefault());
        this._form.addEventListener('input', evt => {
            this._isValid(evt.target);
            this._toggleSubmit()
        })
    }

}

export { FormValidator }
