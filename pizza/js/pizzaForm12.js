window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#create-account-form');
    const userNameInput = document.querySelector('#username');
    const phoneInput = document.querySelector('#phone');
    const emailInput = document.querySelector('#email');

    form.addEventListener('submit', (event) => {
        //event.preventDefault();
        validateForm();

        if (isFormValid() == true) {
            form.submit()
        } else {
            event.preventDefault();
        }
    });

    function isFormValid() {
        const inputContainers = form.querySelectorAll('.input-group');
        let result = true;
        inputContainers.forEach((container) => {
            if (container.classList.contains('error-input')) {
                result = false;
            }
        });
        //return result;
        if (result) {
            document.location.href = "./thank-you.html"
        }
    }

    function validateForm() {
        //username
        if (userNameInput.value.trim() == "") {
            setError(userNameInput, "Ім'я не може бути порожнім");
        } else if (userNameInput.value.trim().length < 2 || userNameInput.value.trim().length > 20) {
            setError(userNameInput, "Ім'я має бути min 2 max 20 символів");
        } else if (isUserNameValid(userNameInput.value)){
            setSuccess(userNameInput);
        } else {
            setError(userNameInput, `Введіть правильне ім'я`);
        }
        //phone
        if (phoneInput.value.trim() == '') {
            setError(phoneInput, 'Введіть телефонний номер');
        } else if (isPhoneValid(phoneInput.value)) {
            setSuccess(phoneInput);
        } else {
            setError(phoneInput, 'Введіть правильний телефонний номер');
        }
        //email
        if (emailInput.value.trim() == '') {
            setError(emailInput, 'Введіть електронну адресу');
        } else if (isEmailValid(emailInput.value)) {
            setSuccess(emailInput);
        } else {
            setError(emailInput, 'Введіть правильну електронну адресу');
        }
    }

    //error
    function setError(element, errorMessage) {
        const parent = element.parentElement;
        if (parent.classList.contains('success-input')) {
            parent.classList.remove('success-input');
        }
        parent.classList.add('error-input');
        const paragraph = parent.querySelector('p');
        paragraph.textContent = errorMessage;
    }

    //success
    function setSuccess(element) {
        const parent = element.parentElement;
        if (parent.classList.contains('error-input')) {
            parent.classList.remove('error-input');
        }
        parent.classList.add('success-input');
    }

    //regExp
    function isEmailValid(email) {
        const regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regEmail.test(email);
    }

    function isPhoneValid(phone) {
        const regPhone = /^\+380[0-9]{9}$/i;
        return regPhone.test(phone);
    }

    function isUserNameValid(name){
        const regName = /^[a-zA-Zа-яА-ЯЇїІі'][a-zA-Zа-яА-ЯЇїІі' ]+[a-zA-Zа-яА-ЯЇїІі']?$/;
        return regName.test(name);
    }

})