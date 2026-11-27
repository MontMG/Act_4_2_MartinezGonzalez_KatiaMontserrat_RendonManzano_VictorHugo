class CampoDesplegable extends HTMLElement {
    static get observedAttributes() {
        return ['placeholder', 'opciones', 'valor'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.abierto = false;
        this.seleccionado = '';
        this._cerrarAlClickFuera = this._cerrarAlClickFuera.bind(this);
    }

    connectedCallback() {
        this.seleccionado = this.getAttribute('valor') || '';
        this.render();
        document.addEventListener('click', this._cerrarAlClickFuera);
    }

    disconnectedCallback() {
        document.removeEventListener('click', this._cerrarAlClickFuera);
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'valor' && oldVal !== newVal) {
            this.seleccionado = newVal || '';
        }
        if (oldVal !== newVal && this.shadowRoot.innerHTML !== '') {
            this.render();
        }
    }

    _cerrarAlClickFuera(e) {
        if (this.abierto && !e.composedPath().includes(this)) {
            this.abierto = false;
            this.render();
        }
    }

    render() {
        const placeholder = this.getAttribute('placeholder') || 'Input text';
        const opcionesAttr = this.getAttribute('opciones') || 'Item 1,Item 2,Item 3,Item 4';
        const listaOpciones = opcionesAttr.split(',').map((op) => op.trim()).filter(Boolean);
        const textoActual = this.seleccionado || placeholder;

        const archivoFlecha = `Icono=Desplegable, Estado=${this.abierto ? 'Abierto' : 'Cerrado'}.svg`;
        const rutaFlecha = new URL(`../assets/iconos/${encodeURIComponent(archivoFlecha)}`, import.meta.url).href;
        const archivoCheck = 'Icono=PalomitaMenu, Estado=Visible.svg';
        const rutaCheck = new URL(`../assets/iconos/${encodeURIComponent(archivoCheck)}`, import.meta.url).href;

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    max-width: 453px;
                }

                *, *::before, *::after {
                    box-sizing: border-box;
                }

                .contenedor {
                    position: relative;
                    width: 100%;
                    font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                    user-select: none;
                }

                .caja-select {
                    width: 100%;
                    min-height: 40px;
                    padding: 8px 14px;
                    background-color: #FFFFFF;
                    border: 2px solid #714BBC;
                    border-radius: 5px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 10px;
                    cursor: pointer;
                }

                .texto-caja {
                    font-size: 16px;
                    color: #222222;
                }

                .icono-flecha {
                    width: 20px;
                    height: 20px;
                    object-fit: contain;
                    flex-shrink: 0;
                }

                .lista-opciones {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    background-color: #FFFFFF;
                    border: 1px solid #A8A8A8;
                    z-index: 100;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(-4px);
                    transition: opacity 100ms ease-out, transform 100ms ease-out, visibility 100ms ease-out;
                }

                .lista-opciones.visible {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0);
                }

                .opcion-item {
                    width: 100%;
                    padding: 10px 12px;
                    background-color: #FFFFFF;
                    border-bottom: 1px solid #A8A8A8;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 10px;
                    font-size: 16px;
                    color: #222222;
                    cursor: pointer;
                    transition: background-color 100ms ease-out;
                }

                .opcion-item:last-child {
                    border-bottom: none;
                }

                .opcion-item:hover {
                    background-color: #B4BEE0;
                }

                .opcion-item.seleccionada {
                    background-color: #DFE1F2;
                }

                .icono-check {
                    width: 18px;
                    height: 18px;
                    object-fit: contain;
                    flex-shrink: 0;
                }
                    
                .texto-caja,
                .opcion-item {
                    font-size: 13.5px;
                }
            </style>

            <div class="contenedor" id="contenedor">
                <div class="caja-select" id="trigger">
                    <span class="texto-caja">${textoActual}</span>
                    <img class="icono-flecha" src="${rutaFlecha}" alt="Desplegar">
                </div>

                <div class="lista-opciones ${this.abierto ? 'visible' : ''}" id="lista">
                    ${listaOpciones.map((op) => {
                        const esSeleccionada = op === this.seleccionado;
                        return `
                            <div class="opcion-item ${esSeleccionada ? 'seleccionada' : ''}" data-valor="${op}">
                                <span>${op}</span>
                                ${esSeleccionada ? `<img class="icono-check" src="${rutaCheck}" alt="Seleccionado">` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;

        const trigger = this.shadowRoot.getElementById('trigger');
        const items = this.shadowRoot.querySelectorAll('.opcion-item');

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.abierto = !this.abierto;
            this.render();
        });

        items.forEach((item) => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                this.seleccionado = item.getAttribute('data-valor');
                this.setAttribute('valor', this.seleccionado);
                this.abierto = false;
                this.render();
                this.dispatchEvent(new CustomEvent('cambio-opcion', {
                    detail: { valor: this.seleccionado },
                    bubbles: true,
                    composed: true
                }));
            });
        });
    }

    get value() {
        return this.seleccionado;
    }
}

customElements.define('campo-desplegable', CampoDesplegable);