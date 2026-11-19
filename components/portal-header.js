class PortalHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const nombre = this.getAttribute('nombre') || 'Mariana Hernández López';
        const id = this.getAttribute('matricula') || '368910';
        const promedio = this.getAttribute('promedio') || '8.8';
        const creditos = this.getAttribute('creditos') || '182 / 240';
        const estatus = this.getAttribute('estatus') || 'Inscrito (Ciclo 2026-2027 / I)';
        const avance = this.getAttribute('avance') || '80%';

        this.shadowRoot.innerHTML = `
      <style>
        header {
          background-color: #2B4C7E;
          color: white;
          padding: 14px 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
        .identidad {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .logo-texto {
          font-size: 0.85rem;
          font-weight: bold;
          line-height: 1.2;
          border-right: 1px solid rgba(255, 255, 255, 0.3);
          padding-right: 15px;
        }
        .avatar {
          width: 56px;
          height: 56px;
          background-color: #D9D9D9;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          color: #555;
        }
        .datos-grid {
          display: flex;
          gap: 35px;
          font-size: 0.78rem;
          line-height: 1.5;
          flex: 1;
        }
        strong {
          font-weight: 600;
        }
      </style>
      <header>
        <div class="identidad">
          <div class="logo-texto">UASLP<br>FACULTAD DE<br>INGENIERÍA</div>
          <div class="avatar">👤</div>
        </div>
        <div class="datos-grid">
          <div>
            <div>NOMBRE ALUMNO: <strong>${nombre}</strong></div>
            <div>ID: <strong>${id}</strong></div>
          </div>
          <div>
            <div>PROMEDIO GENERAL: <strong>${promedio}</strong></div>
            <div>CRÉDITOS ACUMULADOS: <strong>${creditos}</strong></div>
            <div>ESTATUS DE INSCRIPCIÓN DEL PERIODO ACTUAL: <strong>${estatus}</strong></div>
            <div>PORCENTAJE DE AVANCE: <strong>${avance}</strong></div>
          </div>
        </div>
      </header>
    `;
    }
}

customElements.define('portal-header', PortalHeader);