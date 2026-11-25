class CasillaVerificacion extends HTMLElement {
    static get observedAttributes() {
        return ['marcada'];
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
        const marcada = this.hasAttribute('marcada');

        this.shadowRoot.innerHTML = `
      <style>
        .casilla {
          width: 72px;
          height: 72px;
          border-radius: 20px;
          padding: 18px 11px;
          box-sizing: border-box;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          user-select: none;
          background-color: ${marcada ? '#B1C9EF' : '#FFFFFF'};
          border: ${marcada ? 'none' : '2px solid #A6ADBC'};
        }
        svg {
          width: 44px;
          height: 44px;
          display: ${marcada ? 'block' : 'none'};
        }
      </style>
      <div class="casilla" id="box" role="checkbox" aria-checked="${marcada}" tabindex="0">
        <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
    `;

        const box = this.shadowRoot.getElementById('box');
        const alternar = () => {
            if (this.hasAttribute('marcada')) {
                this.removeAttribute('marcada');
            } else {
                this.setAttribute('marcada', '');
            }
            this.dispatchEvent(new CustomEvent('cambio-casilla', {
                detail: { marcada: this.hasAttribute('marcada') },
                bubbles: true
            }));
        };

        box.addEventListener('click', alternar);
        box.addEventListener('keydown', (e) => {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                alternar();
            }
        });
    }

    get checked() {
        return this.hasAttribute('marcada');
    }

    set checked(val) {
        if (val) {
            this.setAttribute('marcada', '');
        } else {
            this.removeAttribute('marcada');
        }
    }
}

customElements.define('casilla-verificacion', CasillaVerificacion);