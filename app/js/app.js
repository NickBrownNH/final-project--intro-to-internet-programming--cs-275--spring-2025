const size = Number(
    window.prompt(
        `Enter the size of the diamond (number of asterisks in the widest row):`
    )
);

if (isNaN(size) || size <= 0) {
    document.body.innerHTML = `<p>Please enter a valid positive number.</p>`;
} else {
    let diamond = ``;

    if (size % 2 === 0) {
        for (let i = 1; i <= size; i++) {
            const spaces = ` `.repeat(size - i);
            const asterisks = `* `.repeat(i).trim();
            diamond += `${spaces}${asterisks}<br>`;
        }

        for (let i = size - 1; i >= 1; i--) {
            const spaces = ` `.repeat(size - i);
            const asterisks = `* `.repeat(i).trim();
            diamond += `${spaces}${asterisks}<br>`;
        }
    } else {
        for (let i = 1; i <= size; i += 2) {
            const spaces = ` `.repeat((size - i) / 2);
            const asterisks = `*`.repeat(i);
            diamond += `${spaces}${asterisks}<br>`;
        }

        for (let i = size - 2; i >= 1; i -= 2) {
            const spaces = ` `.repeat((size - i) / 2);
            const asterisks = `*`.repeat(i);
            diamond += `${spaces}${asterisks}<br>`;
        }
    }

    document.getElementById(`diamond-container`).innerHTML = `<pre>${diamond}</pre>`;
}

const diamondContainer = document.getElementById(`diamond-container`);

let position = 0;
let direction = 1;
const speed = 10;

function animate() {
    const containerWidth = diamondContainer.offsetWidth;
    const viewportWidth = window.innerWidth;

    position += speed * direction;

    if (position + containerWidth+30 >= viewportWidth || position <= 0) {
        direction *= -1;
    }

    diamondContainer.style.transform = `translateX(${position}px)`;

    requestAnimationFrame(animate);
}

animate();
