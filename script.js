// Function to add playsinline attribute to video elements
function addPlaysInlineAttribute() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.setAttribute('playsinline', '');
    });
}

// Call the function to add playsinline attribute to video elements
addPlaysInlineAttribute();

const plugs = document.querySelectorAll('.plug');
const button = document.getElementById('button');

let currentPlug = null;
let isDragging = false;

// Mouse events
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
                pauseAndResetVideo(currentPlug);
            }
            currentPlug = closestPlug;
            if (currentPlug) {
                playVideo(currentPlug);
            }
        }

        const plugRect = closestPlug.getBoundingClientRect();
        const plugX = plugRect.left + plugRect.width / 2;
        const plugY = plugRect.top + plugRect.height / 2;

        const buttonRect = button.getBoundingClientRect();
        const buttonX = mouseX - buttonRect.width / 2;
        const buttonY = mouseY - buttonRect.height / 2;

        if (minDistance <= 70) {
            moveButtonToPlug(button, plugX, plugY);
        } else {
            moveButtonToPosition(button, buttonX, buttonY);
        }

        isDragging = false;
    }
});

// Touch events
button.addEventListener('touchstart', (event) => {
    isDragging = true;
});

document.addEventListener('touchmove', (event) => {
    event.preventDefault();
    if (isDragging) {
        const touch = event.touches[0];
        const mouseX = touch.clientX;
        const mouseY = touch.clientY;

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
                pauseAndResetVideo(currentPlug);
            }
            currentPlug = closestPlug;
            if (currentPlug) {
                playVideo(currentPlug);
            }
        }

        const plugRect = closestPlug.getBoundingClientRect();
        const plugX = plugRect.left + plugRect.width / 2;
        const plugY = plugRect.top + plugRect.height / 2;

        const buttonRect = button.getBoundingClientRect();
        const buttonX = mouseX - buttonRect.width / 2;
        const buttonY = mouseY - buttonRect.height / 2;

        if (minDistance <= 70) {
            moveButtonToPlug(button, plugX, plugY);
        } else {
            moveButtonToPosition(button, buttonX, buttonY);
        }
    }
}, { passive: false });

document.addEventListener('touchend', (event) => {
    if (isDragging) {
        isDragging = false;
    }
});

// Function to pause and reset video
function pauseAndResetVideo(plug) {
    const currentVideoId = plug.getAttribute('id').replace('plug', 'video');
    const video = document.getElementById(currentVideoId);
    if (video) {
        video.pause();
        video.currentTime = 0;
        video.classList.remove('playing');
        const quoteId = currentVideoId.replace('video', 'quote');
        const quote = document.getElementById(quoteId);
        if (quote) {
            quote.classList.remove('show');
        }
    }
}

// Function to play video
function playVideo(plug) {
    const currentVideoId = plug.getAttribute('id').replace('plug', 'video');
    const video = document.getElementById(currentVideoId);
    if (video) {
        video.play();
        video.classList.add('playing');
        const quoteId = currentVideoId.replace('video', 'quote');
        const quote = document.getElementById(quoteId);
        if (quote) {
            quote.classList.add('show');
        }
    }
}

// Function to move button to plug
function moveButtonToPlug(button, x, y) {
    button.style.transition = 'all 0.3s ease';
    button.style.left = (x - button.offsetWidth / 2) + 'px';
    button.style.top = (y - button.offsetHeight / 2) + 'px';
}

// Function to move button to position
function moveButtonToPosition(button, x, y) {
    button.style.transition = 'none';
    button.style.left = x + 'px';
    button.style.top = y + 'px';
    if (currentPlug) {
        pauseAndResetVideo(currentPlug);
        currentPlug = null;
    }
}

// Function to play video on click
function playVideoOnClick(videoElement) {
    if (videoElement) {
        if (videoElement.paused) {
            const playPromise = videoElement.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error('Failed to play video:', error);
                });
            }
        }
    }
}

// Add event listeners to play videos on click
plugs.forEach(plug => {
    plug.addEventListener('click', () => {
        const videoId = plug.getAttribute('data-video');
        const video = document.getElementById(videoId);
        playVideoOnClick(video);
    });
});

// Function to pause other videos except the current one
function pauseOtherVideos(currentVideo) {
    document.querySelectorAll('.video').forEach(video => {
        if (video !== currentVideo) {
            video.pause();
        }
    });
}
