const title = document.querySelector('.wtitle');
    const cards = document.querySelectorAll('.wcard');
    const carousel = document.getElementById('carousel');
    let currentIndex = 0;

    function updateTitle() {
      title.textContent = cards[currentIndex].getAttribute('data-title');

      // Remove highlight from all cards
      cards.forEach(card => card.classList.remove('highlight'));

      // Highlight the current card
      cards[currentIndex].classList.add('highlight');
    }

    function moveCarousel() {
      currentIndex++;
      // Move the carousel
      carousel.style.transform = `translateX(-${currentIndex * (200 + 30)}px)`;

      // Check if we've moved past the original cards
      if (currentIndex >= cards.length / 2) {
        currentIndex = 0; // Reset the index
        carousel.style.transition = 'none'; // Disable transition for immediate jump
        carousel.style.transform = `translateX(0)`; // Jump back to the start
        requestAnimationFrame(() => {
          carousel.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
        });
      }
      updateTitle();
    }

    function hoverTitle(event) {
      const cardTitle = event.currentTarget.getAttribute('data-title');
      title.textContent = cardTitle; // Update title on hover

      // Remove highlight from all cards
      cards.forEach(card => card.classList.remove('highlight'));

      // Highlight the hovered card
      const hoveredCard = Array.from(cards).find(card => card.getAttribute('data-title') === cardTitle);
      if (hoveredCard) {
        hoveredCard.classList.add('highlight');
      }
    }

    cards.forEach(card => {
      card.addEventListener('mouseenter', hoverTitle);
      card.addEventListener('mouseleave', updateTitle); // Reset title when mouse leaves
    });

    setInterval(moveCarousel, 4000); // Change every 3 seconds
    updateTitle(); // Initial title update