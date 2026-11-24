const ICONOS = {
    verdadero: new URL('../assets/iconos/Icono=Ojo, Estado=Visible.svg', import.meta.url).href,
    falso: new URL('../assets/iconos/Icono=Ojo, Estado=NoVisible.svg', import.meta.url).href,
    deshabilitado: new URL('../assets/iconos/Icono=Ojo, Estado=Deshabilitado.svg', import.meta.url).href
};

class CampoContrasena extends HTMLElement {
    static get observedAttributes() {
        return ['visible', 'label', 'placeholder', 'valor', 'disabled'];
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

    _obtenerEstadoVisible() {
        const attr = (this.getAttribute('visible') || 'falso').toLowerCase();
        if (this.hasAttribute('disabled') || attr === 'deshabilitado') {
            return 'deshabilitado';
        }
        return attr === 'verdadero' ? 'verdadero' : 'falso';
    }

    _bindEvents() {
        const input = this.shadowRoot.querySelector('input');
        const btnOjo = this.shadowRoot.querySelector('.btn-ojo');

        btnOjo.addEventListener('click', () => {
            const estadoActual = this._obtenerEstadoVisible();
            if (estadoActual === 'deshabilitado') return;

            const nuevoEstado = estadoActual === 'verdadero' ? 'falso' : 'verdadero';
            this.setAttribute('visible', nuevoEstado);

            this.dispatchEvent(new CustomEvent('cambio-visibilidad', {
                detail: { visible: nuevoEstado },
                bubbles: true,
                composed: true
            }));
        });

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
        const btnOjo = this.shadowRoot.querySelector('.btn-ojo');
        const iconoEl = this.shadowRoot.querySelector('.icono-ojo');
        if (!labelEl || !caja || !input || !btnOjo || !iconoEl) return;

        const estado = this._obtenerEstadoVisible();
        const label = this.getAttribute('label') ?? 'Contraseña';
        const placeholder = this.getAttribute('placeholder') || '';

        labelEl.textContent = label;
        labelEl.style.display = label ? 'block' : 'none';

        caja.className = `caja-input ${estado}`;
        input.placeholder = placeholder;

        if (estado === 'deshabilitado') {
            input.type = 'password';
            input.disabled = true;
            btnOjo.disabled = true;
            btnOjo.setAttribute('aria-label', 'Campo de contraseña deshabilitado');
            iconoEl.src = ICONOS.deshabilitado;
        } else if (estado === 'verdadero') {
            input.type = 'text';
            input.disabled = false;
            btnOjo.disabled = false;
            btnOjo.setAttribute('aria-label', 'Ocultar contraseña');
            iconoEl.src = ICONOS.verdadero;
        } else {
            input.type = 'password';
            input.disabled = false;
            btnOjo.disabled = false;
            btnOjo.setAttribute('aria-label', 'Mostrar contraseña');
            iconoEl.src = ICONOS.falso;
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
                    transition: background-color 180ms ease;
                }

                .caja-input.deshabilitado {
                    background: #E0E4EB;
                    cursor: not-allowed;
                }

                input {
                    flex: 1;
                    min-width: 0;
                    height: 100%;
                    border: none;
                    outline: none;
                    background: transparent;
                    color: #555B63;
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

                .caja-input.deshabilitado input,
                .caja-input.deshabilitado input::placeholder {
                    color: #6C778B;
                    cursor: not-allowed;
                }

                .btn-ojo {
                    background: transparent;
                    border: none;
                    padding: 0;
                    margin: 0;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    flex-shrink: 0;
                }

                .btn-ojo:disabled {
                    cursor: not-allowed;
                }

                .icono-ojo {
                    height: 32px;
                    width: auto;
                    display: block;
                }
            </style>

            <div class="campo-contenedor">
                <label class="campo-label" for="input-password">Contraseña</label>
                <div class="caja-input falso">
                    <input id="input-password" type="password" />
                    <button type="button" class="btn-ojo" aria-label="Mostrar contraseña">
                        <img class="icono-ojo" alt="" />
                    </button>
                </div>
            </div>
        `;
    }
}

customElements.define('campo-contrasena', CampoContrasena);