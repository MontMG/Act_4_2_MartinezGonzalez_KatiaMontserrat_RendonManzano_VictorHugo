class WidgetAcceso extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const icono = this.getAttribute('icono') || '📌';
        const titulo = this.getAttribute('titulo') || 'Acceso';

        this.shadowRoot.innerHTML = `
      <style>
        .widget {
          width: 65px;
          height: 65px;
          border-radius: 15px;
          background-color: #FFFFFF;
          box-shadow: 3px 3px 20px 2px rgba(0, 0, 0, 0.25);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s;
          text-align: center;
          padding: 4px;
        }
        .widget:hover {
          transform: scale(1.05);
        }
        .icono { font-size: 1.4rem; }
        .titulo { font-size: 0.65rem; margin-top: 2px; color: #004A98; font-weight: bold; }
      </style>
      <div class="widget">
        <span class="icono">${icono}</span>
        <span class="titulo">${titulo}</span>
      </div>
    `;
    }
}
customElements.define('widget-acceso', WidgetAcceso);