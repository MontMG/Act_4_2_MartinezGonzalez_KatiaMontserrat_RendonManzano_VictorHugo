class TarjetaCalificacion extends HTMLElement {
    static get observedAttributes() {
        return ['materia', 'grupo', 'calificacion', 'parcial1', 'parcial2', 'parcial3', 'tareas', 'final'];
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

        this.dispatchEvent(new CustomEvent('tarjeta-toggle', {
            detail: {
                materia: this.getAttribute('materia') || 'Criptografía',
                abierta: this.abierta
            },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        const materia = this.getAttribute('materia') || 'Criptografía';
        const grupo = this.getAttribute('grupo') || 'Grupo 202401 - 7mo semestre';
        const calificacion = this.getAttribute('calificacion') || '';
        const calificada = calificacion.trim() !== '';

        const archivoFlecha = 'Icono=Desplegable, Estado=Cerrado.svg';
        const rutaFlecha = new URL(`../assets/iconos/${encodeURIComponent(archivoFlecha)}`, import.meta.url).href;

        const filas = [
            { nombre: 'Parcial 1', valor: this.getAttribute('parcial1') || '90' },
            { nombre: 'Parcial 2', valor: this.getAttribute('parcial2') || '80' },
            { nombre: 'Parcial 3', valor: this.getAttribute('parcial3') || '80' },
            { nombre: 'Tareas', valor: this.getAttribute('tareas') || '95' },
            { nombre: 'Examen final', valor: this.getAttribute('final') || '70' }
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
                    max-width: 627px;
                    margin: 0 auto;
                    background-color: #FFFFFF;
                    border: 1px solid #E0E0E0;
                    border-radius: 8px;
                    font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                    overflow: hidden;
                    cursor: ${calificada ? 'pointer' : 'default'};
                    transition: box-shadow 180ms ease-out;
                }

                ${calificada ? `
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

                .info-materia {
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

                .cuadro-nota {
                    width: 120px;
                    height: 120px;
                    flex-shrink: 0;
                    border-radius: 8px;
                    background-color: ${calificada ? '#E7FFD4' : '#BCBCBC'};
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                .nota-numero {
                    font-size: 24px;
                    font-weight: 700;
                    color: #111111;
                    line-height: 1.1;
                }

                .nota-etiqueta {
                    font-size: 12px;
                    font-weight: 600;
                    color: #222222;
                    margin-top: 2px;
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

                .fila-eval {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 4px 12px;
                    font-size: 18px;
                    color: #222222;
                }

                @media (max-width: 500px) {
                    .cabecera {
                        min-height: 100px;
                    }

                    .info-materia {
                        padding: 12px 14px;
                    }

                    .titulo {
                        font-size: 18px;
                    }

                    .subtitulo {
                        font-size: 12px;
                    }

                    .cuadro-nota {
                        width: 96px;
                        height: 98px;
                    }

                    .nota-numero {
                        font-size: 20px;
                    }

                    .fila-eval {
                        font-size: 15px;
                    }
                }
            </style>

            <article
                class="tarjeta ${this.abierta && calificada ? 'abierta' : ''}"
                id="card"
                ${calificada ? `role="button" tabindex="0" aria-expanded="${this.abierta}"` : ''}
            >
                <div class="cabecera">
                    <div class="info-materia">
                        <span class="titulo">${materia}</span>
                        <span class="subtitulo">${grupo}</span>
                    </div>

                    ${calificada ? `<img class="flecha" src="${rutaFlecha}" alt="Desplegar desglose">` : ''}

                    <div class="cuadro-nota">
                        ${calificada ? `
                            <span class="nota-numero">${calificacion}</span>
                            <span class="nota-etiqueta">Acumulado</span>
                        ` : ''}
                    </div>
                </div>

                ${calificada ? `
                    <div class="desglose">
                        ${filas.map((f) => `
                            <div class="fila-eval">
                                <span>${f.nombre}</span>
                                <span>${f.valor}</span>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </article>
        `;

        if (calificada) {
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

customElements.define('tarjeta-calificacion', TarjetaCalificacion);