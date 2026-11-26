class BotonAccion extends HTMLElement {
    static get observedAttributes() {
        return ['texto', 'tipo', 'estado', 'disabled'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this._bindEvents();
        this._actualizarVista();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && this.shadowRoot.querySelector('button')) {
            this._actualizarVista();
        }
    }

    _bindEvents() {
        const btn = this.shadowRoot.getElementById('btn');
        btn.addEventListener('click', () => {
            if (!btn.disabled) {
                this.dispatchEvent(new CustomEvent('accion-click', {
                    bubbles: true,
                    composed: true
                }));
            }
        });
    }

    _actualizarVista() {
        const btn = this.shadowRoot.getElementById('btn');
        const textoEl = this.shadowRoot.querySelector('.btn-texto');
        if (!btn || !textoEl) return;

        const texto = this.getAttribute('texto') || 'nombreBtn';
        const tipo = this.getAttribute('tipo') || 'primario';
        const estado = (this.getAttribute('estado') || 'normal').toLowerCase();
        const deshabilitado = this.hasAttribute('disabled') || estado === 'deshabilitado';

        textoEl.textContent = texto;
        btn.disabled = deshabilitado;
        btn.className = deshabilitado ? `${tipo} deshabilitado` : `${tipo} ${estado}`;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                }

                button {
                    display: flex;
                    width: var(--btn-width, 238px);
                    height: var(--btn-height, 62px);
                    padding: var(--btn-padding, 0.937px 2.812px);
                    justify-content: center;
                    align-items: center;
                    align-content: space-between;
                    gap: 12.187px;
                    border-radius: var(--btn-radius, 9.375px);
                    cursor: pointer;
                    transition: background-color 300ms ease-out, color 300ms ease-out, border-color 300ms ease-out;
                    box-sizing: border-box;
                }

                .btn-texto {
                    display: flex;
                    height: var(--btn-texto-height, 22.5px);
                    flex-direction: column;
                    justify-content: center;
                    flex: 1 0 0;
                    color: inherit;
                    text-align: center;
                    font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                    font-size: var(--btn-font-size, 30px);
                    font-style: normal;
                    font-weight: var(--btn-font-weight, 600);
                    line-height: var(--btn-line-height, 37.5px);
                }

                /* ===== PRIMARIO ===== */
                button.primario {
                    background: #628ECB;
                    color: #FFFFFF;
                    border: none;
                }
                button.primario:hover:not(:disabled),
                button.primario.hover:not(:disabled) {
                    background: #395886;
                    color: #FFFFFF;
                }
                button.primario:active:not(:disabled),
                button.primario.seleccionado:not(:disabled) {
                    background: #1D2E49;
                    color: #FFFFFF;
                    border: 2px solid #395886;
                }
                button.primario:disabled,
                button.primario.deshabilitado {
                    background: #D5DEEC;
                    color: #395886;
                    cursor: not-allowed;
                }

                /* ===== SECUNDARIO ===== */
                button.secundario {
                    background: #C8D4E6;
                    color: #395886;
                    border: none;
                }
                button.secundario:hover:not(:disabled),
                button.secundario.hover:not(:disabled) {
                    background: #467FCF;
                    color: #FFFFFF;
                }
                button.secundario:active:not(:disabled),
                button.secundario.seleccionado:not(:disabled) {
                    background: #395886;
                    color: #FFFFFF;
                    border: 2px solid #1D2E49;
                }
                button.secundario:disabled,
                button.secundario.deshabilitado {
                    background: #D5DEEC;
                    color: #395886;
                    cursor: not-allowed;
                }
            </style>
            <button type="button" class="primario normal" id="btn">
                <span class="btn-texto"></span>
            </button>
        `;
    }
}

customElements.define('boton-accion', BotonAccion);