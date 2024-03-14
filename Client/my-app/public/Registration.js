
async function registerUser() {
    try {
        const userData = await getRegisterData();
        if (userData.Error === 1) {
            const message = "Passwords do not match.";
            console.log(message);
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
            localStorage.setItem("token",response.data.token);
            window.location.href = 'Reg_sendCode.html?token='+response.data.token;
        })



    } catch (error) {
        console.error("Error registering user:", error.message);
    }
}

// Function to retrieve registration data from the form
async function getRegisterData() {
    const firstName = document.getElementById("first_name").value;
    const lastName = document.getElementById("last_name").value;
    const sex = document.getElementById("sex").value;
    const bDate = document.getElementById("dob").value;
    const telephone = document.getElementById("phone").value;
    const country = document.getElementById("country").value;
    const email = document.getElementById("signup_email").value;
    const firstPassword = document.getElementById("signup_password").value;
    const secondPassword = document.getElementById("confirm_password").value;

    let error_type_p = 0;
    if (firstPassword !== secondPassword) {
        error_type_p = 1;
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
        Error: error_type_p
    };
}
