    // Function to calculate and display the last updated time
    function calculateLastUpdatedTime() {
        const lastUpdatedElement = document.getElementById('last-updated');
        const lastUpdatedDateString = lastUpdatedElement.dataset.lastUpdated;
        const lastUpdatedDate = new Date(lastUpdatedDateString);
        const currentDate = new Date();

        // Calculate the difference in milliseconds between the current date and the last updated date
        const timeDifferenceMs = currentDate - lastUpdatedDate;

        // Convert the difference to days
        const daysDifference = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));

        // Display the last updated time
        lastUpdatedElement.innerText = `Last updated ${daysDifference} days ago`;
    }

    // Call the function to display the last updated time when the page loads
    calculateLastUpdatedTime();
