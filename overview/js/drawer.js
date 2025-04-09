document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("drawer-toggle");
    const drawerContainer = document.getElementById("drawer-container");

    if (!toggleButton || !drawerContainer) {
        console.error("Toggle button or drawer container not found.");
        return;
    }

    toggleButton.addEventListener("click", () => {
        console.log("Toggle button clicked"); // Debugging log
        // Toggle the "drawer-open" and "drawer-closed" classes
        if (drawerContainer.classList.contains("drawer-closed")) {
            drawerContainer.classList.remove("drawer-closed");
            drawerContainer.classList.add("drawer-open");
        } else {
            drawerContainer.classList.remove("drawer-open");
            drawerContainer.classList.add("drawer-closed");
        }
        console.log("Current classes on drawer-container:", drawerContainer.className); // Log current classes
    });
});