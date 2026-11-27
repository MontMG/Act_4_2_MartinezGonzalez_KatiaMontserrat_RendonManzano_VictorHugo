const ICONOS = {
    informativa: new URL('../assets/iconos/Icono=Notificacion, Estado=Informativa.svg', import.meta.url).href,
    accion: new URL('../assets/iconos/Icono=Notificacion, Estado=Accion.svg', import.meta.url).href,
    leido: new URL('../assets/iconos/Icono=Notificacion, Estado=Leido.svg', import.meta.url).href
};

class TarjetaNotificacion extends HTMLElement {
    static get observedAttributes() {
        return ['tipo', 'texto', 'texto-accion', 'href'];
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
        if (oldValue !== newValue && this.shadowRoot.querySelector('.tarjeta')) {
            this._actualizarVista();
        }
    }

    _obtenerTipo() {
        const tipo = (this.getAttribute('tipo') || 'informativa').toLowerCase();
        if (tipo === 'accion' || tipo === 'leido') return tipo;
        return 'informativa';
    }

    _bindEvents() {
        const tarjeta = this.shadowRoot.querySelector('.tarjeta');
        const enlace = this.shadowRoot.querySelector('.enlace-accion');

        // Al hacer clic en "Ver actividad": marca como leída, emite evento y redirige si tiene href
        enlace.addEventListener('click', (e) => {
            e.stopPropagation();
            const href = this.getAttribute('href') || '';
            const texto = this.getAttribute('texto') || '';

            this.setAttribute('tipo', 'leido');

            this.dispatchEvent(new CustomEvent('notificacion-accion', {
                detail: { texto, href },
                bubbles: true,
                composed: true
            }));

            if (!href) {
                e.preventDefault();
            }
        });

        // Al hacer clic en una notificación no leída, pasa a "leido"
        tarjeta.addEventListener('click', () => {
            const tipoActual = this._obtenerTipo();
            if (tipoActual === 'leido') return;

            this.setAttribute('tipo', 'leido');

            this.dispatchEvent(new CustomEvent('notificacion-leida', {
                detail: {
                    tipoAnterior: tipoActual,
                    texto: this.getAttribute('texto') || ''
                },
                bubbles: true,
                composed: true
            }));
        });
    }

    _actualizarVista() {
        const tarjeta = this.shadowRoot.querySelector('.tarjeta');
        const iconoEl = this.shadowRoot.querySelector('.icono');
        const textoEl = this.shadowRoot.querySelector('.texto');
        const enlaceEl = this.shadowRoot.querySelector('.enlace-accion');
        if (!tarjeta || !iconoEl || !textoEl || !enlaceEl) return;

        const tipo = this._obtenerTipo();
        const texto = this.getAttribute('texto') || 'Esta es una notificación.';
        const textoAccion = this.getAttribute('texto-accion') || 'Ver actividad';
        const href = this.getAttribute('href') || '#';

        tarjeta.className = `tarjeta ${tipo}`;
        iconoEl.src = ICONOS[tipo];
        textoEl.textContent = texto;

        if (tipo === 'accion') {
            enlaceEl.textContent = textoAccion;
            enlaceEl.href = href;
            enlaceEl.classList.add('visible');
        } else {
            enlaceEl.classList.remove('visible');
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                }

                .tarjeta {
                    box-sizing: border-box;
                    display: flex;
                    width: 100%;
                    padding: 10px 12px;
                    align-items: flex-start;
                    gap: 10px;
                    border-radius: 6px;
                    font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                    transition: background-color 200ms ease, color 200ms ease;
                }

                .icono {
                    width: 20px;
                    height: 20px;
                    flex-shrink: 0;
                    display: block;
                }

                .contenido {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: baseline;
                    gap: 8px;
                    flex: 1;
                    min-width: 0;
                    line-height: 1.35;
                }

                .texto {
                    margin: 0;
                    font-size: 13.5px;
                    font-weight: 400;
                }

                .enlace-accion {
                    display: none;
                    font-size: 13.5px;
                    font-style: italic;
                    font-weight: 400;
                    text-decoration: underline;
                    color: rgba(128, 107, 0, 0.8);
                    cursor: pointer;
                }

                .enlace-accion.visible {
                    display: inline;
                }

                .tarjeta.informativa {
                    background: rgba(0, 117, 202, 0.24);
                    color: #025BAB;
                    cursor: pointer;
                }

                .tarjeta.accion {
                    background: rgba(217, 130, 0, 0.24);
                    color: #806B00;
                    cursor: pointer;
                }

                .tarjeta.leido {
                    background: rgba(112, 115, 118, 0.24);
                    color: #434343;
                    cursor: default;
                }
            </style>

            <div class="tarjeta informativa">
                <img class="icono" alt="" />
                <div class="contenido">
                    <p class="texto"></p>
                    <a class="enlace-accion"></a>
                </div>
            </div>
        `;
    }
}

customElements.define('tarjeta-notificacion', TarjetaNotificacion);