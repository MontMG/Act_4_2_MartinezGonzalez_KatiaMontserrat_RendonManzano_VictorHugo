class MenuNavegacion extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const activo = this.getAttribute('activo') || 'inicio';

        this.shadowRoot.innerHTML = `
      <style>
        nav {
          background-color: #D9D9D9;
          padding: 0 30px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          font-size: 0.88rem;
          font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          color: #222222;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 25px;
          height: 100%;
        }
        .nav-item {
          cursor: pointer;
          height: 100%;
          display: flex;
          align-items: center;
          padding: 0 6px;
          position: relative;
          user-select: none;
          border-bottom: 3px solid transparent;
        }
        .nav-item:hover, .nav-item.active {
          border-bottom-color: #2B4C7E;
          font-weight: 600;
        }
        .dropdown {
          position: absolute;
          top: 42px;
          left: 0;
          background: white;
          border: 1px solid #CCC;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
          width: 160px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-5px);
          transition: all 200ms ease;
          z-index: 100;
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
          color: #222;
          border-bottom: 1px solid #EEE;
          font-weight: normal;
        }
        .dropdown a:hover {
          background-color: #F0F4F8;
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.1rem;
          position: relative;
          padding: 4px;
        }
        .badge-dot {
          position: absolute;
          top: 3px;
          right: 2px;
          width: 8px;
          height: 8px;
          background-color: #D32F2F;
          border-radius: 50%;
        }
        .avisos-panel {
          position: absolute;
          top: 45px;
          right: 30px;
          width: 280px;
          background: white;
          border: 1px solid #CCC;
          border-radius: 6px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          padding: 12px;
          display: none;
          z-index: 100;
        }
        .avisos-panel.open {
          display: block;
        }
        .aviso-row {
          padding: 8px;
          border-radius: 4px;
          font-size: 0.8rem;
          margin-top: 6px;
          border: 1px solid #E5E7EB;
        }
        .aviso-alerta {
          background-color: #FEF3C7;
          border-color: #F59E0B;
        }
      </style>
      <nav>
        <div class="nav-links">
          <div class="nav-item ${activo === 'alumno' ? 'active' : ''}" id="btn-alumno">
            Alumno ▾
            <div class="dropdown" id="menu-alumno">
              <a href="horario.html">Horario</a>
              <a href="calificaciones.html">Calificaciones</a>
              <a href="materias.html">Materias</a>
            </div>
          </div>
          <div class="nav-item ${activo === 'tramites' ? 'active' : ''}" onclick="location.href='tramites.html'">Trámites</div>
          <div class="nav-item ${activo === 'inicio' ? 'active' : ''}" onclick="location.href='dashboard.html'">Inicio</div>
        </div>

        <div class="nav-actions">
          <button class="icon-btn" id="btn-avisos" title="Módulo de avisos">
            <img src="./assets/iconos-alerta.svg"> <img>
            <span class="badge-dot" id="punto-rojo"></span>
          </button>
            <button class="icon-btn" onclick="location.href='index.html'" title="Cerrar sesión">
            <img src="./assets/iconos-salida.svg">
          </button>
        </div>

        <div class="avisos-panel" id="panel-avisos">
          <strong>Módulo de avisos</strong>
          <div class="aviso-row"> Esta es una notificación informativa.</div>
          <div class="aviso-row aviso-alerta"> Esta es una notificación urgente.</div>
        </div>
      </nav>
    `;

        const btnAlumno = this.shadowRoot.getElementById('btn-alumno');
        const menuAlumno = this.shadowRoot.getElementById('menu-alumno');
        const btnAvisos = this.shadowRoot.getElementById('btn-avisos');
        const panelAvisos = this.shadowRoot.getElementById('panel-avisos');
        const puntoRojo = this.shadowRoot.getElementById('punto-rojo');

        btnAlumno.addEventListener('click', (e) => {
            e.stopPropagation();
            menuAlumno.classList.toggle('open');
            panelAvisos.classList.remove('open');
        });

        btnAvisos.addEventListener('click', (e) => {
            e.stopPropagation();
            panelAvisos.classList.toggle('open');
            menuAlumno.classList.remove('open');
            puntoRojo.style.display = 'none';
        });

        document.addEventListener('click', () => {
            menuAlumno.classList.remove('open');
            panelAvisos.classList.remove('open');
        });
    }
}

customElements.define('menu-navegacion', MenuNavegacion);