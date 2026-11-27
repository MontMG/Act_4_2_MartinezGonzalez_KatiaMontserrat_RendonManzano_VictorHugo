import './menu-navegacion.js';
import './tarjeta-notificacion.js';

const ICONO_ALERTA = new URL('../assets/iconos/iconos-alerta.svg', import.meta.url).href;
const ICONO_SALIDA = new URL('../assets/iconos/iconos-salida.svg', import.meta.url).href;

class BarraNavegacion extends HTMLElement {
    static get observedAttributes() {
        return ['activo', 'salida-href'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._cerrarAlClicAfuera = this._cerrarAlClicAfuera.bind(this);
    }

    connectedCallback() {
        this.render();
        this._actualizarVista();
        this._bindEvents();
        this._actualizarPuntoAlerta();
        document.addEventListener('click', this._cerrarAlClicAfuera);
    }

    disconnectedCallback() {
        document.removeEventListener('click', this._cerrarAlClicAfuera);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && this.shadowRoot.querySelector('.barra-menu')) {
            this._actualizarVista();
        }
    }

    _cerrarAlClicAfuera() {
        const moduloAvisos = this.shadowRoot.getElementById('modulo-avisos');
        if (moduloAvisos) {
            moduloAvisos.classList.remove('abierto');
        }
    }

    _actualizarVista() {
        const menu = this.shadowRoot.getElementById('menu-labels');
        const linkSalida = this.shadowRoot.getElementById('link-salida');

        if (menu) {
            const activo = this.getAttribute('activo') || '';
            if (activo) {
                menu.setAttribute('activo', activo);
            } else {
                menu.removeAttribute('activo');
            }
        }

        if (linkSalida) {
            linkSalida.href = this.getAttribute('salida-href') || '../index.html';
        }
    }

    _actualizarPuntoAlerta() {
        const moduloAvisos = this.shadowRoot.getElementById('modulo-avisos');
        const puntoAlerta = this.shadowRoot.getElementById('punto-alerta');
        if (!moduloAvisos || !puntoAlerta) return;

        const tarjetas = moduloAvisos.querySelectorAll('tarjeta-notificacion');
        const hayNoLeidas = Array.from(tarjetas).some(
            (tarjeta) => (tarjeta.getAttribute('tipo') || 'informativa').toLowerCase() !== 'leido'
        );

        puntoAlerta.classList.toggle('oculto', !hayNoLeidas);
    }

    _bindEvents() {
        const btnNotificaciones = this.shadowRoot.getElementById('btn-notificaciones');
        const moduloAvisos = this.shadowRoot.getElementById('modulo-avisos');

        btnNotificaciones.addEventListener('click', (e) => {
            e.stopPropagation();
            moduloAvisos.classList.toggle('abierto');
        });

        moduloAvisos.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        moduloAvisos.addEventListener('notificacion-leida', () => this._actualizarPuntoAlerta());
        moduloAvisos.addEventListener('notificacion-accion', () => this._actualizarPuntoAlerta());
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

                .barra-menu {
                    position: relative;
                    width: 100%;
                    background-color: #CCCCCC;
                    padding: 8px 28px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 16px;
                }

                .barra-acciones {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    flex-shrink: 0;
                }

                .btn-icono {
                    position: relative;
                    background: transparent;
                    border: none;
                    padding: 2px;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                }

                .btn-icono img {
                    width: 26px;
                    height: 26px;
                    object-fit: contain;
                    display: block;
                }

                .punto-alerta {
                    position: absolute;
                    top: -1px;
                    right: -1px;
                    width: 9px;
                    height: 9px;
                    border-radius: 50%;
                    background-color: #DF0000;
                }

                .punto-alerta.oculto {
                    display: none;
                }

                .modulo-avisos {
                    display: none;
                    position: absolute;
                    top: calc(100% + 6px);
                    right: 28px;
                    width: 380px;
                    max-width: calc(100vw - 32px);
                    background-color: #FFFFFF;
                    border: 1px solid #CCCCCC;
                    border-radius: 8px;
                    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.14);
                    overflow: hidden;
                    z-index: 200;
                }

                .modulo-avisos.abierto {
                    display: block;
                }

                .modulo-avisos-titulo {
                    margin: 0;
                    padding: 12px 14px;
                    font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                    font-size: 15px;
                    font-weight: 600;
                    color: #000000;
                }

                .modulo-avisos-lista {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    padding: 0 10px 12px;
                }

                @media (max-width: 640px) {
                    .barra-menu {
                        padding: 6px 12px;
                        gap: 8px;
                    }

                    .barra-acciones {
                        gap: 10px;
                    }

                    .btn-icono img {
                        width: 22px;
                        height: 22px;
                    }

                    .modulo-avisos {
                        right: 12px;
                    }
                }
            </style>

            <nav class="barra-menu">
                <menu-navegacion id="menu-labels"></menu-navegacion>

                <div class="barra-acciones">
                    <button type="button" class="btn-icono" id="btn-notificaciones" aria-label="Notificaciones">
                        <img src="${ICONO_ALERTA}" alt="Notificaciones" />
                        <span class="punto-alerta" id="punto-alerta" aria-hidden="true"></span>
                    </button>
                    <a id="link-salida" href="../index.html" class="btn-icono" aria-label="Cerrar sesión">
                        <img src="${ICONO_SALIDA}" alt="Cerrar sesión" />
                    </a>
                </div>

                <aside class="modulo-avisos" id="modulo-avisos" aria-label="Módulo de avisos">
                    <h3 class="modulo-avisos-titulo">Módulo de avisos</h3>
                    <div class="modulo-avisos-lista" id="lista-notificaciones">
                        <tarjeta-notificacion
                            tipo="informativa"
                            texto="Se publicaron tus calificaciones del segundo parcial.">
                        </tarjeta-notificacion>
                        <tarjeta-notificacion
                            tipo="accion"
                            texto="Tienes un trámite pendiente de entrega."
                            texto-accion="Ver actividad"
                            href="tramites.html">
                        </tarjeta-notificacion>
                        <tarjeta-notificacion
                            tipo="leido"
                            texto="Tu inscripción al ciclo actual fue confirmada.">
                        </tarjeta-notificacion>
                    </div>
                </aside>
            </nav>
        `;
    }
}

customElements.define('barra-navegacion', BarraNavegacion);