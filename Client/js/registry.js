const input1 = document.querySelector('.input1');
const inputs = document.querySelectorAll('.input1');
const validChars = document.querySelector('.validChars');
const realName = document.querySelector('#nameInput');
const gender = document.querySelector('#gender');
const username = document.querySelector('#usernameInput');
const email = document.querySelector('#emailInput');
const password = document.querySelector('#passInput');
const confirmPassword = document.querySelector('#confirmPassInput');
const submitButton = document.querySelector('#submitButton');

const registered = document.querySelector('.registered');
const registrationForm = document.querySelector('.registrationForm');


function init() {
    submitButton.addEventListener('click', submitForm);
    inputs.forEach(input => addEventListener('change', validateForm));
}


function submitForm() {
    if (validateForm()) {
        registrationForm.classList.add('hidden')
        registered.classList.remove('hidden');
    };
}

function validateForm() {

    clearErrors();

    let valids = 0;

    valids += validateText(realName.value, 2, 20)
        ? valid(realName)
        : invalid(realName);

    valids += validateGender(gender)
        ? valid(gender)
        : invalid(gender);

    valids += validateText(username.value, 5, 20)
        ? valid(username)
        : invalid(username);

    valids += validateEmail(email)
        ? valid(email)
        : invalid(email);

    valids += validateText(password.value, 8, 100)
        ? valid(password)
        : invalid(password);

    valids += validateText(confirmPassword.value, 8, 100)
        ? valid(confirmPassword)
        : invalid(confirmPassword);


    return valids === 6;
}

function clearErrors() {
    const errors = document.querySelectorAll('.alert-validate');

    errors.forEach(function(error){
        error.classList.remove('alert-validate');
    });
}

function validateText(str, min, max) {
    if (!isNaN(min) && !isNaN(max)) {
        return str.length > min && str.length < max;
    }

    if (!isNaN(min)) {
        return str.length > min;
    }

    return false;
}

function validateGender(gender) {
    // const defaultGender = "Gender";

    if (gender.value.match("Gender")) {
        return false;
    } else {
        return true;
    }
}

function validateEmail(email) {
    var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.value.match(mailformat)) {
        return true;
    } else {
        return false;
    }
}

function valid(elem) {
    elem.parentNode.classList.remove('alert-validate');

    return true;
}

function invalid(elem) {
    elem.parentNode.classList.add('alert-validate');

    return false;
}

window.addEventListener('load', init);