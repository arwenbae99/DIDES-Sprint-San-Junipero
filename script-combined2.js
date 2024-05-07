const plug1 = document.getElementById('plug1');
const button = document.getElementById('button');

let currentPlug = null;
let isDragging = false;

button.addEventListener('dragstart', () => {
    isDragging = true;
});

document.addEventListener('dragover', (event) => {
    event.preventDefault();
});

document.addEventListener('drop', (event) => {
    event.preventDefault();
    if (isDragging) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        let closestPlug = null;
        let minDistance = Infinity;

        plugs.forEach((plug) => {
            const plugRect = plug.getBoundingClientRect();
            const plugX = plugRect.left + plugRect.width / 2;
            const plugY = plugRect.top + plugRect.height / 2;

            const distance = Math.sqrt((mouseX - plugX) ** 2 + (mouseY - plugY) ** 2);

            if (distance < minDistance) {
                minDistance = distance;
                closestPlug = plug;
            }
        });

        if (currentPlug !== closestPlug) {
            if (currentPlug) {
                const currentVideoId = currentPlug.getAttribute('id').replace('plug', 'video');
                const video = document.getElementById(currentVideoId);
                if (video) {
                    // Fade out the currently playing video
                    video.style.transition = 'opacity 0.3s ease';
                    video.style.opacity = 0;
                    setTimeout(() => {
                        video.pause();
                        video.classList.remove('playing');
                        video.style.transition = 'none'; // Reset transition after fading out
                    }, 300); // Wait for the fade-out transition to complete (0.3s)
        
                    // Reset currentPlug since no plug is being interacted with
                    currentPlug = null;
                }
            }
        }
        
        if (currentPlug !== closestPlug) {
            if (currentPlug) {
                const currentVideoId = currentPlug.getAttribute('id').replace('plug', 'video');
                const video = document.getElementById(currentVideoId);
                if (video) {
                    video.pause();
                    video.classList.remove('playing');
                }
            }
            currentPlug = closestPlug;
            if (currentPlug) {
                const currentVideoId = currentPlug.getAttribute('id').replace('plug', 'video');
                const video = document.getElementById(currentVideoId);
                if (video) {
                    video.currentTime = 0;
                    video.play();
                    video.classList.add('playing');
                }
            }
        }

        const plugRect = closestPlug.getBoundingClientRect();
        const plugX = plugRect.left + plugRect.width / 2;
        const plugY = plugRect.top + plugRect.height / 2;

        const buttonRect = button.getBoundingClientRect();
        const buttonX = mouseX - buttonRect.width / 2;
        const buttonY = mouseY - buttonRect.height / 2;

        if (minDistance <= 70) {
            button.style.transition = 'all 0.3s ease';
            button.style.left = (plugX - buttonRect.width / 2) + 'px';
            button.style.top = (plugY - buttonRect.height / 2) + 'px';
        } else {
            button.style.transition = 'none';
            button.style.left = buttonX + 'px';
            button.style.top = buttonY + 'px';
        
            // Stop any previously playing videos
            if (currentPlug) {
                const currentVideoId = currentPlug.getAttribute('id').replace('plug', 'video');
                const video = document.getElementById(currentVideoId);
                if (video) {
                         video.pause();
                        video.classList.remove('playing');
        
                    // Reset currentPlug since no plug is being interacted with
                    currentPlug = null;
                }
                currentPlug = null; // Reset currentPlug since no plug is being interacted with
            }
        }
        

        isDragging = false;
    }
});