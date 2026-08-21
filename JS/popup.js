
let signedIn = false;
let activeAccount = null;

const signInButton = document.querySelector("#signInButton");
const popupArea = document.querySelector("#signInArea");
const popupX = document.querySelector("#closePopup");

const forgotPassword = document.querySelector("#forgot-password")
const popupHeader = document.querySelector("#popupHeader");
const popupSubheader = document.querySelector("#popupSubheader");
const usernameInputField = document.querySelector("#username-input");

const createAccountRedirect = document.querySelector("#createAccount-redirect");
const signin = document.querySelector("#signin");
const createAccount = document.querySelector("#createAccount");
const signinRedirect = document.querySelector("#signin-redirect");

signInButton.addEventListener("click", openPopup);
popupX.addEventListener("click", closePopup);
createAccountRedirect.addEventListener("click", createView);
signinRedirect.addEventListener("click", signInView);

function openPopup() {
    popupArea.style.display = "flex"
}

function closePopup() {
    popupArea.style.display = "none"
}

function createView() {
    popupHeader.textContent = "Create an Account"
    popupSubheader.textContent = "Create an account to submit requests and organize travel plans"
    usernameInputField.style.display = "flex"
    createAccountRedirect.style.display = "none"
    signin.style.display = "none"
    signinRedirect.style.display ="flex"
    createAccount.style.display="flex" 
    forgotPassword.style.display="none"
}

function signInView() {
    popupHeader.textContent = "Sign In"
    popupSubheader.textContent = "Sign in to view and edit your travel requests and access personal analytics"
    usernameInputField.style.display = "none"
    createAccountRedirect.style.display = "flex"
    signin.style.display = "flex"
    signinRedirect.style.display ="none"
    createAccount.style.display="none" 
    forgotPassword.style.display="flex" 
}

const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

createAccount.addEventListener("click", createAccountData);

//add some parameters to prevent empty submissions, etc.
function createAccountData() { 

    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    const newAccount = {
        username: username, 
        email: email, 
        password: password
    };

    accounts.push(newAccount); 

    console.log(accounts);

}

signin.addEventListener("click", signInData); 

function signInData() { 

    const email = emailInput.value;
    const password = passwordInput.value;
    
    //create a for loop to check every object in the array for a match
     for (let i = 0; i < accounts.length; i++) {

        if (
            accounts[i].email === email && 
            accounts[i].password === password
        ) {
            console.log("Account found");
            activeAccount = accounts[i].username;
            signedIn = true;
            popupArea.style.display = "none";
            updateSignInButton();
            applyAllFilters();
            return;
        };

     }
     console.log("account not found");
    
}
const accountLabel = document.querySelector("#account-label")

function updateSignInButton() {
    if (signedIn === true) {
        accountLabel.textContent = activeAccount;
    } else { 
        accountLabel.textContent = "Sign In"
    }
}