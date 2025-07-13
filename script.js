document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.image-gallery img');
    let currentImageIndex = 0;

    function showNextImage() {
        images[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].classList.add('active');
    }

    // Initially show the first image
    if (images.length > 0) {
        images[currentImageIndex].classList.add('active');
    }

    // Change image every 3 seconds
    setInterval(showNextImage, 3000);

    const playMusicButton = document.getElementById('playMusicButton');
    const backgroundMusic = document.getElementById('backgroundMusic');

    if (playMusicButton && backgroundMusic) {
        playMusicButton.addEventListener('click', () => {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                playMusicButton.textContent = 'إيقاف الموسيقى'; // Pause music
            } else {
                backgroundMusic.pause();
                playMusicButton.textContent = 'تشغيل الموسيقى'; // Play music
            }
        });
    }

    // Confetti animation
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        const colors = ['#ff69b4', '#ffd700', '#ffb6c1', '#dda0dd', '#ffebcd']; // Updated colors from CSS
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = Math.random() * 2 + 4 + 's'; // 4 to 6 seconds
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.opacity = Math.random() * 0.7 + 0.3; // 0.3 to 1.0 opacity
        confetti.style.transform = `scale(${Math.random() * 0.8 + 0.2})`; // 0.2 to 1.0 scale
        document.body.appendChild(confetti);

        // Remove confetti after animation to prevent DOM bloat
        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    }

    // Continuously create confetti
    setInterval(createConfetti, 500); // Reduced frequency to every 500ms for stability

    // Falling Petals animation
    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        const colors = ['#ffc0cb', '#ffe0b2', '#e0b2ff']; // Colors from CSS
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDuration = Math.random() * 5 + 7 + 's'; // Longer duration: 7 to 12 seconds
        petal.style.animationDelay = Math.random() * 3 + 's'; // Increased delay for more staggered appearance
        petal.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        petal.style.opacity = Math.random() * 0.5 + 0.1; // More subtle opacity: 0.1 to 0.6
        petal.style.transform = `scale(${Math.random() * 0.6 + 0.2})`; // Smaller scale: 0.2 to 0.8
        petal.style.setProperty('--x-end', (Math.random() * 100 - 50)); // Reduced horizontal drift
        document.body.appendChild(petal);

        petal.addEventListener('animationend', () => {
            petal.remove();
        });
    }

    // Continuously create petals
    setInterval(createPetal, 1000); // Reduced frequency to every 1000ms for stability
});
