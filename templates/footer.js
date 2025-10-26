class Footer extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <style>
            .footer-container {
                text-align: center;
                width: 100%;
                margin-bottom: 20px;
            }
            .footer-content {
                font-size: 0.9em;
                line-height: 1.5;
            }
            .footer-content a {
                color: rgb(219, 4, 4);
            }
            .footer-content a:hover {
                text-decoration: underline;
            }
        </style>
        <div class="footer-container">
            <div class="footer-content">
                Jorge Wellesley-Bourke Hernandez<br>
                Last updated on:<br>
                October 26, 2025<br>
            </div>
        </div>
        `;
    }
}

customElements.define('footer-template', Footer);