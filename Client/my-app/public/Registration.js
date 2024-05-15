async function registerUser() {
    try {
        const userData = await getRegisterData();

        console.log(userData);

        if (userData.Error === 1) {
            const message = "Passwords do not match.";
            console.log(message);
            return;
        }

        // Видалення попередніх повідомлень про помилки
        clearErrorMessages();

        if (userData.errors.length > 0) {
            userData.errors.forEach(error => {
                console.error(error);

                // Отримання ID поля, яке спричинило помилку
                const fieldId = error.fieldId;
                // Отримання повідомлення про помилку
                const errorMessage = error.errorMessage;

                // Виведення повідомлення про помилку під відповідне поле
                document.getElementById("error_" + fieldId).textContent = errorMessage;
            });
            return;
        }

        await axios.post('api/user/registration', {
            firstName: userData.firstName,
            lastName: userData.lastName,
            sex: userData.sex,
            bDate: userData.bDate,
            telephone: userData.telephone,
            country: userData.country,
            email: userData.email,
            password: userData.password
        }).then(function (response){

            localStorage.setItem("token", response.data.token);
            window.location.href = 'Reg_sendCode.html?token=' + response.data.token;
        });

        

    } catch (error) {
        console.error("Error registering user:", error.message);
    }
}

// Function to retrieve registration data from the form
async function getRegisterData() {
    const firstName = document.getElementById("first_name").value;
    const lastName = document.getElementById("last_name").value;
    const sex = document.getElementById("male").value;
    const bDate = document.getElementById("dob").value;
    const telephone = document.getElementById("phone").value;
    const country = document.getElementById("country").value;
    const email = document.getElementById("signup_email").value;
    const firstPassword = document.getElementById("signup_password").value;
    const secondPassword = document.getElementById("confirm_password").value;

    let errors = [];

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push({ fieldId: "signup_email", errorMessage: "Invalid email address. Format: example@tag.tag" });
    }

    // Validate phone number
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(telephone)) {
        errors.push({ fieldId: "phone", errorMessage: "Invalid phone number. Please enter format like 096123456." });
    }

    // Validate password match
    if (firstPassword !== secondPassword) {
        errors.push({ fieldId: "confirm_password", errorMessage: "Passwords do not match." });
    }

    // Validate password complexity
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(firstPassword)) {
        errors.push({ fieldId: "signup_password", errorMessage: "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character(@$!%*?&)." });
    }

    return {
        firstName,
        lastName,
        sex,
        bDate,
        telephone,
        country,
        email,
        password: firstPassword,
        errors
    };
}

// Функція для видалення попередніх повідомлень про помилки
function clearErrorMessages() {
    const errorMessages = document.querySelectorAll('.error_message');
    errorMessages.forEach(errorMessage => {
        errorMessage.textContent = ''; // Очищення вмісту повідомлення про помилку
    });
}
