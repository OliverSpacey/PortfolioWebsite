// Spawn clouds at random and move them across the screen
function spawnClouds() {
    const cloudContainer = document.getElementById('cloud-container');
    const cloudCount = 5; // Number of clouds to spawn

    for (let i = 0; i < cloudCount; i++) {
        const cloud = document.createElement('div');
        cloud.classList.add('cloud');

        // Randomize cloud size and position
        const size = Math.random() * 100 + 50;
        cloud.style.width = `${size}px`;
        cloud.style.height = `${size / 2}px`;
        cloud.style.top = `${Math.random() * 80}%`;
        cloud.style.left = `${Math.random() * 100}%`;

        cloudContainer.appendChild(cloud);
    }

    // Move clouds across the screen
    const clouds = document.querySelectorAll('.cloud');
    clouds.forEach(cloud => {
        const speed = Math.random() * 0.5 + 0.2; // Random speed for each cloud
        cloud.style.animationDuration = `${speed * 20}s`;
        cloud.style.animationName = 'moveClouds';
    });
}