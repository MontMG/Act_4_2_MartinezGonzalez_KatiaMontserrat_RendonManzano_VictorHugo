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
                    max-width: 660px;
                    min-height: 86px;
                    border-radius: 8px;
                    background-color: #B1C9EF;
                    padding: 12px 16px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 14px;
                    font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                }

                .info-materia {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    min-width: 0;
                    flex: 1;
                }

                .titulo {
                    font-size: 16px;
                    font-weight: 600;
                    line-height: 1.2;
                    color: #000000;
                }

                .detalle {
                    font-size: 13px;
                    font-weight: 300;
                    line-height: 1.25;
                    color: #000000;
                }

                .acciones {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    flex-shrink: 0;
                }

                .badge-estatus {
                    width: 92px;
                    height: 30px;
                    border-radius: 6px;
                    background-color: #DBF8D5;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 13px;
                    font-weight: 600;
                    line-height: 1;
                    color: #258A11;
                }

                /* Si estás usando <boton-accion> */
                boton-accion {
                    --btn-width: 112px;
                    --btn-height: 62px;
                    --btn-padding: 4px 6px;
                    --btn-radius: 8px;
                    --btn-texto-height: auto;
                    --btn-font-size: 13px;
                    --btn-font-weight: 400;
                    --btn-line-height: 1.15;
                }

                /* Respaldo por si dejaste el <button class="btn-descargar"> original */
                .btn-descargar {
                    width: 112px;
                    height: 62px;
                    border-radius: 8px;
                    padding: 4px 6px;
                    border: none;
                    background-color: #628ECB;
                    color: #FFFFFF;
                    font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                    font-size: 13px;
                    font-weight: 400;
                    line-height: 1.15;
                    text-align: center;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 300ms ease-out;
                }

                .btn-descargar:hover:not(:disabled) {
                    background-color: #395886;
                }

                .btn-descargar:disabled {
                    background-color: #D5DEEC;
                    color: #395886;
                    cursor: wait;
                }

                @media (max-width: 720px) {
                    .tarjeta {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .acciones {
                        width: 100%;
                        justify-content: space-between;
                        flex-wrap: wrap;
                    }

                    boton-accion {
                        --btn-width: auto;
                        --btn-height: 40px;
                        --btn-padding: 6px 12px;
                    }

                    .btn-descargar {
                        width: auto;
                        height: 40px;
                        padding: 6px 12px;
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