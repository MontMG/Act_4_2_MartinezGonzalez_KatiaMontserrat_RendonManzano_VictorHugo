const LOGO_DEFAULT = new URL('../assets/logoFacultad.png', import.meta.url).href;
const FOTO_DEFAULT = new URL('../assets/foto.png', import.meta.url).href;

class PortalHeader extends HTMLElement {
    static get observedAttributes() {
        return ['nombre', 'matricula', 'promedio', 'creditos', 'estatus', 'avance', 'logo', 'foto'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this._actualizarVista();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && this.shadowRoot.querySelector('header')) {
            this._actualizarVista();
        }
    }

    _actualizarVista() {
        const root = this.shadowRoot;
        const logoEl = root.getElementById('logo-facultad');
        const fotoEl = root.getElementById('foto-perfil');

        logoEl.src = this.getAttribute('logo') || LOGO_DEFAULT;
        fotoEl.src = this.getAttribute('foto') || FOTO_DEFAULT;

        root.getElementById('dato-nombre').textContent = this.getAttribute('nombre') || 'Mariana Hernández López';
        root.getElementById('dato-id').textContent = this.getAttribute('matricula') || '123456789';
        root.getElementById('dato-promedio').textContent = this.getAttribute('promedio') || '8.8';
        root.getElementById('dato-creditos').textContent = this.getAttribute('creditos') || '182 / 240';
        root.getElementById('dato-estatus').textContent = this.getAttribute('estatus') || 'Inscrito (Ciclo 2026-2027 / I)';
        root.getElementById('dato-avance').textContent = this.getAttribute('avance') || '80%';
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                }

                *, *::before, *::after {
                    box-sizing: border-box;
                }

                .header-usuario {
                    width: 100%;
                    min-height: 112px;
                    background: #395886;
                    color: #FFFFFF;
                    padding: 14px 28px;
                    display: flex;
                    align-items: center;
                    gap: 24px;
                }

                .identidad {
                    display: flex;
                    align-items: center;
                    flex-shrink: 0;
                }

                .logo-facultad {
                    height: 68px;
                    width: auto;
                    display: block;
                }

                .datos-grid {
                    display: flex;
                    align-items: center;
                    gap: 24px;
                    flex: 1;
                    min-width: 0;
                    color: #FFFFFF;
                    font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 1.4;
                }

                .foto-perfil {
                    height: 70px;
                    width: auto;
                    display: block;
                    flex-shrink: 0;
                }

                .datos-texto {
                    display: flex;
                    align-items: flex-start;
                    flex-wrap: wrap;
                    gap: 6px 24px;
                    min-width: 0;
                }

                .datos-columna {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                .datos-grid strong {
                    color: #FFFFFF;
                    font-weight: 600;
                }

                /* Tablet: una sola columna de datos junto a la foto */
                @media (max-width: 1024px) {
                    .header-usuario {
                        padding: 12px 18px;
                        gap: 16px;
                        min-height: 100px;
                    }

                    .logo-facultad {
                        height: 58px;
                    }

                    .foto-perfil {
                        height: 68px;
                    }

                    .datos-grid {
                        gap: 14px;
                        font-size: 12px;
                        line-height: 1.35;
                    }

                    .datos-texto {
                        flex-direction: column;
                        gap: 2px;
                    }
                }

                /* Celular: fila compacta sin desbordar */
                @media (max-width: 640px) {
                    .header-usuario {
                        padding: 10px 12px;
                        gap: 10px;
                        min-height: auto;
                    }

                    .logo-facultad {
                        height: 46px;
                    }

                    .foto-perfil {
                        height: 54px;
                    }

                    .datos-grid {
                        gap: 10px;
                        font-size: 9.5px;
                        line-height: 1.3;
                    }
                }
            </style>

            <header class="header-usuario">
                <div class="identidad">
                    <img id="logo-facultad" class="logo-facultad" alt="Escudo Facultad de Ingeniería" />
                </div>

                <div class="datos-grid">
                    <img id="foto-perfil" class="foto-perfil" alt="Foto de Perfil" />

                    <div class="datos-texto">
                        <div class="datos-columna">
                            <div>NOMBRE ALUMNO: <strong id="dato-nombre"></strong></div>
                            <div>ID: <strong id="dato-id"></strong></div>
                        </div>

                        <div class="datos-columna">
                            <div>PROMEDIO GENERAL: <strong id="dato-promedio"></strong></div>
                            <div>CRÉDITOS ACUMULADOS: <strong id="dato-creditos"></strong></div>
                            <div>ESTATUS DE INSCRIPCIÓN DEL PERIODO ACTUAL: <strong id="dato-estatus"></strong></div>
                            <div>PORCENTAJE DE AVANCE: <strong id="dato-avance"></strong></div>
                        </div>
                    </div>
                </div>
            </header>
        `;
    }
}

customElements.define('portal-header', PortalHeader);