const plugs = document.querySelectorAll('.plug');
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

        // Pause and hide all videos if no closest plug is found
        if (!closestPlug) {
            document.querySelectorAll('.video').forEach((video) => {
                video.pause();
                video.classList.remove('playing');
            });
        } else {
            // If there is a closest plug, handle the video accordingly
            if (currentPlug !== closestPlug) {
                if (currentPlug) {
                    const video = currentPlug.querySelector('.video');
                    video.pause();
                    video.classList.remove('playing');
                }
                currentPlug = closestPlug;
                if (currentPlug) {
                    const video = currentPlug.querySelector('.video');
                    video.currentTime = 0;
                    video.play();
                    video.classList.add('playing');
                }
            }
        }

        isDragging = false;
    }
});
