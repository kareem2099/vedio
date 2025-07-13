// Confetti configuration
const confettiSettings = {
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#ff69b4', '#ff85c1', '#ffd700', '#ffffff']
};

// Initialize confetti canvas
const confettiCanvas = document.createElement('canvas');
confettiCanvas.id = 'confetti-canvas';
confettiCanvas.style.position = 'fixed';
confettiCanvas.style.top = '0';
confettiCanvas.style.left = '0';
confettiCanvas.style.width = '100%';
confettiCanvas.style.height = '100%';
confettiCanvas.style.pointerEvents = 'none';
confettiCanvas.style.zIndex = '1000';
document.body.appendChild(confettiCanvas);

document.addEventListener('DOMContentLoaded', () => {
    const playMusicButton = document.getElementById('playMusicButton');
    const backgroundMusic = document.getElementById('backgroundMusic');
    let isPlaying = false;

    // Launch initial confetti
    confetti({
        ...confettiSettings,
        particleCount: 200,
        spread: 100
    });

    // Periodic confetti bursts
    setInterval(() => {
        confetti({
            ...confettiSettings,
            particleCount: 50,
            spread: 50
        });
    }, 10000);

    // Function to toggle music playback
    function toggleMusic() {
        if (isPlaying) {
            backgroundMusic.pause();
            playMusicButton.textContent = 'تشغيل الموسيقى';
        } else {
            backgroundMusic.play();
            playMusicButton.textContent = 'إيقاف الموسيقى';
        }
        isPlaying = !isPlaying;
    }

    // Event listener for the music button
    if (playMusicButton) {
        playMusicButton.addEventListener('click', toggleMusic);
    }

    // Optional: Autoplay music on user interaction (e.g., first click anywhere)
    // This is a common workaround for browser autoplay policies
    document.body.addEventListener('click', function handler() {
        if (!isPlaying) {
            backgroundMusic.play().then(() => {
                isPlaying = true;
                playMusicButton.textContent = 'إيقاف الموسيقى';
            }).catch(error => {
                console.log('Autoplay prevented:', error);
                // User might need to click the button manually
            });
        }
    document.body.removeEventListener('click', handler);
    });

    // Click anywhere to trigger confetti
    document.addEventListener('click', (e) => {
        confetti({
            ...confettiSettings,
            particleCount: 30,
            spread: 40,
            origin: {
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight
            }
        });
    });
});

// Fireworks animation
function createFirework(x, y) {
    const colors = ['#ff69b4', '#ff85c1', '#ffd700', '#ffffff'];
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            confetti({
                particleCount: 50,
                spread: 70,
                origin: { x, y },
                colors: [colors[i % colors.length]],
                shapes: ['circle', 'star']
            });
        }, i * 200);
    }
}

// Random fireworks
setInterval(() => {
    createFirework(Math.random(), Math.random() * 0.5);
}, 3000);

// Lightbox Gallery Functionality
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const galleryImages = document.querySelectorAll('.image-gallery img');
    let currentImageIndex = 0;

    // Open lightbox with clicked image
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentImageIndex = index;
            updateLightboxImage();
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Previous image
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxImage();
    });

    // Next image
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateLightboxImage();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
                updateLightboxImage();
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
                updateLightboxImage();
            } else if (e.key === 'Escape') {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });

    // Close when clicking outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Update lightbox image
    function updateLightboxImage() {
        const imgSrc = galleryImages[currentImageIndex].src;
        lightboxImg.src = imgSrc;
        lightboxImg.alt = galleryImages[currentImageIndex].alt;
    }
});

// Video Message Functionality
document.addEventListener('DOMContentLoaded', () => {
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('birthdayVideo');
    const videoCloseBtn = document.querySelector('.video-close-btn');
    const playVideoButton = document.getElementById('playVideoButton');

    // Open video modal
    playVideoButton.addEventListener('click', () => {
        videoModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        videoPlayer.play();
    });

    // Close video modal
    videoCloseBtn.addEventListener('click', () => {
        videoModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    });

    // Close when clicking outside video
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            videoPlayer.pause();
            videoPlayer.currentTime = 0;
        }
    });

    // Keyboard close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.style.display === 'block') {
            videoModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            videoPlayer.pause();
            videoPlayer.currentTime = 0;
        }
    });
});
