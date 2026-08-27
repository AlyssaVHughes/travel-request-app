const submitForm = document.querySelector("#submit-form");
const saveForm = document.querySelector("#save-form");

const normalInputs = document.querySelectorAll(".form-input");
const textArea = document.querySelectorAll(".form-input-area");

const formInputs = [...normalInputs, ...textArea];

    submitForm.addEventListener("click", () => {

        let allFieldsFilled = true;
    
        formInputs.forEach(function(input) {
    
            if (input.value.trim() === "") {
                allFieldsFilled = false;
            }
        });
    
        if (allFieldsFilled === true) {
            console.log("All fields are filled!");
            highlightEmpty();

            const newID = "TR-" + String(requests.length + 1).padStart(3, "0");
            const buttons = document.querySelectorAll(".sidebar-button");
            const dashboardButton = document.querySelector("#dash-nav");
            
            const newRequest = {
                requestID: newID,
                requestor: document.querySelector("#requestor").value,
                approver: document.querySelector("#approver").value,
                destination: document.querySelector("#destination").value,
                startDate: document.querySelector("#start-date").value,
                endDate: document.querySelector("#end-date").value,
                estimatedCost: Number(document.querySelector("#estimated-cost").value),
                status: "New Request",
                statusIcon: "../images/icons/yellow_status.png",
                purposeForTravel: document.querySelector("#purpose-of-travel").value
            };
        
            requests.push(newRequest);

            showPage("dashboard-section");

            buttons.forEach(button => {

                // Remove active class from all buttons
                buttons.forEach(btn => btn.classList.remove("active"));
        
                dashboardButton.classList.add("active");
        
            });
        
            console.log("New request:", newRequest);
            console.log("All requests:", requests);
    
        } else {
            console.log("Please fill out all fields.");
            highlightEmpty();
        }

});

function highlightEmpty() {

    formInputs.forEach(function(input) {

        if (input.value.trim() === "") {
            input.style.border = ".5px solid red";
        } else {
            input.style.border = "";
        }

    });

}

function resetHighlight() {

    formInputs.forEach(function(input) { 
        input.style.border = ""
    });

}

function resetForm() {

    formInputs.forEach(function(input) {
        input.value = "";
        input.classList.remove("input-error");
    });

}
