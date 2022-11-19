// Home page functions
function toggleLogIn() {
    let popup = document.getElementById("form-bg-log-in");
    if (popup.classList.contains("active")) {
        popup.classList.remove("active");
    } else {
        popup.classList.add("active");
    }
}

function toggleSignUp() {
    let popup = document.getElementById("form-bg-sign-up");
    if (popup.classList.contains("active")) {
        popup.classList.remove("active");
    } else {
        popup.classList.add("active");
    }
}

// Cazador page functions
let toggle = document.querySelector('.toggle');
let navigation = document.querySelector('.navigation');
let main = document.querySelector('.main');

toggle.onclick = function() {
    navigation.classList.toggle('active');
    main.classList.toggle('active');
}

let list = document.querySelectorAll('.navigation li');

function activeLink() {
    list.forEach((item) =>
        item.classList.remove('hovered'));
    this.classList.add('hovered');
}
list.forEach((item) =>
    item.addEventListener('mouseover', activeLink));