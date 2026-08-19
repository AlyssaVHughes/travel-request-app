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

let activeFilters = {
    status: null, 
    startDate: null, 
    endDate: null, 
    estimatedCost: null,

    myRequests: null,
    pendingMyApproval: null
};

//filtering requests
const statusFilter = document.querySelectorAll(".status-filter");
const tabOrganization = document.querySelectorAll(".tab");

const startDateTag = document.querySelector("#start-date-tag");
const startDateTagText = document.querySelector("#start-date-tag-text")

const endDateTag = document.querySelector("#end-date-tag");
const endDateTagText = document.querySelector("#end-date-tag-text")

const CostTag = document.querySelector("#cost-tag");
const CostTagText = document.querySelector("#cost-tag-text")

const StatusTag = document.querySelector("#status-tag");
const StatusTagText = document.querySelector("#status-tag-text");

//flagging this
tabOrganization.forEach(function(tab) {
    tab.addEventListener("click", function() {
        console.log("clicked a tab");
        applyFilter(filterType, filterValue);
    })
})

statusFilter.forEach(function(option) {

    option.addEventListener("click", function() {

        const filterType = option.dataset.filter;
        const filterValue = option.dataset.value;

        applyFilter(filterType, filterValue);

        if (filterValue === "startCurrent") { 
            startDateTagText.textContent =  "Start - Current Day";
            startDateTag.style.display = "flex";
        }
        if (filterValue === "startBefore") { 
            startDateTagText.textContent = "Start - Before Current Day";
            startDateTag.style.display = "flex";
        }
        if (filterValue === "startAfter") { 
            startDateTagText.textContent = "Start - After Current Day";
            startDateTag.style.display = "flex";
        }
        if (filterValue === "endCurrent") { 
            endDateTagText.textContent = "End - Current Day";
            endDateTag.style.display = "flex"
        }
        if (filterValue === "endBefore") { 
            endDateTagText.textContent = "End - Before Current Day";
            endDateTag.style.display = "flex"
        }
        if (filterValue === "endAfter") { 
            endDateTagText.textContent = "End - After Current Day";
            endDateTag.style.display = "flex"
        }
        if (filterValue === "over") { 
            CostTagText.textContent = "Cost - More Than $10,000";
            CostTag.style.display = "flex"
        }
        if (filterValue === "under") { 
            CostTagText.textContent = "Cost - Less Than $10,000";
            CostTag.style.display = "flex"
        }
        if (filterValue === "New Request") { 
            StatusTagText.textContent = "Status - New Request";
            StatusTag.style.display = "flex"
        }
        if (filterValue === "Pending Approval") { 
            StatusTagText.textContent = "Status - Pending Approval";
            StatusTag.style.display = "flex"
        }
        if (filterValue === "Approved") { 
            StatusTagText.textContent = "Status - Approved";
            StatusTag.style.display = "flex"
        }
        if (filterValue === "Rejected") { 
            StatusTagText.textContent = "Status - Rejected";
            StatusTag.style.display = "flex"
        }


    });

});

const filterTags = document.querySelectorAll(".filter-tag");
filterTags.forEach(function(tag) {

    const xIcon = tag.querySelector(".x-icon");

    xIcon.addEventListener("click", function() {

        const tagFilterType = tag.dataset.filter;

        if(tagFilterType === "status") {
            activeFilters.status = null; 
            StatusTag.style.display = "none"
        }

        if(tagFilterType === "estimatedCost") { 
            activeFilters.estimatedCost = null;
            CostTag.style.display = "none"
        }

        if(tagFilterType === "startDate") {
            activeFilters.startDate = null;
            startDateTag.style.display = "none"
        }

        if(tagFilterType === "endDate") { 
            activeFilters.endDate = null;
            endDateTag.style.display = "none"
        }
        applyAllFilters();
    });

});

function applyFilter(filterType, filterValue) {
//if its status, run the filter by status function and pass the value of the button (pending, approved, rejected) to it

    activeFilters[filterType] = filterValue;

    applyAllFilters();

    //old applyfilterlogic

    // if (filterType === "status") {
    //     filterByStatus(filterValue);
    // }
    // if (filterType === "endDate") {
    //     filterByEndDate(filterValue);
    // }
    // if (filterType === "startDate") {
    //     filterByStartDate(filterValue);
    // }
    // if (filterType === "estimatedCost") {
    //     filterByCost(filterValue);
    // }

}

function applyAllFilters() {

    const today = new Date();
    const todayString =
        today.getFullYear() + "-" +
        String(today.getMonth() + 1).padStart(2, "0") + "-" +
        String(today.getDate()).padStart(2, "0");

    filteredRequests = requests.filter(function(request) {

        //my requests filter
        if(activeFilters.myRequests !== null) {
            if (request.requestor !== "my username") {
                return false;
            }
        }

        // Status filter
        if (activeFilters.status !== null) {
            if (request.status !== activeFilters.status) {
                return false;
            }
        }

        // Cost filter
        if (activeFilters.estimatedCost !== null) {

            if (activeFilters.estimatedCost === "under") {
                if (request.estimatedCost >= 10000) {
                    return false;
                }
            }

            if (activeFilters.estimatedCost === "over") {
                if (request.estimatedCost < 10000) {
                    return false;
                }
            }
        }

        if (activeFilters.startDate !== null) {
            const requestStartDate = request.startDate

            if (activeFilters.startDate === "startBefore") {
                if (requestStartDate >= todayString) {
                    return false;
                }
            } 
            if (activeFilters.startDate === "startAfter") {
                if (requestStartDate <= todayString) {
                    return false;
                } 
            }
            if (activeFilters.startDate === "startCurrent") {
                if (requestStartDate !== todayString) {
                    return false;
                }
            }

        }

        if (activeFilters.endDate !== null) {
            const requestEndDate = request.endDate

            if (activeFilters.endDate === "endBefore") { 
                if (requestEndDate >= todayString) {
                    return false;
                }
            }
            if (activeFilters.endDate === "endAfter") { 
                if (requestEndDate <= todayString) { 
                    return false;
                }
            }
            if (activeFilters.endDate === "endCurrent") {
                if (requestEndDate !== todayString) {
                    return false;
                }
            }
        }

        return true;
    });

    currentPage = 1;
    displayPage();
} 
//old filter logic

// function filterByStatus(status) {

//     filteredRequests = filteredRequests.filter(function(request) {
//         return request.status === status;
//     });

//     currentPage = 1;
//     displayPage();

// }

// function filterByEndDate(endDate) {

//     const today = new Date();
    
//     const todayString =
//         today.getFullYear() + "-" +
//         String(today.getMonth() + 1).padStart(2, "0") + "-" +
//         String(today.getDate()).padStart(2, "0");

//     filteredRequests = filteredRequests.filter(function(request) {

//         const requestEndDate = request.endDate

//         if (endDate === "endBefore") {
//             return requestEndDate < todayString; 
//         } 
//         if (endDate === "endAfter") {
//             return requestEndDate > todayString; 
//         }
//         if (endDate === "endCurrent") {
//             return requestEndDate === todayString; 
//         }
//     }); 
//     currentPage = 1;
//     displayPage();
// }

// function filterByStartDate(startDate) {

//     const today = new Date();
    
//     const todayString =
//         today.getFullYear() + "-" +
//         String(today.getMonth() + 1).padStart(2, "0") + "-" +
//         String(today.getDate()).padStart(2, "0");

//     filteredRequests = filteredRequests.filter(function(request) {

//         const requestStartDate = request.startDate

//         if (startDate === "startBefore") {
//             return requestStartDate < todayString; 
//         } 
//         if (startDate === "startAfter") {
//             return requestStartDate > todayString; 
//         }
//         if (startDate === "startCurrent") {
//             return requestStartDate === todayString; 
//         }
//     }); 
//     currentPage = 1;
//     displayPage();
// }

// function filterByCost(cost) {

//     if (cost === "under") {
//         filteredRequests = filteredRequests.filter(function(request) {
//             return request.estimatedCost < 10000;
//         });
//     }

//     if (cost === "over") {
//         filteredRequests = filteredRequests.filter(function(request) {
//             return request.estimatedCost >= 10000;
//         })
//     }
//     currentPage = 1;
//     displayPage();
// }

//reset filterbutton
const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", () => {
    startDateTag.style.display = "none";
    endDateTag.style.display = "none";
    CostTag.style.display = "none";
    StatusTag.style.display = "none"
    filteredRequests = [...requests];
    currentPage = 1;
    displayPage();
});

//record pagination
const tableBody = document.querySelector("#request-table-body");
const pageNumber = document.querySelector("#page-number");

const rowsPerPage = 8; 
let currentPage = 1;

//function displays that page's records in the table
function displayPage() {

    tableBody.innerHTML = "";

    const totalPages = Math.ceil(filteredRequests.length / rowsPerPage);
    //*
    pageNumber.textContent = `${currentPage} of ${totalPages}`;

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

nextButton.addEventListener("click", () => {

    const totalPages = Math.ceil(filteredRequests.length / rowsPerPage);
    console.log("clicked next"); 

    if (currentPage < totalPages) {
        currentPage++;
        displayPage();
        pageNumber.textContent = `${currentPage} of ${totalPages}`;
    }

});

previousButton.addEventListener("click", () => {

    console.log("clicked previous"); 

    if (currentPage > 1) {
        currentPage--;
        displayPage();
        pageNumber.textContent = `${currentPage} of ${totalPages}`;
    }

});