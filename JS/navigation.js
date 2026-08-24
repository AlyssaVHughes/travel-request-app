const buttons = document.querySelectorAll(".sidebar-button");

buttons.forEach(button => {
    button.addEventListener("click", () => {

        // Remove active class from all buttons
        buttons.forEach(btn => btn.classList.remove("active"));

        // Add active class to clicked button
        button.classList.add("active");

        const pageID = button.dataset.page;

        showPage(pageID);

    });
});

const sidebar = document.querySelector(".sidebar");
const sidebarHeader = document.querySelector(".sidebar-header");
const sidebarButton = document.querySelector(".sidebar-button");
const toggleBtn = document.querySelector(".sidebar-logo");
const approvalNotif = document.querySelector(".approval-notif");

toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    sidebarHeader.classList.toggle("collapsed");
    sidebarButton.classList.toggle("collapsed");
    approvalNotif.classList.toggle("collapsed");

    if (sidebar.classList.contains("collapsed")) {
        toggleBtn.src = "../Images/Icons/open_icon.png";
    } else {
        toggleBtn.src = "../Images/Icons/close_icon.png";
    }
});

//screen changes
function showPage(pageID) {

    const pages = document.querySelectorAll(".page-section");

    pages.forEach(function(page) {
        page.style.display = "none";
    });

    const selectedPage = document.querySelector("#" + pageID);

    selectedPage.style.display = "block";
}