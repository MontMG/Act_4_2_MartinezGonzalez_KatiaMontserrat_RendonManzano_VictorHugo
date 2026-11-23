class BotonMenu extends HTMLElement {
    static get observedAttributes() {
        return ['texto', 'activo', 'href'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        if (this.shadowRoot.innerHTML !== '') {
            this.render();
        }
    }

    render() {
        const texto = this.getAttribute('texto') || 'Inicio';
        const activo = this.hasAttribute('activo');
        const href = this.getAttribute('href') || '';

        this.shadowRoot.innerHTML = `
      <style>
        button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 10px;
          border-radius: 4px;
          border: none;
          background-color: ${activo ? '#628ECB' : 'transparent'};
          color: ${activo ? '#FFFFFF' : '#000000'};
          font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 300ms ease-out, color 300ms ease-out;
          box-sizing: border-box;
        }

        button:hover {
          background-color: ${activo ? '#628ECB' : '#D3D6DC'};
        }
      </style>
      <button type="button" id="btn">${texto}</button>
    `;

        const btn = this.shadowRoot.getElementById('btn');
        btn.addEventListener('click', () => {
            if (this.hasAttribute('activo')) {
                this.removeAttribute('activo');
            } else {
                this.setAttribute('activo', '');
            }

            if (href) {
                window.location.href = href;
            }

            this.dispatchEvent(new CustomEvent('menu-click', {
                detail: { texto, activo: this.hasAttribute('activo') },
                bubbles: true
            }));
        });
    }
}

customElements.define('boton-menu', BotonMenu);