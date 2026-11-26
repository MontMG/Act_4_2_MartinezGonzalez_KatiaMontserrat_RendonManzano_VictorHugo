class TarjetaTramite extends HTMLElement {
    static get observedAttributes() {
        return ['tramite', 'clave', 'estado', 'requisitos', 'fecha', 'costo', 'lugar', 'folio'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.abierta = false;
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && this.shadowRoot.innerHTML !== '') {
            this.render();
        }
    }

    _alternarDesglose() {
        const tarjeta = this.shadowRoot.getElementById('card');
        if (!tarjeta) return;

        this.abierta = !this.abierta;
        tarjeta.classList.toggle('abierta', this.abierta);
        tarjeta.setAttribute('aria-expanded', String(this.abierta));

        this.dispatchEvent(new CustomEvent('tramite-toggle', {
            detail: {
                tramite: this.getAttribute('tramite') || 'Kardex',
                abierta: this.abierta
            },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        const tramite = this.getAttribute('tramite') || 'Kardex';
        const clave = this.getAttribute('clave') || 'TR-2026-200';
        const estado = this.getAttribute('estado') || '';
        const completado = estado.trim().toLowerCase() === 'completado';

        const archivoFlecha = 'Icono=Desplegable, Estado=Cerrado.svg';
        const rutaFlecha = new URL(`../assets/iconos/${encodeURIComponent(archivoFlecha)}`, import.meta.url).href;

        const filas = [
            { nombre: 'Requisitos entregados:', valor: this.getAttribute('requisitos') || 'Entregados' },
            { nombre: 'Fecha de solicitud:', valor: this.getAttribute('fecha') || '07/09/26' },
            { nombre: 'Costo:', valor: this.getAttribute('costo') || '$70' },
            { nombre: 'Lugar de entrega:', valor: this.getAttribute('lugar') || 'Oficinas' },
            { nombre: 'Folio:', valor: this.getAttribute('folio') || '457890' }
        ];

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                }

                *, *::before, *::after {
                    box-sizing: border-box;
                }

                .tarjeta {
                    width: 100%;
                    max-width: 605px;
                    margin: 0 auto;
                    background-color: #FFFFFF;
                    border: 1px solid #E0E0E0;
                    border-radius: 8px;
                    font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                    overflow: hidden;
                    cursor: ${completado ? 'pointer' : 'default'};
                    transition: box-shadow 180ms ease-out;
                }

                ${completado ? `
                .tarjeta:hover {
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                }
                ` : ''}

                .cabecera {
                    min-height: 122px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1px;
                    position: relative;
                }

                .info-tramite {
                    flex: 1;
                    min-width: 0;
                    padding: 16px 20px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    gap: 4px;
                }

                .titulo {
                    font-size: 22px;
                    font-weight: 700;
                    color: #111111;
                    line-height: 1.2;
                }

                .subtitulo {
                    font-size: 14px;
                    font-weight: 600;
                    color: #333333;
                }

                .flecha {
                    width: 22px;
                    height: 22px;
                    flex-shrink: 0;
                    align-self: flex-end;
                    margin-bottom: 10px;
                    margin-right: 8px;
                    transition: transform 220ms ease-out;
                    transform: rotate(0deg);
                }

                .tarjeta.abierta .flecha {
                    transform: rotate(180deg);
                }

                .cuadro-estado {
                    width: 120px;
                    height: 120px;
                    flex-shrink: 0;
                    border-radius: 8px;
                    background-color: ${completado ? '#E7FFD4' : '#BCBCBC'};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 6px;
                    text-align: center;
                }

                .estado-texto {
                    font-size: 14px;
                    font-weight: 700;
                    color: #111111;
                }

                .desglose {
                    max-height: 0;
                    opacity: 0;
                    padding: 0 9px;
                    border-top: 1px solid transparent;
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                    overflow: hidden;
                    transition: max-height 240ms ease-out, opacity 200ms ease-out, padding 200ms ease-out, border-color 200ms ease-out;
                }

                .tarjeta.abierta .desglose {
                    max-height: 360px;
                    opacity: 1;
                    padding: 13px 9px;
                    border-top-color: #E0E0E0;
                }

                .fila-detalle {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 12px;
                    padding: 4px 12px;
                    font-size: 18px;
                    color: #222222;
                }

                @media (max-width: 500px) {
                    .cabecera {
                        min-height: 100px;
                    }

                    .info-tramite {
                        padding: 12px 14px;
                    }

                    .titulo {
                        font-size: 18px;
                    }

                    .subtitulo {
                        font-size: 12px;
                    }

                    .cuadro-estado {
                        width: 96px;
                        height: 98px;
                    }

                    .estado-texto {
                        font-size: 12px;
                    }

                    .fila-detalle {
                        font-size: 15px;
                    }
                }
            </style>

            <article
                class="tarjeta ${this.abierta && completado ? 'abierta' : ''}"
                id="card"
                ${completado ? `role="button" tabindex="0" aria-expanded="${this.abierta}"` : ''}
            >
                <div class="cabecera">
                    <div class="info-tramite">
                        <span class="titulo">${tramite}</span>
                        <span class="subtitulo">${clave}</span>
                    </div>

                    ${completado ? `<img class="flecha" src="${rutaFlecha}" alt="Desplegar detalles">` : ''}

                    <div class="cuadro-estado">
                        ${completado ? `<span class="estado-texto">Completado</span>` : ''}
                    </div>
                </div>

                ${completado ? `
                    <div class="desglose">
                        ${filas.map((f) => `
                            <div class="fila-detalle">
                                <span>${f.nombre}</span>
                                <span>${f.valor}</span>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </article>
        `;

        if (completado) {
            const card = this.shadowRoot.getElementById('card');
            card.addEventListener('click', () => this._alternarDesglose());
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this._alternarDesglose();
                }
            });
        }
    }
}

customElements.define('tarjeta-tramite', TarjetaTramite);