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

    attributeChangedCallback() {
        if (this.shadowRoot.innerHTML !== '') {
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
        .tarjeta {
          width: 888px;
          height: 124px;
          border-radius: 8px;
          background-color: #B1C9EF;
          padding: 15px 21px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
        .info-materia {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .titulo {
          font-size: 24px;
          font-weight: 600;
          line-height: 100%;
          color: #000000;
        }
        .detalle {
          font-size: 20px;
          font-weight: 200;
          line-height: 100%;
          color: #000000;
        }
        .acciones {
          display: flex;
          align-items: center;
          gap: 17px;
        }
        .badge-estatus {
          width: 132px;
          height: 40px;
          border-radius: 8px;
          background-color: #DBF8D5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 600;
          line-height: 100%;
          color: #258A11;
          box-sizing: border-box;
        }
        .btn-descargar {
          width: 144px;
          height: 87px;
          border-radius: 10px;
          padding: 1px 3px;
          border: none;
          background-color: #628ECB;
          color: #FFFFFF;
          font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          font-size: 20px;
          font-weight: 400;
          line-height: 100%;
          text-align: center;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
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
      </style>

      <div class="tarjeta">
        <div class="info-materia">
          <span class="titulo">${materia}</span>
          <span class="detalle">${profesor}</span>
          <span class="detalle">${horario}</span>
        </div>

        <div class="acciones">
          <div class="badge-estatus">${estatus}</div>
          <button type="button" class="btn-descargar" id="btn-pdf">Descargar plan de estudios</button>
        </div>
      </div>
    `;

        const btn = this.shadowRoot.getElementById('btn-pdf');
        btn.addEventListener('click', () => {
            if (btn.disabled) return;
            btn.disabled = true;
            btn.textContent = 'Descargando...';

            this.dispatchEvent(new CustomEvent('descargar-plan', {
                detail: { materia, archivoPdf },
                bubbles: true
            }));

            setTimeout(() => {
                if (archivoPdf) {
                    const enlace = document.createElement('a');
                    enlace.href = archivoPdf;
                    enlace.download = `${materia.replace(/\s+/g, '_')}.pdf`;
                    enlace.click();
                }
                btn.disabled = false;
                btn.textContent = 'Descargar plan de estudios';
            }, 800);
        });
    }
}

customElements.define('tarjeta-materia', TarjetaMateria);