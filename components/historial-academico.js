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

    attributeChangedCallback() {
        if (this.shadowRoot.innerHTML !== '') {
            this.render();
        }
    }

    render() {
        const materia = this.getAttribute('materia') || 'Estructura de Datos I';
        const profesor = this.getAttribute('profesor') || 'Profesor: Luis Alejandro García';
        const periodo = this.getAttribute('periodo') || '2024-2025 / I';

        this.shadowRoot.innerHTML = `
      <style>
        .tarjeta {
          width: 633px;
          height: 63px;
          border-radius: 8px;
          background-color: #B9B9B9;
          padding: 5px 14px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 3px;
          font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
        .fila-superior {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .materia,
        .periodo {
          font-size: 20px;
          font-weight: 600;
          line-height: 100%;
          color: #000000;
        }
        .profesor {
          font-size: 20px;
          font-weight: 400;
          line-height: 100%;
          color: #000000;
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