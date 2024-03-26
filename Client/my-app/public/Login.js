async function Get_Login_Data() {
    var Log_Email = document.getElementById("login_email").value;
    var Log_Password = document.getElementById("login_password").value;
    await axios.post('api/user/login', {
        EMail: Log_Email,
        Password: Log_Password
    }).then(function (response){

        localStorage.setItem("token",response.data.token);
        window.location.href = 'index.html?token='+response.data.token;
    })
        .catch(function (error){
        if(error.response){
            if (error.response.status===501){
                var messageDiv = document.createElement('div');
                messageDiv.textContent = 'Користувача не знайдено'; // Текст повідомлення
                messageDiv.style.position = 'fixed'; // Фіксована позиція, щоб повідомлення було поверх інших елементів
                messageDiv.style.top = '10%'; // Вертикальне центрування
                messageDiv.style.left = '50%'; // Горизонтальне центрування
                messageDiv.style.transform = 'translate(-50%, -50%)'; // Центрування відносно центра вікна
                messageDiv.style.backgroundColor = '#fff'; // Колір фону
                messageDiv.style.padding = '20px'; // Відступи
                messageDiv.style.border = '2px solid #000'; // Рамка
                messageDiv.style.zIndex = '9999'; // Встановлення високого значення z-index, щоб перекривати інші елементи
                messageDiv.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.5)'; // Тінь
                document.body.appendChild(messageDiv);
                setTimeout(function() {
                    document.body.removeChild(messageDiv);
                }, 3000);
            }
            else  if (error.response.status===502){
                var messageDiv = document.createElement('div');
                messageDiv.textContent = 'Пароль не підходить'; // Текст повідомлення
                messageDiv.style.position = 'fixed'; // Фіксована позиція, щоб повідомлення було поверх інших елементів
                messageDiv.style.top = '30%'; // Вертикальне центрування
                messageDiv.style.left = '50%'; // Горизонтальне центрування
                messageDiv.style.transform = 'translate(-50%, -50%)'; // Центрування відносно центра вікна
                messageDiv.style.backgroundColor = '#fff'; // Колір фону
                messageDiv.style.padding = '20px'; // Відступи
                messageDiv.style.border = '2px solid #000'; // Рамка
                messageDiv.style.zIndex = '9999'; // Встановлення високого значення z-index, щоб перекривати інші елементи
                messageDiv.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.5)'; // Тінь
                document.body.appendChild(messageDiv);
                setTimeout(function() {
                    document.body.removeChild(messageDiv);
                }, 3000);
            }
        }
    })
}
