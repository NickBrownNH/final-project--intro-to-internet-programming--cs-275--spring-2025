let size = 0;
let position = 0;
let direction = 1;
const speed = 10;
const diamondContainer = document.getElementById(`diamond-container`);

let animate = () => {
    const containerWidth = diamondContainer.offsetWidth;
    const viewportWidth = window.innerWidth;

    position += speed * direction;

    if (position + containerWidth + 30 >= viewportWidth || position <= 0) {
        direction *= -1;
    }

    diamondContainer.style.transform = `translateX(${position}px)`;

    requestAnimationFrame(animate);
};

window.onload = () => {
    do {
        size = parseInt(
            window.prompt(
                `Enter the size of the diamond:`
            )
        );

        if (isNaN(size) || size <= 0) {
            alert(`Invalid input: Please enter a valid positive number.`);
        }
    } while (isNaN(size) || size <= 0);


    if (isNaN(size) || size <= 0) {
        window.Error(`Invalid input: Please enter a valid positive number.`);
    } else {
        let diamond = ``;

        if (size % 2 === 0) {
            diamondContainer.style.lineHeight = `1.5ch`;
            for (let i = 0; i < size; i += 2) {
                let spaces = ` `;
                let asterisks = `* `;
                if (i === 0) {
                    diamond += ` ${spaces.repeat(size-1)}${asterisks.repeat(1)}<br>`;
                } else {
                    diamond += ` ${spaces.repeat(size-i)}${asterisks.repeat(i)}<br>`;
                }
            }

            for (let i = size; i >= 0; i -= 2) {
                let spaces = ` `;
                let asterisks = `* `;
                if (i == 0) {
                    diamond += ` ${spaces.repeat(size-1)}${asterisks.repeat(1)}<br>`;
                } else {
                    diamond += ` ${spaces.repeat(size-i)}${asterisks.repeat(i)}<br>`;
                }
            }
        } else {
            diamondContainer.style.lineHeight = `1ch`;
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

    animate();
};
