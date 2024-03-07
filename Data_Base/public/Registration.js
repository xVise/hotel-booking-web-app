
const axios=require("axios")
class  RegistrationLogic {
    async registerUser() {
        var userData = getRegisterData();
        console.log(userData)
        if (userData) {
            try {
                axios({
                    method: 'post',
                    url: '/auth/registration?firstName=123',
                    data: {
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        sex: userData.sex,
                        bDate: userData.bDate,
                        telephone: userData.telephone,
                        country: userData.country,
                        email: userData.email,
                        password: userData.password
                    }
                });
                // const response = await axios.post('/auth/registration', {
                //     params:{firstName:userData.firstName,
                //         lastName:userData.lastName,
                //         sex:userData.sex,
                //         bDate:userData.bDate,
                //         telephone:userData.telephone,
                //         country:userData.country,
                //         email:userData.email,
                //         password:userData.password
                //     }
                //
                // });
            } catch (error) {
                console.error(error);
            }
        }
    }

    function

    getRegisterData() {
        var firstName = document.getElementById("first_name").value;
        var lastName = document.getElementById("last_name").value;
        var sex = document.getElementById("sex").value;
        var bDate = document.getElementById("dob").value;
        var telephone = document.getElementById("phone").value;
        var country = document.getElementById("country").value;
        var email = document.getElementById("signup_email").value;
        var firstPassword = document.getElementById("signup_password").value;
        var secondPassword = document.getElementById("confirm_password").value;
        if (firstPassword !== secondPassword) {
            var message = "Passwords do not match.";
            alert(message);
            return null;
        }
        var userData = {
            firstName: firstName,
            lastName: lastName,
            sex: sex,
            bDate: bDate,
            telephone: telephone,
            country: country,
            email: email,
            password: firstPassword
        };
        return userData;
    }
}

module.exports=new RegistrationLogic()