class SideMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
      <style>
        aside {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          background-color: #E2E8F0;
          padding: 20px 10px;
          height: 100%;
          width: 55px;
        }
        button {
          background: none;
          border: none;
          font-size: 1.3rem;
          padding: 8px;
          border-radius: 10px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        button:hover {
          background-color: #004A98;
          color: white;
        }
      </style>
      <aside>
        <button title="Inicio">🏠</button>
        <button title="Calificaciones">📄</button>
        <button title="Materias">📚</button>
        <button title="Horario">🕒</button>
        <button title="Más">⚪</button>
      </aside>
    `;
    }
}
customElements.define('side-menu', SideMenu);