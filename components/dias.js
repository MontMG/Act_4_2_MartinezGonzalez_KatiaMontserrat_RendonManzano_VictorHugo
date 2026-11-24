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
                    display: inline-block;
                }

                .dia {
                    box-sizing: border-box;
                    display: flex;
                    width: 73px;
                    height: 80px;
                    padding: 9.479px;
                    justify-content: center;
                    align-items: center;
                    gap: 9.479px;
                    border-radius: 9.479px;
                    user-select: none;
                    border: none;
                }

                .numero {
                    font-family: 'Inter', sans-serif;
                    font-size: 28.437px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 45.5px; /* 160% */
                }

                /* Variante: normal */
                .dia.normal {
                    background: #FFFFFF;
                    color: #000000;
                    cursor: default;
                }

                /* Variante: evento */
                .dia.evento {
                    background: #467FCF;
                    color: #000000;
                    cursor: pointer;
                }

                /* Variante: seleccionado */
                .dia.seleccionado {
                    background: #44638E;
                    color: #FFFFFF;
                    cursor: default;
                }
            </style>
            <div class="dia normal">
                <span class="numero"></span>
            </div>
        `;
    }
}

customElements.define('dia-calendario', DiaCalendario);