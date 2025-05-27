class Header extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback() {
        this.innerHTML =
        `
        <ul style="margin: 0;">
        <li><a href="index.html">Home</a></li>
        <li><a href="projects.html">Projects</a></li>
        <li><a href="about.html">About</a></li>
        <li style="float: right;"><a href="https://genrandom.com/cats/" target="_blank">?</a></li>
        </ul>
        `
    }
}

customElements.define('header-template',Header);