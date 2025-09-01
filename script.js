document.addEventListener('DOMContentLoaded', function () {
    const runButton = document.querySelector('.runButton');
    const runCodeDiv = document.getElementById('runCode');
    const runCodeContent = document.getElementById('runCodeContent');
    const runCodeTypewriter = document.getElementById('runCodeTypewriter');
    const blurSpans = document.querySelectorAll('.blur');
    const codeBlock = document.querySelector('code');

    if (runButton && runCodeDiv && runCodeContent && runCodeTypewriter) {
        runButton.addEventListener('click', function () {
            // Hide button
            runButton.style.display = 'none';

            // Remove blur and fade effects
            codeBlock.classList.add('code-executed');

            // Show output
            runCodeDiv.style.display = '';
            runCodeTypewriter.innerHTML = '';
            runCodeContent.style.display = 'none';

            // Parse HTML into nodes
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = runCodeContent.innerHTML;

            // Recursive typewriter for text nodes only, with punctuation pause
            function typeNode(node, parent, done) {
                if (node.nodeType === Node.TEXT_NODE) {
                    let text = node.textContent;
                    let i = 0;
                    let textNode = document.createTextNode('');
                    parent.appendChild(textNode);
                    function typeChar() {
                        if (i < text.length) {
                            textNode.textContent += text[i];
                            let char = text[i];
                            i++;
                            // Pause longer after punctuation
                            let delay = /[.,!?;:]/.test(char) ? 250 : 8;
                            setTimeout(typeChar, delay);
                        } else {
                            done();
                        }
                    }
                    typeChar();
                } else if (node.nodeType === Node.ELEMENT_NODE) {
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

            // Start typewriter effect for all children
            const nodes = Array.from(tempDiv.childNodes);
            let idx = 0;
            function nextNode() {
                if (idx < nodes.length) {
                    typeNode(nodes[idx], runCodeTypewriter, nextNode);
                    idx++;
                }
            }
            nextNode();
        });
    }
});