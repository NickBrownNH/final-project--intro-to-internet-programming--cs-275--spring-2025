let a = 10;
// This is a comment
console.log(a);

const size = Number(window.prompt(`Enter the size of the diamond:`));

if (isNaN(size) || size <= 0) {
    document.body.innerHTML = `<p>Please enter a valid positive number.</p>`;
} else {
    let diamond = ``;

    for (let i = 1; i <= size; i++) {
        const spaces = ` `.repeat(size - i);
        const asterisks = `*`.repeat(2 * i - 1);
        diamond += `${spaces}${asterisks}<br>`;
    }

    for (let i = size - 1; i >= 1; i--) {
        const spaces = ` `.repeat(size - i);
        const asterisks = `*`.repeat(2 * i - 1);
        diamond += `${spaces}${asterisks}<br>`;
    }

    document.body.innerHTML = `<pre>${diamond}</pre>`;
}
