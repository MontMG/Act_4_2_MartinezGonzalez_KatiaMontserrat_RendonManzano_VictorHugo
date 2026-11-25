class TarjetaTramite extends HTMLElement {
    static get observedAttributes() {
        return ['tramite', 'clave', 'estado', 'requisitos', 'fecha', 'costo', 'lugar', 'folio'];
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
        const tramite = this.getAttribute('tramite') || 'Kardex';
        const clave = this.getAttribute('clave') || 'TR-2026-200';
        const estado = this.getAttribute('estado') || '';
        const completado = estado.trim().toLowerCase() === 'completado';

        const filas = [
            { nombre: 'Requisitos entregados.', valor: this.getAttribute('requisitos') || 'Entregados' },
            { nombre: 'Fecha de solicitud:', valor: this.getAttribute('fecha') || '07/09/26' },
            { nombre: 'Costo:', valor: this.getAttribute('costo') || '70' },
            { nombre: 'Lugar de entrega:', valor: this.getAttribute('lugar') || 'Oficinas' },
            { nombre: 'Folio:', valor: this.getAttribute('folio') || '457890' }
        ];

        this.shadowRoot.innerHTML = `
      <style>
        .tarjeta {
          width: 605px;
          background-color: #FFFFFF;
          border: 1px solid #E0E0E0;
          border-radius: 8px;
          box-sizing: border-box;
          font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          overflow: hidden;
          cursor: ${completado ? 'pointer' : 'default'};
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
        .info-tramite {
          flex: 1;
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
        .cuadro-estado {
          width: 120px;
          height: 120px;
          border-radius: 8px;
          background-color: ${completado ? '#E7FFD4' : '#BCBCBC'};
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          padding: 6px;
          text-align: center;
        }
        .estado-texto {
          font-size: 14px;
          font-weight: 700;
          color: #111111;
        }
        .desglose {
          max-height: ${this.abierta && completado ? '334px' : '0px'};
          opacity: ${this.abierta && completado ? '1' : '0'};
          padding: ${this.abierta && completado ? '13px 9px' : '0 9px'};
          border-top: ${this.abierta && completado ? '1px solid #E0E0E0' : '0 solid #E0E0E0'};
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 14px;
          overflow: hidden;
          transition: max-height 200ms ease-out, opacity 200ms ease-out, padding 200ms ease-out;
          box-sizing: border-box;
        }
        .fila-detalle {
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
          <div class="info-tramite">
            <span class="titulo">${tramite}</span>
            <span class="subtitulo">${clave}</span>
          </div>

          ${completado ? `<img class="flecha" src="./assets/iconos/Icono=Desplegable, Estado=Cerrado.svg" alt="Desplegar">` : ''}

          <div class="cuadro-estado">
            ${completado ? `<span class="estado-texto">Completado</span>` : ''}
          </div>
        </div>

        ${completado ? `
          <div class="desglose">
            ${filas.map(f => `
              <div class="fila-detalle">
                <span>${f.nombre}</span>
                <span>${f.valor}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;

        if (completado) {
            this.shadowRoot.getElementById('card').addEventListener('click', () => {
                this.abierta = !this.abierta;
                this.render();
            });
        }
    }
}

customElements.define('tarjeta-tramite', TarjetaTramite);