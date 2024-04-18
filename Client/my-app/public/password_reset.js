async function Get_Email_for_Cod() {
    var Get_Email = document.getElementById("user_email_code").value;
    await axios.post('/api/user/Email_code', {
        EMail: Get_Email
    }).then(async function (response) {
        console.log(response)
        if (response.data === "Ok") {
            await axios.post("/api/user/Code",{
                EMail:Get_Email
            }).then(function (response){
                localStorage.setItem("token",response.data.token);
                window.location.href = 'sendcode.html?token='+response.data.token;
            })


        } else {
            console.log("Error")
        }
    })
        .catch(function (error) {
            if (error.response) {
                if (error.response.status === 501) {
                    var messageDiv = document.createElement('div');
                    messageDiv.textContent = 'Користувача не знайдено'; // Текст повідомлення
                    messageDiv.style.position = 'fixed'; // Фіксована позиція, щоб повідомлення було поверх інших елементів
                    messageDiv.style.top = '23%'; // Вертикальне центрування
                    messageDiv.style.left = '50%'; // Горизонтальне центрування
                    messageDiv.style.transform = 'translate(-50%, -50%)'; // Центрування відносно центра вікна
                    messageDiv.style.backgroundColor = '#ffcccc'; // Колір фону
                    messageDiv.style.padding = '20px'; // Відступи
                    messageDiv.style.border = '2px solid #ff0000'; // Рамка
                    messageDiv.style.zIndex = '9999'; // Встановлення високого значення z-index, щоб перекривати інші елементи
                    messageDiv.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.5)'; // Тінь
                    document.body.appendChild(messageDiv);
                    setTimeout(function () {
                        document.body.removeChild(messageDiv);
                    }, 3000);
                }
            }

        })
}
