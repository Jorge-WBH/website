document.addEventListener('DOMContentLoaded', function () {
    const runButton = document.getElementById('runButton');
    const input = document.getElementById('runCode');
    const output = document.getElementById("revealText");

    const content = input.innerHTML.trim();
    const speed = 15;

    runButton.addEventListener("click", reveal);

    function reveal() {
        // hide the button and code
        const b = runButton.getBoundingClientRect();
        confetti({
            startVelocity:20,
            particleCount:50,
            spread:80,
            origin: {
                x: (b.left + b.width/2)/window.innerWidth,
                y: (b.top + b.height/2)/window.innerHeight
            }
        });
        runButton.style.display = 'none';
        document.querySelector('code').style.display = 'none';

        // Reset output
        output.innerHTML = '';

        // Parse HTML content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;

        // Recursive typewriter for text nodes
        function typeNode(node, parent, done) {
            // if the thing is text
            if (node.nodeType === Node.TEXT_NODE) {
                let text = node.textContent;
                let i = 0;
                let textNode = document.createTextNode('');
                parent.appendChild(textNode);

                function typeChar() {
                    if (i < text.length) {
                        textNode.textContent += text[i];
                        i++;
                        setTimeout(typeChar, speed);
                    } else {
                        done();
                    }
                }
                typeChar();
            } // if the thing is an element (i.e. link)
            else if (node.nodeType === Node.ELEMENT_NODE) {
                const el = node.cloneNode(false);
                parent.appendChild(el);
                const children = Array.from(node.childNodes);
                let idx = 0;
                function nextChild() {
                    if (idx < children.length) {
                        typeNode(children[idx], el, nextChild);
                        idx++;
                    } else {
                        done();
                    }
                }
                nextChild();
            } else {
                done();
            }
        }

        // Start typewriter effect
        const nodes = Array.from(tempDiv.childNodes);
        let idx = 0;
        function nextNode() {
            if (idx < nodes.length) {
                typeNode(nodes[idx], output, nextNode);
                idx++;
            }
        }
        nextNode();
    }
});
