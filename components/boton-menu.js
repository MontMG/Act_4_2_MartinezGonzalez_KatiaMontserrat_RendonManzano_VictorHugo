class BotonMenu extends HTMLElement {
    static get observedAttributes() {
        return ['texto', 'estado', 'href'];
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
        const btn = this.shadowRoot.querySelector('button');

        btn.addEventListener('click', () => {
            const texto = this.getAttribute('texto') || 'Inicio';
            const estado = this.getAttribute('estado') || 'normal';
            const href = this.getAttribute('href') || '';

            this.dispatchEvent(new CustomEvent('menu-click', {
                detail: { texto, estado, href },
                bubbles: true,
                composed: true
            }));

            if (href) {
                window.location.href = href;
            }
        });
    }

    _actualizarVista() {
        const btn = this.shadowRoot.querySelector('button');
        if (!btn) return;

        const texto = this.getAttribute('texto') || 'Inicio';
        const estado = this.getAttribute('estado') || 'normal';

        btn.textContent = texto;
        btn.className = `boton-menu ${estado}`;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                }

                .boton-menu {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    padding: 10px;
                    border-radius: 4px;
                    border: none;
                    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: background-color 300ms ease-out, color 300ms ease-out;
                    box-sizing: border-box;
                }

                /* Variante: normal */
                .boton-menu.normal {
                    background-color: transparent;
                    color: #000000;
                }

                /* Variante: hover (por atributo o al pasar el cursor en estado normal) */
                .boton-menu.normal:hover,
                .boton-menu.hover {
                    background-color: #D3D6DC;
                    color: #000000;
                }

                /* Variante: activo */
                .boton-menu.activo {
                    background-color: #628ECB;
                    color: #FFFFFF;
                }
            </style>
            <button type="button" class="boton-menu normal"></button>
        `;
    }
}

customElements.define('boton-menu', BotonMenu);