class Footer extends HTMLElement {
    constructor() {
        super();
        this.lastUpdate = "fetching...";
    }

    async connectedCallback() {
        try {
            const response = await fetch('https://api.github.com/repos/Jorge-WBH/website');
            const data = await response.json();
            const date = new Date(data.pushed_at);
            this.lastUpdate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        } catch (error) {
            console.error('Error fetching repository data:', error);
            this.lastUpdate = "Could not retrieve last update";
        }

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
                ${this.lastUpdate}<br>
            </div>
        </div>
        `;
    }
}

customElements.define('footer-template', Footer);