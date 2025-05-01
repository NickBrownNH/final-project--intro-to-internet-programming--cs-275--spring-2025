let a = 10;
// This is a comment
console.log(a);

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
        // Generate the top half of the diamond (including the middle row)
        for (let i = 1; i <= size; i++) {
            const spaces = ` `.repeat(size - i);
            const asterisks = `* `.repeat(i).trim();
            diamond += `${spaces}${asterisks}<br>`;
        }

        // Generate the bottom half of the diamond
        for (let i = size - 1; i >= 1; i--) {
            const spaces = ` `.repeat(size - i);
            const asterisks = `* `.repeat(i).trim();
            diamond += `${spaces}${asterisks}<br>`;
        }
    } else {
        // Generate the top half of the diamond (including the middle row)
        for (let i = 1; i <= size; i += 2) {
            const spaces = ` `.repeat((size - i) / 2);
            const asterisks = `*`.repeat(i);
            diamond += `${spaces}${asterisks}<br>`;
        }

        // Generate the bottom half of the diamond
        for (let i = size - 2; i >= 1; i -= 2) {
            const spaces = ` `.repeat((size - i) / 2);
            const asterisks = `*`.repeat(i);
            diamond += `${spaces}${asterisks}<br>`;
        }
    }

    document.getElementById(`diamond-container`).innerHTML = `<pre>${diamond}</pre>`;
}
