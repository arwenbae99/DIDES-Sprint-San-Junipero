const plugs = document.querySelectorAll('.plug');
const button = document.getElementById('button');

let isDragging = false;

button.addEventListener('dragstart', () => {
    isDragging = true;
    //Startingpoint
    initialButtonX = button.offsetLeft;
    initialButtonY = button.offsetTop;
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

        const plugRect = closestPlug.getBoundingClientRect();
        const plugX = plugRect.left + plugRect.width / 2;
        const plugY = plugRect.top + plugRect.height / 2;

        const buttonRect = button.getBoundingClientRect();
        const buttonX = mouseX - buttonRect.width / 2;
        const buttonY = mouseY - buttonRect.height / 2;

        if (minDistance <= 50) {
            button.style.transition = 'all 0.2s ease';
            button.style.left = (plugX - buttonRect.width / 2) + 'px';
            button.style.top = (plugY - buttonRect.height / 2) + 'px';
        } else {
            button.style.transition = 'all 0.2s ease';
            button.style.left = buttonX + 'px';
            button.style.top = buttonY + 'px';
        }

        isDragging = false;
    }

const plug1 = document.getElementById('plug1');
const plug2 = document.getElementById('plug2');
const plug3 = document.getElementById('plug3');
const plug4 = document.getElementById('plug4');

const buttonPos = button.getBoundingClientRect();
const plug1Pos = plug1.getBoundingClientRect();

const deltaXPlug1 = Math.abs(buttonPos.left - plug1Pos.left);
console.log(plug1Pos.left);
console.log(buttonPos.left);


});

