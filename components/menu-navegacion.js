import './boton-menu.js';

class MenuNavegacion extends HTMLElement {
    static get observedAttributes() {
        return ['activo'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._cerrarAlClicAfuera = (e) => {
            if (!e.composedPath().includes(this)) {
                this._cerrarDropdown();
            }
        };
    }

    connectedCallback() {
        this.render();
        this._bindEvents();
        this._actualizarActivos();
        document.addEventListener('click', this._cerrarAlClicAfuera);
    }

    disconnectedCallback() {
        document.removeEventListener('click', this._cerrarAlClicAfuera);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && this.shadowRoot.querySelector('.nav-links')) {
            this._actualizarActivos();
        }
    }

    _esSeccionAlumno() {
        const activo = (this.getAttribute('activo') || '').toLowerCase();
        return ['alumno', 'horario', 'calificaciones', 'materias'].includes(activo);
    }

    _actualizarActivos() {
        const activo = (this.getAttribute('activo') || 'inicio').toLowerCase();
        const btnAlumno = this.shadowRoot.getElementById('btn-alumno');
        const btnTramites = this.shadowRoot.getElementById('btn-tramites');
        const btnInicio = this.shadowRoot.getElementById('btn-inicio');
        const dropdown = this.shadowRoot.getElementById('menu-alumno');

        const alumnoAbiertoOActivo = this._esSeccionAlumno() || dropdown.classList.contains('open');

        btnAlumno.setAttribute('estado', alumnoAbiertoOActivo ? 'activo' : 'normal');
        btnTramites.setAttribute('estado', activo === 'tramites' ? 'activo' : 'normal');
        btnInicio.setAttribute('estado', activo === 'inicio' ? 'activo' : 'normal');
    }

    _cerrarDropdown() {
        const dropdown = this.shadowRoot.getElementById('menu-alumno');
        if (!dropdown) return;
        dropdown.classList.remove('open');
        this._actualizarActivos();
    }

    _bindEvents() {
        const btnAlumno = this.shadowRoot.getElementById('btn-alumno');
        const dropdown = this.shadowRoot.getElementById('menu-alumno');

        btnAlumno.addEventListener('menu-click', () => {
            dropdown.classList.toggle('open');
            this._actualizarActivos();
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                }

                .nav-links {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                }

                .item-desplegable {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                }

                .dropdown {
                    position: absolute;
                    top: calc(100% + 6px);
                    left: 0;
                    background: #FFFFFF;
                    border: 1px solid #CCCCCC;
                    border-radius: 4px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
                    min-width: 160px;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(-5px);
                    transition: opacity 200ms ease, transform 200ms ease, visibility 200ms ease;
                    z-index: 100;
                    overflow: hidden;
                }

                .dropdown.open {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0);
                }

                .dropdown a {
                    display: block;
                    padding: 10px 14px;
                    text-decoration: none;
                    color: #222222;
                    font-size: 0.9rem;
                    border-bottom: 1px solid #EEEEEE;
                }

                .dropdown a:last-child {
                    border-bottom: none;
                }

                .dropdown a:hover {
                    background-color: #F0F4F8;
                }
            </style>

            <div class="nav-links">
                <div class="item-desplegable">
                    <boton-menu id="btn-alumno" texto="Alumno" estado="normal"></boton-menu>
                    <div class="dropdown" id="menu-alumno">
                        <a href="horario.html">Horario</a>
                        <a href="calificaciones.html">Calificaciones</a>
                        <a href="materias.html">Materias</a>
                    </div>
                </div>

                <boton-menu id="btn-tramites" texto="Trámites" estado="normal" href="tramites.html"></boton-menu>
                <boton-menu id="btn-inicio" texto="Inicio" estado="normal" href="pagina-principal.html"></boton-menu>
            </div>
        `;
    }
}

customElements.define('menu-navegacion', MenuNavegacion);