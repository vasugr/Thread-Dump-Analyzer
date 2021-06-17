"use strict";
const counter = document.getElementById('lines-of-code-counter');
let count = 0;
setInterval(() => {
    counter.textContent = count++;
}, 100);
// Handle the message inside the webview
window.addEventListener('message', event => {
    const message = event.data; // The JSON data our extension sent
    switch (message.command) {
        case 'refactor':
            count = Math.ceil(count * 0.5);
            counter.textContent = count;
            break;
    }
});
//# sourceMappingURL=index2.js.map