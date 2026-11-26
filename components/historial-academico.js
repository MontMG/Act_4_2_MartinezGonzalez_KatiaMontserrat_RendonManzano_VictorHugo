class HistorialAcademico extends HTMLElement {
    static get observedAttributes() {
        return ['materia', 'profesor', 'periodo'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && this.shadowRoot.innerHTML !== '') {
            this.render();
        }
    }

    render() {
        const materia = this.getAttribute('materia') || 'Estructura de Datos I';
        const profesor = this.getAttribute('profesor') || 'Profesor: Luis Alejandro García';
        const periodo = this.getAttribute('periodo') || '2024-2025 / I';

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
                    max-width: 633px;
                    min-height: 63px;
                    border-radius: 8px;
                    background-color: #B9B9B9;
                    padding: 8px 14px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    gap: 4px;
                    font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                }

                .fila-superior {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 12px;
                }

                .materia,
                .periodo {
                    font-size: 20px;
                    font-weight: 600;
                    line-height: 1.15;
                    color: #000000;
                }

                .periodo {
                    white-space: nowrap;
                    flex-shrink: 0;
                }

                .profesor {
                    font-size: 20px;
                    font-weight: 400;
                    line-height: 1.15;
                    color: #000000;
                }

                @media (max-width: 600px) {
                    .fila-superior {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 2px;
                    }

                    .materia,
                    .periodo,
                    .profesor {
                        font-size: 16px;
                    }
                }
            </style>

            <div class="tarjeta">
                <div class="fila-superior">
                    <span class="materia">${materia}</span>
                    <span class="periodo">${periodo}</span>
                </div>
                <span class="profesor">${profesor}</span>
            </div>
        `;
    }
}

customElements.define('historial-academico', HistorialAcademico);