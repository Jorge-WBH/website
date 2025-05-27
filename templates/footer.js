class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <style>
            .footer-container {
                text-align: center;
                width: 100%;
            }
            .footer-content {
                font-size: 0.9em;
                line-height: 1.5;
            }
            .footer-content a {
                color: rgb(194, 2, 2);
            }
            .footer-content a:hover {
                text-decoration: underline;
            }
        </style>
        <div class="footer-container">
            <div class="footer-content">
                This website is in very early production<br>
                © 2024 Jorge Wellesley-B H<br>
                Last updated on 5/27/25<br>
                <a href="https://github.com/Jorge-WBH/website">Repo link</a>
            </div>
        </div>
        `;
    }
}

customElements.define('footer-template', Footer);