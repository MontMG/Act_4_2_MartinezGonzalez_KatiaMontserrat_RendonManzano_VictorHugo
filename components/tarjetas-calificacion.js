class TarjetaCalificacion extends HTMLElement {
    static get observedAttributes() {
        return ['materia', 'grupo', 'calificacion', 'parcial1', 'parcial2', 'parcial3', 'tareas', 'final'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.abierta = false;
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
        const materia = this.getAttribute('materia') || 'Criptografía';
        const grupo = this.getAttribute('grupo') || 'Grupo 202401 - 7mo semestre';
        const calificacion = this.getAttribute('calificacion') || '';
        const calificada = calificacion.trim() !== '';

        const filas = [
            { nombre: 'Parcial 1', valor: this.getAttribute('parcial1') || '90' },
            { nombre: 'Parcial 2', valor: this.getAttribute('parcial2') || '80' },
            { nombre: 'Parcial 3', valor: this.getAttribute('parcial3') || '80' },
            { nombre: 'Tareas', valor: this.getAttribute('tareas') || '95' },
            { nombre: 'Examen final', valor: this.getAttribute('final') || '70' }
        ];

        this.shadowRoot.innerHTML = `
      <style>
        .tarjeta {
          width: 627px;
          background-color: #FFFFFF;
          border: 1px solid #E0E0E0;
          border-radius: 8px;
          box-sizing: border-box;
          font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          overflow: hidden;
          cursor: ${calificada ? 'pointer' : 'default'};
        }
        .cabecera {
          height: 122px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1px;
          box-sizing: border-box;
          position: relative;
        }
        .info-materia {
          width: 474px;
          padding: 16px 24px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 4px;
          box-sizing: border-box;
        }
        .titulo {
          font-size: 22px;
          font-weight: 700;
          color: #111111;
        }
        .subtitulo {
          font-size: 14px;
          font-weight: 600;
          color: #333333;
        }
        .flecha {
          width: 22px;
          height: 22px;
          align-self: flex-end;
          margin-bottom: 10px;
          margin-right: 6px;
          transition: transform 200ms ease-out;
          transform: ${this.abierta ? 'rotate(180deg)' : 'rotate(0deg)'};
        }
        .cuadro-nota {
          width: 120px;
          height: 120px;
          border-radius: 8px;
          background-color: ${calificada ? '#E7FFD4' : '#BCBCBC'};
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }
        .nota-numero {
          font-size: 24px;
          font-weight: 700;
          color: #111111;
          line-height: 1.1;
        }
        .nota-etiqueta {
          font-size: 12px;
          font-weight: 600;
          color: #222222;
          margin-top: 2px;
        }
        .desglose {
          max-height: ${this.abierta && calificada ? '334px' : '0px'};
          opacity: ${this.abierta && calificada ? '1' : '0'};
          padding: ${this.abierta && calificada ? '13px 9px' : '0 9px'};
          border-top: ${this.abierta && calificada ? '1px solid #E0E0E0' : '0 solid #E0E0E0'};
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 14px;
          overflow: hidden;
          transition: max-height 200ms ease-out, opacity 200ms ease-out, padding 200ms ease-out;
          box-sizing: border-box;
        }
        .fila-eval {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 4px 12px;
          font-size: 18px;
          color: #222222;
        }
      </style>

      <div class="tarjeta" id="card">
        <div class="cabecera">
          <div class="info-materia">
            <span class="titulo">${materia}</span>
            <span class="subtitulo">${grupo}</span>
          </div>

          ${calificada ? `<img class="flecha" src="./assets/iconos/Icono=Desplegable, Estado=Cerrado.svg" alt="Desplegar">` : ''}

          <div class="cuadro-nota">
            ${calificada ? `
              <span class="nota-numero">${calificacion}</span>
              <span class="nota-etiqueta">Acumulado</span>
            ` : ''}
          </div>
        </div>

        ${calificada ? `
          <div class="desglose">
            ${filas.map(f => `
              <div class="fila-eval">
                <span>${f.nombre}</span>
                <span>${f.valor}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;

        if (calificada) {
            this.shadowRoot.getElementById('card').addEventListener('click', () => {
                this.abierta = !this.abierta;
                this.render();
            });
        }
    }
}

customElements.define('tarjeta-calificacion', TarjetaCalificacion);