class TopNavbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
      <style>
        nav {
          display: flex;
          justify-content: space-around;
          align-items: center;
          background-color: #004A98;
          color: white;
          height: 55px;
          width: 100%;
        }
        button {
          background: none;
          border: none;
          color: white;
          font-size: 1.3rem;
          cursor: pointer;
        }
        button:hover {
          opacity: 0.8;
        }
      </style>
      <nav>
        <button title="Perfil">👤</button>
        <button title="Configuración">⚙️</button>
        <button title="Notificaciones">🔔</button>
      </nav>
    `;
    }
}
customElements.define('top-navbar', TopNavbar);