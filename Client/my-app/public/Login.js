async function Get_Login_Data() {
    var Log_Email = document.getElementById("login_email").value;
    var Log_Password = document.getElementById("login_password").value;
    try {
        var response = await axios.post('api/user/login', {
            EMail: Log_Email,
            Password: Log_Password
        });
        console.log(response);
        localStorage.setItem("token", response.data.token);
        window.location.href = 'index.html?token='+ response.data.token;
        
    } catch (error) {
        if (error.response) {
            var errorMessage = '';
            if (error.response.status === 501) {
                errorMessage = 'Користувача не знайдено';
            } else if (error.response.status === 502) {
                errorMessage = 'Пароль не підходить';
            }
            if (errorMessage !== '') {
                displayErrorMessage(errorMessage);
            }
        }
    }
}

function displayErrorMessage(message) {
    var messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '30%';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translate(-50%, -50%)';
    messageDiv.style.backgroundColor = '#fff';
    messageDiv.style.padding = '20px';
    messageDiv.style.border = '2px solid #000';
    messageDiv.style.zIndex = '9999';
    messageDiv.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.5)';
    document.body.appendChild(messageDiv);
    setTimeout(function() {
        document.body.removeChild(messageDiv);
    }, 3000);
}
