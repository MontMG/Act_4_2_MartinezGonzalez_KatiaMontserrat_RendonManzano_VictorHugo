class DiaCalendario extends HTMLElement {
    static get observedAttributes() {
        return ['numero', 'variante'];
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
        if (oldValue !== newValue && this.shadowRoot.querySelector('.dia')) {
            this._actualizarVista();
        }
    }

    _bindEvents() {
        const contenedor = this.shadowRoot.querySelector('.dia');

        contenedor.addEventListener('click', () => {
            const variante = this.getAttribute('variante') || 'normal';

            // Solo responde al clic si tiene la variante "evento".
            // "normal" no tiene acción y "seleccionado" no se deselecciona con otro clic.
            if (variante !== 'evento') return;

            this.dispatchEvent(new CustomEvent('dia-evento-click', {
                detail: {
                    dia: Number(this.getAttribute('numero'))
                },
                bubbles: true,
                composed: true
            }));
        });
    }

    _actualizarVista() {
        const contenedor = this.shadowRoot.querySelector('.dia');
        const texto = this.shadowRoot.querySelector('.numero');
        if (!contenedor || !texto) return;

        const numero = this.getAttribute('numero') || '';
        const variante = this.getAttribute('variante') || 'normal';

        texto.textContent = numero;
        contenedor.className = `dia ${variante}`;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                }

                .dia {
                    box-sizing: border-box;
                    display: flex;
                    width: 100%;
                    height: 54px;
                    padding: 6px;
                    justify-content: center;
                    align-items: center;
                    border-radius: 8px;
                    user-select: none;
                    border: none;
                }

                .numero {
                    font-family: 'Inter', sans-serif;
                    font-size: 18px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 1;
                }

                .dia.normal {
                    background: #FFFFFF;
                    color: #000000;
                    cursor: default;
                }

                .dia.evento {
                    background: #467FCF;
                    color: #000000;
                    cursor: pointer;
                }

                .dia.seleccionado {
                    background: #44638E;
                    color: #FFFFFF;
                    cursor: default;
                }

                @media (max-width: 640px) {
                    .dia {
                        height: 40px;
                        padding: 4px;
                        border-radius: 6px;
                    }

                    .numero {
                        font-size: 14px;
                    }
                }
            </style>
            <div class="dia normal">
                <span class="numero"></span>
            </div>
        `;
    }
}

customElements.define('dia-calendario', DiaCalendario);