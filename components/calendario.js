import './dias.js';

class MiCalendario extends HTMLElement {
    static get observedAttributes() {
        return ['mes', 'dias', 'eventos'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._diaSeleccionadoEl = null;
    }

    connectedCallback() {
        this.render();
        this._bindEvents();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && this.isConnected) {
            this._diaSeleccionadoEl = null;
            this.render();
            this._bindEvents();
        }
    }

    _obtenerDiasConEvento() {
        const attr = this.getAttribute('eventos') || '';
        return new Set(
            attr
                .split(',')
                .map((valor) => Number(valor.trim()))
                .filter((num) => !Number.isNaN(num) && num > 0)
        );
    }

    _bindEvents() {
        const cuadricula = this.shadowRoot.querySelector('.cuadricula-dias');
        if (!cuadricula) return;

        cuadricula.addEventListener('dia-evento-click', (e) => {
            const diaClickeado = e.target;

            // Si había otro día seleccionado, regresa a su variante "evento"
            if (this._diaSeleccionadoEl && this._diaSeleccionadoEl !== diaClickeado) {
                this._diaSeleccionadoEl.setAttribute('variante', 'evento');
            }

            // Cambia el día actual a "seleccionado"
            diaClickeado.setAttribute('variante', 'seleccionado');
            this._diaSeleccionadoEl = diaClickeado;

            // Notifica al documento principal para mostrar los eventos en el panel HTML
            this.dispatchEvent(new CustomEvent('dia-seleccionado', {
                detail: {
                    dia: e.detail.dia,
                    mes: this.getAttribute('mes') || 'Noviembre'
                },
                bubbles: true,
                composed: true
            }));
        });
    }

    render() {
        const mes = this.getAttribute('mes') || 'Noviembre';
        const totalDias = Number(this.getAttribute('dias')) || 31;
        const diasEvento = this._obtenerDiasConEvento();
        const diasSemana = ['Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Vie', 'Sab'];

        let diasHTML = '';
        for (let i = 1; i <= totalDias; i++) {
            const variante = diasEvento.has(i) ? 'evento' : 'normal';
            diasHTML += `<dia-calendario numero="${i}" variante="${variante}"></dia-calendario>`;
        }

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                }

                .calendario {
                    box-sizing: border-box;
                    width: 468px;
                    max-width: 100%;
                    height: 468px;
                    border-radius: 12px;
                    background: #E2E7EF;
                    padding: 20px 24px 22px 24px;
                    display: flex;
                    flex-direction: column;
                }

                .mes-titulo {
                    margin: 0;
                    text-align: center;
                    color: #000000;
                    font-family: 'Inter', sans-serif;
                    font-size: 22px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: 1.3;
                }

                .dias-semana {
                    margin-top: 22px;
                    display: grid;
                    grid-template-columns: repeat(7, minmax(0, 1fr));
                    column-gap: 9px;
                }

                .dia-semana-label {
                    text-align: center;
                    color: #000000;
                    font-family: 'Inter', sans-serif;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 1.4;
                }

                .cuadricula-dias {
                    margin-top: 14px;
                    display: grid;
                    grid-template-columns: repeat(7, minmax(0, 1fr));
                    column-gap: 9px;
                    row-gap: 11px;
                }

                @media (max-width: 1100px) {
                    .calendario {
                        width: 100%;
                        height: auto;
                    }
                }

                @media (max-width: 640px) {
                    .calendario {
                        padding: 16px 12px 18px;
                    }

                    .mes-titulo {
                        font-size: 18px;
                    }

                    .dias-semana {
                        margin-top: 14px;
                        column-gap: 6px;
                    }

                    .dia-semana-label {
                        font-size: 12.5px;
                    }

                    .cuadricula-dias {
                        margin-top: 10px;
                        column-gap: 6px;
                        row-gap: 8px;
                    }
                }
            </style>

            <section class="calendario" aria-label="Calendario de ${mes}">
                <h2 class="mes-titulo">${mes}</h2>

                <div class="dias-semana">
                    ${diasSemana.map((dia) => `<span class="dia-semana-label">${dia}</span>`).join('')}
                </div>

                <div class="cuadricula-dias">
                    ${diasHTML}
                </div>
            </section>
        `;
    }
}

customElements.define('mi-calendario', MiCalendario);