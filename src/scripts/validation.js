
const showError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    const errorMessage = inputElement.validationMessage;

    inputElement.classList.add(config.inputErrorClass);
    errorElement.classList.add(config.inputErrorActiveClass);
    errorElement.textContent = errorMessage;
}

const hideError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    const errorMessage = inputElement.validationMessage;

    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.inputErrorActiveClass);
    errorElement.textContent = errorMessage;
}

const checkInputValidity = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
            inputElement.setCustomValidity('');
        }
        showError(formElement, inputElement, config);
    } else {
        hideError(formElement, inputElement, config);
    }
}

const setValidationInput = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonSubmitElement = formElement.querySelector(config.buttonSubmitSelector);
    toggleButtonDisable(buttonSubmitElement, inputList, config);
    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, config);
            toggleButtonDisable(buttonSubmitElement, inputList, config);
        })
    })
}

const hasInvalidInput = (inputList) => {
    return inputList.some(input => {
        return !input.validity.valid;
    })
}

const toggleButtonDisable = (buttonSubmitElement, inputList, config) => {
    if(hasInvalidInput(inputList)) {
        buttonSubmitElement.disabled = true;
        buttonSubmitElement.classList.add(config.buttonSubmitDisableClass);
    } else {
        buttonSubmitElement.disabled = false;
        buttonSubmitElement.classList.remove(config.buttonSubmitDisableClass);
    }
}

export const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach(form => {
        setValidationInput(form, config);
    })
}

export const clearValidation = (formElement, configValidation) => {
    const inputList = Array.from(formElement.querySelectorAll(configValidation.inputSelector));
    const buttonSubmitElement = formElement.querySelector(configValidation.buttonSubmitSelector);
    buttonSubmitElement.disabled = true;
    buttonSubmitElement.classList.add(configValidation.buttonSubmitDisableClass);
    inputList.forEach(inputElement => {
        hideError(formElement, inputElement, configValidation);
    })
}