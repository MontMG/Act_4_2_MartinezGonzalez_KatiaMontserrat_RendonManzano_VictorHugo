class BotonAccion extends HTMLElement {
    static get observedAttributes() {
        return ['texto', 'tipo', 'disabled'];
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
        const texto = this.getAttribute('texto') || 'nombreBtn';
        const tipo = this.getAttribute('tipo') || 'primario';
        const deshabilitado = this.hasAttribute('disabled');

        this.shadowRoot.innerHTML = `
      <style>
        button {
          width: 160px;
          height: 42px;
          border-radius: 10px;
          padding: 1px 3px;
          font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 300ms ease-out, color 300ms ease-out, border-color 300ms ease-out;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }

        button.primario {
          background-color: #628ECB;
          color: #FFFFFF;
          border: none;
        }
        button.primario:hover:not(:disabled) {
          background-color: #395886;
        }
        button.primario:active:not(:disabled),
        button.primario.seleccionado:not(:disabled) {
          background-color: #1D2E49;
          border: 2px solid #395886;
        }
        button.primario:disabled {
          background-color: #D5DEEC;
          color: #395886;
          cursor: not-allowed;
        }

        button.secundario {
          background-color: #C8D4E6;
          color: #395886;
          border: none;
        }
        button.secundario:hover:not(:disabled) {
          background-color: #467FCF;
          color: #FFFFFF;
        }
        button.secundario:active:not(:disabled),
        button.secundario.seleccionado:not(:disabled) {
          background-color: #395886;
          color: #FFFFFF;
          border: 2px solid #1D2E49;
        }
        button.secundario:disabled {
          background-color: #D5DEEC;
          color: #395886;
          cursor: not-allowed;
        }
      </style>
      <button type="button" class="${tipo}" id="btn" ${deshabilitado ? 'disabled' : ''}>${texto}</button>
    `;

        const btn = this.shadowRoot.getElementById('btn');
        btn.addEventListener('click', () => {
            if (!btn.disabled) {
                this.dispatchEvent(new CustomEvent('accion-click', { bubbles: true }));
            }
        });
    }

    setCargando(estado) {
        const btn = this.shadowRoot.getElementById('btn');
        btn.disabled = estado;
        btn.textContent = estado ? 'Validando...' : (this.getAttribute('texto') || 'nombreBtn');
    }
}

customElements.define('boton-accion', BotonAccion);