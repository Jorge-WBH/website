document.addEventListener('DOMContentLoaded', function() {
            const runButton = document.querySelector('.runButton');
            const runCodeDiv = document.getElementById('runCode');
            const runCodeContent = document.getElementById('runCodeContent');
            const runCodeTypewriter = document.getElementById('runCodeTypewriter');
            if (runButton && runCodeDiv && runCodeContent && runCodeTypewriter) {
                runButton.addEventListener('click', function() {
                    runCodeDiv.style.display = '';
                    runCodeTypewriter.innerHTML = '';
                    runCodeContent.style.display = 'none';

                    // Parse HTML into nodes
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = runCodeContent.innerHTML;

                    // Recursive typewriter for text nodes only
                    function typeNode(node, parent, done) {
                        if (node.nodeType === Node.TEXT_NODE) {
                            let text = node.textContent;
                            let i = 0;
                            function typeChar() {
                                if (i < text.length) {
                                    parent.appendChild(document.createTextNode(text[i]));
                                    i++;
                                    setTimeout(typeChar, 8);
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