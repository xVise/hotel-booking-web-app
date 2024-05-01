// Assuming the rest of the HTML structure is correct and the form elements exist

const formOpenBtn = document.querySelector("#form-open");
const home = document.querySelector(".home");
const formContainer = document.querySelector(".form_container");
const formCloseBtn = document.querySelector(".form_close");
const signupBtn = document.querySelector("#signup");
const loginBtn = document.querySelector("#login");
const pwShowHide = document.querySelectorAll(".pw_hide");

// Function to show the form
function showForm() {
    home.classList.add("show");
}

// Function to hide the form
function hideForm() {
    home.classList.remove("show");
}

// Function to switch to the signup form
function switchToSignup() {
    formContainer.classList.add("active");
}

// Function to switch to the login form
function switchToLogin() {
    formContainer.classList.remove("active");
}

// Event listener for the form open button
formOpenBtn.addEventListener("click", showForm);

// Event listener for the form close button
formCloseBtn.addEventListener("click", hideForm);

// Event listener for password show/hide icons
pwShowHide.forEach((icon) => {
    icon.addEventListener("click", () => {
        let getPwInput = icon.parentElement.querySelector("input");
        if (getPwInput.type === "password") {
            getPwInput.type = "text";
            icon.classList.replace("uil-eye-slash", "uil-eye");
        } else {
            getPwInput.type = "password";
            icon.classList.replace("uil-eye", "uil-eye-slash");
        }
    });
});

// Event listener for the signup button
signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    switchToSignup();
});

// Event listener for the login button
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    switchToLogin();
});

// Ensure the form is hidden by default
hideForm();
document.addEventListener('DOMContentLoaded', function() {
    // Отримуємо URL
    var urlParams = new URLSearchParams(window.location.search);
    // Перевіряємо, чи присутній токен
    const token = urlParams.get('token');
    console.log(token);
    if (urlParams.has('token')) {
        // Видаляємо елемент з id "form-open"
        var formOpenButton = document.getElementById('form-open');
        if (formOpenButton) {
            formOpenButton.remove();
        }
        // Додаємо вашу потрібну структуру замість кнопки
        var nav = document.querySelector('.nav');
        
        if (nav) {
            var profileLink = document.createElement('a');
            profileLink.href = 'user.html?token='+token;
            profileLink.classList.add('profile_icon');

            var userIcon = document.createElement('i');
            userIcon.classList.add('uil', 'uil-user-circle');

            profileLink.appendChild(userIcon);
            nav.appendChild(profileLink);
        }
        // Додаємо CSS правило для приховування елемента з класом .profile_icon
        var style = document.createElement('style');
        style.innerHTML = '.profile_icon { display: flex; }';
        document.head.appendChild(style);
    }
});

$('input[name="dates"]').daterangepicker();

const rightArrow = document.querySelector(".scrollable-tabs-container .right-arrow svg");
const tabsList = document.querySelector(".scrollable-tabs-container ul");
const leftArrow = document.querySelector(".scrollable-tabs-container .left-arrow svg");
const leftArrowContainer = document.querySelector(".scrollable-tabs-container .left-arrow ");
const rightArrowContainer = document.querySelector(".scrollable-tabs-container .right-arrow ");

const manageIcons = () => {
    if (tabsList.scrollLeft >= 20){
        leftArrowContainer.classList.add("active");
    }else{
        leftArrowContainer.classList.remove("active");
    }
    let maxScrollValue = tabsList.scrollWidth - tabsList.clientWidth - 20;
    console.log("scroll width: ", tabsList.scrollWidth);
    console.log("client width: ", tabsList.clientWidth);

    if (tabsList.scrollLeft >= maxScrollValue) {
        rightArrowContainer.classList.remove("active");
    }else{
        rightArrowContainer.classList.add("active");
    }
}

rightArrow.addEventListener("click", () =>{
    tabsList.scrollLeft += 400;
    manageIcons();
} );

tabsList.addEventListener("scroll", manageIcons);

leftArrow.addEventListener("click", () =>{

    tabsList.scrollLeft -= 400;
} );

