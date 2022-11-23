// Main functions
function togglePopUp(popupID) {
    let popup = document.getElementById(popupID);
    if (popup.classList.contains("active")) {
        popup.classList.remove("active");
    } else {
        popup.classList.add("active");
    }
}

function goBack(popupID1, popupID2) {
    let popup1 = document.getElementById(popupID1);
    let popup2 = document.getElementById(popupID2);

    popup1.classList.remove("active");
    popup2.classList.add("active");
}

function closeSession() {
    path = window.location.href
    var newStr = path.slice(0, 21)
    location.replace(newStr)
}

// // Cazador page functions
// let toggle = document.querySelector(".toggle");
// let navigation = document.querySelector(".navigation");
// let main = document.querySelector(".main");

// toggle.onclick = function() {
//     navigation.classList.toggle("active");
//     main.classList.toggle("active");
// }

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