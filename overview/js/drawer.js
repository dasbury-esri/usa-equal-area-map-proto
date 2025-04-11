document.addEventListener("DOMContentLoaded", () => {
    // Check if mainView is defined and accessible
    if (typeof window.mainView === "undefined") {
        console.error("mainView is not defined. Ensure map2.js is loaded and mainView is attached to the window object.");
    } else {
        console.log("mainView is available:", window.mainView);
    }
    const toggleButton = document.getElementById("drawer-toggle");
    const drawerContainer = document.getElementById("drawer-container");

    if (!toggleButton || !drawerContainer) {
        console.error("Toggle button or drawer container not found.");
        return;
    }

    // Wait for mainView to be ready
    if (window.mainViewReady) {
        window.mainViewReady.then((mainView) => {
        console.log("mainView is available:", mainView);
                toggleButton.addEventListener("click", () => {
                    console.log("Toggle button clicked"); // Debugging log
                    // Toggle the "drawer-open" and "drawer-closed" classes
                    if (drawerContainer.classList.contains("drawer-closed")) {
                        drawerContainer.classList.remove("drawer-closed");
                        drawerContainer.classList.add("drawer-open");
                        // Update the center point of the mainView map
                        if (typeof mainView !== "undefined") {
                            mainView.goTo({
                                center: [-115, 36], // Example center point (longitude, latitude)
                                zoom: 4 // Optional: Adjust zoom level
                            }).then(() => {
                                console.log("mainView center updated to [-120, 40]");
                            }).catch((error) => {
                                console.error("Error updating mainView center:", error);
                            });
                        }
                    } else {
                        drawerContainer.classList.remove("drawer-open");
                        drawerContainer.classList.add("drawer-closed");
                        // Optionally reset the center point of the mainView map
                        if (typeof mainView !== "undefined") {
                            mainView.goTo({
                                center: [-97, 38], // Reset to original center point
                                zoom: 5 // Optional: Adjust zoom level
                            }).then(() => {
                                console.log("mainView center reset to [-97, 38]");
                            }).catch((error) => {
                                console.error("Error resetting mainView center:", error);
                            });
                        }
                    }
                    console.log("Current classes on drawer-container:", drawerContainer.className); // Log current classes
                });
        }).catch((error) => {
            console.error("Error waiting for mainView:", error);
        });
    } else {
        console.error("mainViewReady Promise is not defined. Ensure map2.js is loaded.");
        }
});
