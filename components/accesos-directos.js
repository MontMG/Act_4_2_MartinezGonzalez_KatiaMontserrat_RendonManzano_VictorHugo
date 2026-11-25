class AccesosDirectos extends HTMLElement {
    static get observedAttributes() {
        return ['acceso', 'tipo', 'href'];
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
        const acceso = this.getAttribute('acceso') || 'Horario';
        const tipo = this.getAttribute('tipo') || 'Normal';
        const href = this.getAttribute('href');

        const textos = {
            'Horario': 'Horario escolar',
            'Materias': 'Materias',
            'Calificaciones': 'Calificaciones'
        };

        const rutasPorDefecto = {
            'Horario': './horario.html',
            'Materias': './materias.html',
            'Calificaciones': './calificaciones.html'
        };

        const sufijoArchivo = {
            'Normal': 'Normal',
            'Requiere acción': 'Accion',
            'Leído': 'Leido'
        };

        const estilosEstado = {
            'Normal': {
                fondo: '#FFFFFF',
                cajaIcono: '#EAF0F8',
                texto: '#7E7D7D'
            },
            'Requiere acción': {
                fondo: '#FFA15E',
                cajaIcono: '#FFFFFF',
                texto: '#3D3D3D'
            },
            'Leído': {
                fondo: '#E5E5E5',
                cajaIcono: '#FFFFFF',
                texto: '#7E7D7D'
            }
        };

        const estilo = estilosEstado[tipo] || estilosEstado['Normal'];
        const estadoSvg = sufijoArchivo[tipo] || 'Normal';
        const etiqueta = textos[acceso] || acceso;
        const destino = href !== null ? href : (rutasPorDefecto[acceso] || '');
        const nombreArchivo = `Icono=Icono${acceso}, Estado=${estadoSvg}.svg`;
        const rutaSvg = new URL(`../assets/iconos/${encodeURIComponent(nombreArchivo)}`, import.meta.url).href;

        this.shadowRoot.innerHTML = `
      <style>
        .tarjeta {
          width: 168px;
          height: 142px;
          border-radius: 12px;
          border: 1px solid #E0E0E0;
          padding: 16px;
          background-color: ${estilo.fondo};
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          cursor: pointer;
          box-sizing: border-box;
          transition: transform 200ms ease-out, box-shadow 200ms ease-out;
        }
        .tarjeta:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
        }
        .contenedor-icono {
          width: 60px;
          height: 60px;
          border-radius: 20px;
          background-color: ${estilo.cajaIcono};
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .contenedor-icono img {
          width: 30px;
          height: 30px;
          object-fit: contain;
        }
        .titulo {
          font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          font-weight: 600;
          font-size: 16px;
          line-height: 22px;
          letter-spacing: 0%;
          color: ${estilo.texto};
          text-align: center;
          white-space: nowrap;
        }
      </style>
      <div class="tarjeta" id="card">
        <div class="contenedor-icono">
          <img src="${rutaSvg}" alt="${etiqueta}">
        </div>
        <span class="titulo">${etiqueta}</span>
      </div>
    `;

        this.shadowRoot.getElementById('card').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('acceso-click', {
                detail: { acceso, tipo, destino },
                bubbles: true
            }));

            if (destino) {
                window.location.href = destino;
            }
        });
    }
}

customElements.define('accesos-directos', AccesosDirectos);