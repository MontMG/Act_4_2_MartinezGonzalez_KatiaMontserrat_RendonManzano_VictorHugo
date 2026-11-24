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
                    display: inline-block;
                }

                .calendario {
                    box-sizing: border-box;
                    width: 672px;
                    height: 702px;
                    border-radius: 12px;
                    background: #E2E7EF;
                    padding: 22px 34px 28px 34px;
                    display: flex;
                    flex-direction: column;
                }

                .mes-titulo {
                    margin: 0;
                    text-align: center;
                    color: #000000;
                    font-family: 'Inter', sans-serif;
                    font-size: 28.437px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: 45.5px; /* 160% */
                }

                .dias-semana {
                    margin-top: 60.5px; /* 22px + 45.5px + 60.5px = 128px desde el borde superior */
                    display: grid;
                    grid-template-columns: repeat(7, 73px);
                    column-gap: 15.5px;
                    justify-content: center;
                }

                .dia-semana-label {
                    text-align: center;
                    color: #000000;
                    font-family: 'Inter', sans-serif;
                    font-size: 28.437px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 45.5px; /* 160% */
                }

                .cuadricula-dias {
                    margin-top: 28px;
                    display: grid;
                    grid-template-columns: repeat(7, 73px);
                    column-gap: 15.5px;
                    row-gap: 18px;
                    justify-content: center;
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