import './botones.js';

class TarjetaMateria extends HTMLElement {
    static get observedAttributes() {
        return ['materia', 'profesor', 'horario', 'estatus', 'archivo-pdf'];
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
        const materia = this.getAttribute('materia') || 'Criptografía (202401)';
        const profesor = this.getAttribute('profesor') || 'Profesor: Juana Patricia Gutierrez';
        const horario = this.getAttribute('horario') || 'Horario: Lunes-Viernes 7:00 AM - 8:00 AM (I-12)';
        const estatus = this.getAttribute('estatus') || 'INSCRITO';
        const archivoPdf = this.getAttribute('archivo-pdf') || '';

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
                    max-width: 888px;
                    min-height: 124px;
                    border-radius: 8px;
                    background-color: #B1C9EF;
                    padding: 15px 21px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 16px;
                    font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                }

                .info-materia {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    min-width: 0;
                    flex: 1;
                }

                .titulo {
                    font-size: 24px;
                    font-weight: 600;
                    line-height: 1.15;
                    color: #000000;
                }

                .detalle {
                    font-size: 20px;
                    font-weight: 200;
                    line-height: 1.2;
                    color: #000000;
                }

                .acciones {
                    display: flex;
                    align-items: center;
                    gap: 17px;
                    flex-shrink: 0;
                }

                .badge-estatus {
                    width: 132px;
                    height: 40px;
                    border-radius: 8px;
                    background-color: #DBF8D5;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    font-weight: 600;
                    line-height: 100%;
                    color: #258A11;
                }

                boton-accion {
                    --btn-width: 144px;
                    --btn-height: 87px;
                    --btn-padding: 6px 8px;
                    --btn-radius: 10px;
                    --btn-texto-height: auto;
                    --btn-font-size: 20px;
                    --btn-font-weight: 400;
                    --btn-line-height: 1.15;
                }

                @media (max-width: 720px) {
                    .tarjeta {
                        flex-direction: column;
                        align-items: flex-start;
                        padding: 16px;
                    }

                    .titulo {
                        font-size: 20px;
                    }

                    .detalle {
                        font-size: 16px;
                    }

                    .acciones {
                        width: 100%;
                        justify-content: space-between;
                        flex-wrap: wrap;
                    }

                    .badge-estatus {
                        font-size: 16px;
                        height: 36px;
                        width: 115px;
                    }

                    boton-accion {
                        --btn-width: auto;
                        --btn-height: 52px;
                        --btn-padding: 8px 14px;
                        --btn-font-size: 16px;
                    }
                }
            </style>

            <div class="tarjeta">
                <div class="info-materia">
                    <span class="titulo">${materia}</span>
                    <span class="detalle">${profesor}</span>
                    <span class="detalle">${horario}</span>
                </div>

                <div class="acciones">
                    <div class="badge-estatus">${estatus}</div>
                    <boton-accion
                        id="btn-pdf"
                        texto="Descargar plan de estudios"
                        tipo="primario">
                    </boton-accion>
                </div>
            </div>
        `;

        const btn = this.shadowRoot.getElementById('btn-pdf');
        btn.addEventListener('accion-click', () => {
            if (btn.hasAttribute('disabled')) return;
            btn.setAttribute('disabled', '');
            btn.setAttribute('texto', 'Descargando...');

            this.dispatchEvent(new CustomEvent('descargar-plan', {
                detail: { materia, archivoPdf },
                bubbles: true,
                composed: true
            }));

            setTimeout(() => {
                if (archivoPdf) {
                    const enlace = document.createElement('a');
                    enlace.href = archivoPdf;
                    enlace.download = `${materia.replace(/\s+/g, '_')}.pdf`;
                    enlace.click();
                }
                btn.removeAttribute('disabled');
                btn.setAttribute('texto', 'Descargar plan de estudios');
            }, 800);
        });
    }
}

customElements.define('tarjeta-materia', TarjetaMateria);