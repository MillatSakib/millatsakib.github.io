document.addEventListener("DOMContentLoaded", function () {
    const lineHeight = 20; // Adjust this value to match your line height
    const linesPerScroll = 2; // Number of lines to scroll per scroll event
    let scrolling = false; // Track if scrolling is already in progress
  
    const cardTextElements = document.querySelectorAll(".card-text");
  
    cardTextElements.forEach(function (element) {
      const cardText = element.textContent.trim();
      const linesToShow = Math.ceil(cardText.length / lineHeight);
  
      if (linesToShow > linesPerScroll) {
        element.classList.add("scrollable");
  
        element.addEventListener("wheel", function (event) {
          if (!scrolling) { // Only trigger the scroll if not currently scrolling
            scrolling = true;
            const direction = event.deltaY > 0 ? 1 : -1;
            smoothScroll(element, direction * linesPerScroll * lineHeight);
            event.preventDefault();
  
            // Reset scrolling state after a brief delay
            setTimeout(() => {
              scrolling = false;
            }, 300);
          }
        });
      }
    });
  });
  
  function smoothScroll(element, amount) {
    const duration = 50; // Duration of the smooth scroll in milliseconds
    const startTime = performance.now();
    const startPosition = element.scrollTop;
    const targetPosition = startPosition + amount;
  
    function scrollFrame(timestamp) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);
      const newPosition = startPosition + (targetPosition - startPosition) * easedProgress;
  
      element.scrollTop = newPosition;
  
      if (progress < 1) {
        requestAnimationFrame(scrollFrame);
      }
    }
  
    requestAnimationFrame(scrollFrame);
  }
  
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }
  