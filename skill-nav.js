
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-js-skill");
    const tabContentDivs = document.querySelectorAll("#tab-content-skill > div");

    navLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            const tabName = this.dataset.tab;
            tabContentDivs.forEach((tabContentDiv) => {
                if (tabContentDiv.id === `${tabName}-tab-content`) {
                    tabContentDiv.style.display = "flex";
                } else {
                    tabContentDiv.style.display = "none";
                }
            });

            navLinks.forEach((navLink) => {
                navLink.classList.remove("active");
            });
            this.classList.add("active");
        });
    });
});
