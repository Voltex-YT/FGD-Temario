    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const counter = document.getElementById('counter');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function updateSlideDisplay() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });

        counter.textContent = `Diapositiva ${currentSlide + 1} de ${slides.length}`;
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === slides.length - 1;
    }

    function changeSlide(direction) {
        currentSlide += direction;
        if (currentSlide < 0) currentSlide = 0;
        if (currentSlide >= slides.length) currentSlide = slides.length - 1;
        updateSlideDisplay();
    }

    // Navegación con teclado (Flechas y Espacio)
    document.addEventListener('keydown', (e) => {
        // Previene el scroll por defecto cuando presionas la barra espaciadora
        if (e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            changeSlide(1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        } else if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        }
    });

    // ==========================================
    // SOPORTE PARA GESTOS TÁCTILES (SWIPE EN MÓVILES)
    // ==========================================
    let touchStartX = 0;
    let touchEndX = 0;
    const presentationContainer = document.querySelector('.presentation-container');

    presentationContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    presentationContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50; // Mínimo de píxeles recorridos para considerar un deslizado
    if (touchStartX - touchEndX > swipeThreshold) {
        // Deslizar a la izquierda -> Siguiente diapositiva
        changeSlide(1);
    } else if (touchEndX - touchStartX > swipeThreshold) {
        // Deslizar a la derecha -> Diapositiva anterior
        changeSlide(-1);
    }
    
}