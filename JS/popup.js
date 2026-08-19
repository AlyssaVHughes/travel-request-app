const signInButton = document.querySelector("#signInButton");
const popupArea = document.querySelector("#signInArea");
const popupX = document.querySelector("#closePopup");

signInButton.addEventListener("click", openPopup);
popupX.addEventListener("click", closePopup);

function openPopup() {
    popupArea.style.display = "flex"
}

function closePopup() {
    popupArea.style.display = "none"
}