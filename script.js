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

    // YouTube Player API
    let player;
    const playMusicButton = document.getElementById('playMusicButton');

    // Load the IFrame Player API code asynchronously.
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('youtubePlayer', {
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    function onPlayerReady(event) {
        if (playMusicButton) {
            playMusicButton.addEventListener('click', () => {
                event.target.playVideo();
                playMusicButton.style.display = 'none'; // Hide button after click
            });
        }
    }

    function onPlayerStateChange(event) {
        // Loop the video when it ends
        if (event.data === YT.PlayerState.ENDED) {
            player.seekTo(0);
            player.playVideo();
        }
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
    setInterval(createConfetti, 200); // Create a new confetti every 200ms
});
