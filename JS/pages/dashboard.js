const tabs = document.querySelectorAll(".tab");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        // Remove active class from all buttons
        tabs.forEach(btn => btn.classList.remove("active"));

        // Add active class to clicked button
        tab.classList.add("active");

    });
});