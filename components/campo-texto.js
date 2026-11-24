class CampoTexto extends HTMLElement {
    static get observedAttributes() {
        return ['estado', 'label', 'placeholder', 'valor', 'mensaje', 'disabled'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this._bindEvents();

        const input = this.shadowRoot.querySelector('input');
        if (this.hasAttribute('valor')) {
            input.value = this.getAttribute('valor') || '';
        }

        this._actualizarVista();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue || !this.shadowRoot.querySelector('input')) return;

        if (name === 'valor') {
            this.shadowRoot.querySelector('input').value = newValue || '';
            return;
        }

        this._actualizarVista();
    }

    get value() {
        const input = this.shadowRoot.querySelector('input');
        return input ? input.value : '';
    }

    set value(nuevoValor) {
        const input = this.shadowRoot.querySelector('input');
        if (input) {
            input.value = nuevoValor;
        }
    }

    _bindEvents() {
        const input = this.shadowRoot.querySelector('input');

        input.addEventListener('input', (e) => {
            this.dispatchEvent(new CustomEvent('campo-input', {
                detail: { value: e.target.value },
                bubbles: true,
                composed: true
            }));
        });

        input.addEventListener('blur', (e) => {
            this.dispatchEvent(new CustomEvent('campo-blur', {
                detail: { value: e.target.value },
                bubbles: true,
                composed: true
            }));
        });
    }

    _actualizarVista() {
        const labelEl = this.shadowRoot.querySelector('.campo-label');
        const caja = this.shadowRoot.querySelector('.caja-input');
        const input = this.shadowRoot.querySelector('input');
        const msgError = this.shadowRoot.querySelector('.mensaje-error');
        if (!labelEl || !caja || !input || !msgError) return;

        const estadoAttr = (this.getAttribute('estado') || 'normal').toLowerCase();
        const deshabilitado = this.hasAttribute('disabled') || estadoAttr === 'deshabilitado';
        const estadoFinal = deshabilitado ? 'deshabilitado' : estadoAttr;

        const label = this.getAttribute('label') || '';
        const placeholder = this.getAttribute('placeholder') || 'Input';
        const mensaje = this.getAttribute('mensaje') || 'Campo obligatorio';

        labelEl.textContent = label;
        labelEl.style.display = label ? 'block' : 'none';

        caja.className = `caja-input ${estadoFinal}`;
        input.placeholder = placeholder;
        input.disabled = deshabilitado;

        if (estadoFinal === 'error') {
            msgError.textContent = mensaje;
            msgError.classList.add('visible');
        } else {
            msgError.textContent = '';
            msgError.classList.remove('visible');
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                    width: 423px;
                    max-width: 100%;
                }

                .campo-contenedor {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    width: 100%;
                }

                .campo-label {
                    color: #1F324F;
                    font-family: 'Inter', sans-serif;
                    font-size: 21.4px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                }

                .caja-input {
                    box-sizing: border-box;
                    display: flex;
                    width: 100%;
                    height: 64px;
                    padding: 0 10.7px;
                    align-items: center;
                    gap: 17.833px;
                    border-radius: 8.917px;
                    border: 1.783px solid #1F324F;
                    background: #FFFFFF;
                    transition: background-color 180ms ease, border-color 180ms ease;
                }

                input {
                    width: 100%;
                    height: 100%;
                    border: none;
                    outline: none;
                    background: transparent;
                    color: #3A5985;
                    caret-color: #3A5985;
                    font-family: 'Inter', sans-serif;
                    font-size: 21.4px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                    padding: 0;
                }

                input::placeholder {
                    color: #555B63;
                    opacity: 1;
                }

                /* ===== VARIANTE: normal ===== */
                .caja-input.normal {
                    background: #FFFFFF;
                    border-color: #1F324F;
                }

                /* ===== VARIANTE: focado ===== */
                .caja-input.focado,
                .caja-input.normal:focus-within {
                    background: #B1C9EF;
                    border-color: #8A99B0;
                }

                /* ===== VARIANTE: deshabilitado ===== */
                .caja-input.deshabilitado {
                    background: #E0E4EB;
                    border-color: #B4BFD0;
                    cursor: not-allowed;
                }

                .caja-input.deshabilitado input,
                .caja-input.deshabilitado input::placeholder {
                    color: #555B63;
                    cursor: not-allowed;
                }

                /* ===== VARIANTE: error ===== */
                .caja-input.error {
                    background: #FFFFFF;
                    border-color: #B31C1C;
                }

                /* ===== VARIANTE: correcto ===== */
                .caja-input.correcto {
                    background: #FFFFFF;
                    border-color: #0E762C;
                }

                .mensaje-error {
                    display: none;
                    color: #B31C1C;
                    font-family: 'Inter', sans-serif;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                }

                .mensaje-error.visible {
                    display: block;
                }
            </style>

            <div class="campo-contenedor">
                <label class="campo-label" for="input-texto"></label>
                <div class="caja-input normal">
                    <input id="input-texto" type="text" placeholder="Input" />
                </div>
                <span class="mensaje-error" role="alert"></span>
            </div>
        `;
    }
}

customElements.define('campo-texto', CampoTexto);