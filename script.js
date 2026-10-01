const form = document.getElementById("registrationForm");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const userId = document.getElementById("userId");
const password = document.getElementById("password");
const address = document.getElementById("address");
const postalCode = document.getElementById("postalCode");
const city = document.getElementById("city");
const email = document.getElementById("email");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    clearErrors();

    let valid = true;

    if (firstName.value.trim() === "") {
        showError(firstName, "Etunimi on pakollinen.");
        valid = false;
    }

    if (lastName.value.trim() === "") {
        showError(lastName, "Sukunimi on pakollinen.");
        valid = false;
    }

    if (userId.value.trim() === "") {
        showError(userId, "Käyttäjä ID on pakollinen.");
        valid = false;
    } else if (userId.value.trim().length < 6) {
        showError(userId, "Käyttäjä ID:n pitää olla vähintään 6 merkkiä pitkä.");
        valid = false;
    }

    if (password.value === "") {
        showError(password, "Salasana on pakollinen.");
        valid = false;
    } else {
        const value = password.value;
        const hasNumber = /[0-9]/.test(value);
        const hasUppercase = /[A-ZÅÄÖ]/.test(value);
        const hasSpecialCharacter = /[!@£$€&%#]/.test(value);

        if (value.length < 6) {
            showError(password, "Salasanan pitää olla vähintään 6 merkkiä pitkä.");
            valid = false;
        } else if (!hasNumber) {
            showError(password, "Salasanassa pitää olla vähintään yksi numero.");
            valid = false;
        } else if (!hasUppercase) {
            showError(password, "Salasanassa pitää olla vähintään yksi iso kirjain.");
            valid = false;
        } else if (!hasSpecialCharacter) {
            showError(password, "Salasanassa pitää olla vähintään yksi erikoismerkki: ! @ £ $ € & % #");
            valid = false;
        }
    }

    if (address.value.trim() === "") {
        showError(address, "Katuosoite on pakollinen.");
        valid = false;
    }

    if (postalCode.value.trim() === "") {
        showError(postalCode, "Postinumero on pakollinen.");
        valid = false;
    } else if (!/^[0-9]{5}$/.test(postalCode.value.trim())) {
        showError(postalCode, "Postinumerossa pitää olla täsmälleen 5 numeroa.");
        valid = false;
    }

    if (city.value.trim() === "") {
        showError(city, "Postitoimipaikka on pakollinen.");
        valid = false;
    }

    if (email.value.trim() === "") {
        showError(email, "Sähköpostiosoite on pakollinen.");
        valid = false;
    } else if (!isValidEmail(email.value.trim())) {
        showError(email, "Anna kelvollinen sähköpostiosoite.");
        valid = false;
    }

    if (valid) {
        successMessage.textContent = "Lomake on täytetty oikein!";
    }
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input, message) {
    const errorElement = document.getElementById(input.id + "Error");
    errorElement.textContent = message;
    input.classList.add("input-error");
}

function clearErrors() {
    const inputs = [
        firstName, lastName, userId, password,
        address, postalCode, city, email
    ];

    inputs.forEach(function(input) {
        input.classList.remove("input-error");
    });

    document.querySelectorAll(".error").forEach(function(error) {
        error.textContent = "";
    });

    successMessage.textContent = "";
}
