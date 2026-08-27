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

    tabOrganization: null, 

    search: ""
};

const emptyTableNotice = document.querySelector("#empty-table");

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

const searchInput = document.querySelector("#request-search");

//searchfunction
searchInput.addEventListener("input", function() {

    activeFilters.search = searchInput.value;

    applyAllFilters();

});

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

// statusFilter.forEach(function(option) {

//     option.addEventListener("click", function() {

//         const filterType = option.dataset.filter;
//         const filterValue = option.dataset.value;

//         applyFilter(filterType, filterValue);

//flagging this
tabOrganization.forEach(function(tab) {
    tab.addEventListener("click", function() {

        const filterType = tab.dataset.filter;
        const filterValue = tab.dataset.value;

        console.log("clicked a tab");
        applyFilter(filterType, filterValue);
    })
})

function applyFilter(filterType, filterValue) {
//if its status, run the filter by status function and pass the value of the button (pending, approved, rejected) to it

    activeFilters[filterType] = filterValue;
    console.log(filterType);
    console.log(filterValue);
    console.log(activeAccount)

    applyAllFilters();

}

function applyAllFilters() {

    const today = new Date();
    const todayString =
        today.getFullYear() + "-" +
        String(today.getMonth() + 1).padStart(2, "0") + "-" +
        String(today.getDate()).padStart(2, "0");

    filteredRequests = requests.filter(function(request) {

        //if there is something in the search bar run this function
        if (activeFilters.search !== "") {

            const searchTerm = activeFilters.search.toLowerCase();
        
            if (
                !request.requestID.toLowerCase().includes(searchTerm) &&
                !request.requestor.toLowerCase().includes(searchTerm) &&
                !request.approver.toLowerCase().includes(searchTerm) &&
                !request.purposeForTravel.toLowerCase().includes(searchTerm) &&
                !request.destination.toLowerCase().includes(searchTerm)
            ) {
                return false;
            }
        }

        //my requests filter
        if(activeFilters.tabOrganization !== null) {

            if (activeFilters.tabOrganization === "allRequests") {
                    emptyTableNotice.style.display = "none";
                    return true;
            }
            if (activeFilters.tabOrganization === "userRequests") {
                if (activeAccount === null) {
                    emptyTableNotice.style.display = "flex"
                }
                if (request.requestor !== activeAccount) {
                    return false;
                }
            } 
            if (activeFilters.tabOrganization === "userApproval") {
                if (activeAccount === null) {
                    emptyTableNotice.style.display = "flex"
                }
                if (request.approver !== activeAccount || request.status !== "Pending Approval") {
                    return false;
                }
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
//start date
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
//end date
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

//reset filterbutton
const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", () => {
    // Reset filter buttons
    activeFilters.status = null;
    activeFilters.startDate = null;
    activeFilters.endDate = null;
    activeFilters.estimatedCost = null;

    // Hide filter tags
    startDateTag.style.display = "none";
    endDateTag.style.display = "none";
    CostTag.style.display = "none";
    StatusTag.style.display = "none";

    // Re-run all filtering logic
    applyAllFilters();
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
            <td>${request.approver}</td>
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