document.addEventListener('DOMContentLoaded', () => {
    const playMusicButton = document.getElementById('playMusicButton');
    const backgroundMusic = document.getElementById('backgroundMusic');
    let isPlaying = false;

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
});
