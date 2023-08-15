
    // Function to animate the progress bars
    function animateProgressBar(progressBar, targetPercentage) {
        // Set the initial percentage to 0%
        let currentPercentage = 0;

        // Update the progress bar width and text with animation
        const animationInterval = setInterval(() => {
            if (currentPercentage < targetPercentage) {
                currentPercentage++;
                progressBar.style.width = `${currentPercentage}%`;
                progressBar.textContent = `${currentPercentage}%`;
            } else {
                clearInterval(animationInterval);
            }
        }, 20); // Adjust the animation speed as needed (smaller values mean faster animation)
    }

    // Call the animateProgressBar function for each progress bar
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');

        // Loop through each progress bar
        progressBars.forEach(progressBar => {
            const targetPercentage = parseInt(progressBar.parentNode.getAttribute('data-progress'), 10);

            // Call the animateProgressBar function with the target percentage
            animateProgressBar(progressBar, targetPercentage);
        });
    }

    // Call the animateProgressBars function when the user scrolls to the progress bar section
    function onScrollToSkills() {
        const skillsSection = document.getElementById('skills');
        const rect = skillsSection.getBoundingClientRect();

        // Check if the element is visible on the screen
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            animateProgressBars();
            window.removeEventListener('scroll', onScrollToSkills); // Remove the scroll event listener after animation
        }
    }

    // Attach the scroll event listener to trigger the animation when the user views the progress bar section
    window.addEventListener('scroll', onScrollToSkills);
