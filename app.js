// Main functions
function togglePopUp(popupID) {
    console.log("Se apreto")
    let popup = document.getElementById(popupID);
    if (popup.classList.contains("active")) {
        popup.classList.remove("active");
    } else {
        popup.classList.add("active");
    }
}

// Cazador page functions
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function() {
    navigation.classList.toggle("active");
    main.classList.toggle("active");
}

let list = document.querySelectorAll(".navigation li");

function activeLink() {
    list.forEach((item) =>
        item.classList.remove("hovered"));
    this.classList.add("hovered");
}

// Talento page functtions
function showOptions() {
    document.getElementById("propose-new").style.display = "block";
}

function hideOptions() {
    document.getElementById("propose-new").style.display = "none";
}