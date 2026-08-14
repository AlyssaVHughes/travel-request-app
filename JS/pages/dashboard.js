let filteredRequests = [...requests];
const tabs = document.querySelectorAll(".tab");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        // Remove active class from all buttons
        tabs.forEach(btn => btn.classList.remove("active"));

        // Add active class to clicked button
        tab.classList.add("active");

    });
});

//filter drodown visibility

const filterMenus = document.querySelectorAll(".filter-menu");

filterMenus.forEach(menu => {

    const button = menu.querySelector(".filter-button");

    button.addEventListener("click", (event) => {

        event.stopPropagation(); // Prevent the click from opening and immediately closing the menu

        // Close other menus
        filterMenus.forEach(otherMenu => {
            if (otherMenu !== menu) {
                otherMenu.classList.remove("open");
            }
        });

        // Toggle this menu
        menu.classList.toggle("open");
    });


    document.addEventListener("click", () => {

        filterMenus.forEach(menu => {
            menu.classList.remove("open");
        });
    
    });

});

//filtering requests
const statusFilter = document.querySelectorAll(".status-filter");

statusFilter.forEach(function(option) {

    option.addEventListener("click", function() {

        const filterType = option.dataset.filter;
        const filterValue = option.dataset.value;

        applyFilter(filterType, filterValue);

    });

});

function applyFilter(filterType, filterValue) {
//if its status, run the filter by status function and pass the value of the button (pending, approved, rejected) to it

    if (filterType === "status") {
        filterByStatus(filterValue);
    }
    if (filterType === "endDate") {
        filterByEndDate(filterValue);
    }
    if (filterType === "startDate") {
        filterByStartDate(filterValue);
    }
    if (filterType === "estimatedCost") {
        filterByCost(filterValue);
    }

}

function filterByStatus(status) {

    filteredRequests = requests.filter(function(request) {
        return request.status === status;
    });

    currentPage = 1;

    displayPage();

}

function filterByEndDate(endDate) {

    const today = new Date();
    
        // Create today's date as YYYY-MM-DD
    const todayString =
        today.getFullYear() + "-" +
        String(today.getMonth() + 1).padStart(2, "0") + "-" +
        String(today.getDate()).padStart(2, "0");

    filteredRequests = requests.filter(function(request) {

        const requestEndDate = request.endDate

        if (endDate === "before") {
            return requestEndDate < todayString; 
        } 
        if (endDate === "after") {
            return requestEndDate > todayString; 
        }
        if (endDate === "current") {
            return requestEndDate === todayString; 
        }
    }); 
    currentPage = 1;
    displayPage();
}

function filterByStartDate(startDate) {

    const today = new Date();
    
        // Create today's date as YYYY-MM-DD
    const todayString =
        today.getFullYear() + "-" +
        String(today.getMonth() + 1).padStart(2, "0") + "-" +
        String(today.getDate()).padStart(2, "0");

    filteredRequests = requests.filter(function(request) {

        const requestStartDate = request.startDate

        if (startDate === "before") {
            return requestStartDate < todayString; 
        } 
        if (startDate === "after") {
            return requestStartDate > todayString; 
        }
        if (startDate === "current") {
            return requestStartDate === todayString; 
        }
    }); 
    currentPage = 1;
    displayPage();
}

function filterByCost(cost) {

    if (cost === "under") {
        filteredRequests = requests.filter(function(request) {
            return request.estimatedCost < 10000;
        });
    }

    if (cost === "over") {
        filteredRequests = requests.filter(function(request) {
            return request.estimatedCost >= 10000;
        })
    }
    currentPage = 1;
    displayPage();
}


const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", () => {
    filteredRequests = [...requests];
    currentPage = 1;
    displayPage();
});

//record pagination
const tableBody = document.querySelector("#request-table-body");

const rowsPerPage = 8; 
let currentPage = 1;

//function displays that page's records in the table
function displayPage() {

    tableBody.innerHTML = "";

    const totalPages = Math.ceil(filteredRequests.length / rowsPerPage);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const pageRequests = filteredRequests.slice(startIndex, endIndex);

    pageRequests.forEach(request => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${request.requestID}</td>
            <td>${request.requestor}</td>
            <td>${request.destination}</td>
            <td>${request.startDate}</td>
            <td>${request.endDate}</td>
            <td>$${request.estimatedCost.toLocaleString()}</td>

            <td>
                <div class="status">
                    <img 
                        src="${request.statusIcon}" 
                        alt="" 
                        class="status-icon"
                    >
                    <span>${request.status}</span>
                </div>
            </td>

            <td>${request.purposeForTravel}</td>
        `;

        tableBody.appendChild(row);
    });
}

displayPage();


//change pages with buttons
const previousButton = document.querySelector("#previous-page");
const nextButton = document.querySelector("#next-page");
const pageNumber = document.querySelector("#page-number");

nextButton.addEventListener("click", () => {

    if (currentPage < totalPages) {
        currentPage++;
        displayPage();
        pageNumber.textContent = `${currentPage} of ${totalPages}`;
    }

});

previousButton.addEventListener("click", () => {

    if (currentPage > 1) {
        currentPage--;
        displayPage();
        pageNumber.textContent = `${currentPage} of ${totalPages}`;
    }

});