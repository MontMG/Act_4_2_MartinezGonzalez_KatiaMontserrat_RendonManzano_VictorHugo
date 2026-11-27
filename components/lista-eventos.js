class ListaEventos extends HTMLElement {
    static get observedAttributes() {
        return ['titulo'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._eventos = [];
    }

    connectedCallback() {
        this.render();
        this._actualizarTitulo();
        this._renderizarLista();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && name === 'titulo' && this.shadowRoot.querySelector('.eventos-titulo')) {
            this._actualizarTitulo();
        }
    }

    get eventos() {
        return this._eventos;
    }

    set eventos(lista) {
        this._eventos = Array.isArray(lista) ? lista : [];
        if (this.shadowRoot.getElementById('lista-eventos')) {
            this._renderizarLista();
        }
    }

    _actualizarTitulo() {
        const tituloEl = this.shadowRoot.querySelector('.eventos-titulo');
        if (tituloEl) {
            tituloEl.textContent = this.getAttribute('titulo') || 'Eventos Importantes';
        }
    }

    _renderizarLista() {
        const contenedor = this.shadowRoot.getElementById('lista-eventos');
        if (!contenedor) return;

        contenedor.innerHTML = '';

        this._eventos.forEach((evento) => {
            const tarjeta = document.createElement('article');
            tarjeta.className = 'tarjeta-evento';

            const infoIzquierda = document.createElement('div');
            infoIzquierda.className = 'evento-izquierda';

            const titulo = document.createElement('h3');
            titulo.className = 'evento-nombre';
            titulo.textContent = evento.titulo || '';

            const lugar = document.createElement('p');
            lugar.className = 'evento-lugar';
            lugar.textContent = `Lugar: ${evento.lugar || ''}`;

            infoIzquierda.append(titulo, lugar);

            const infoDerecha = document.createElement('div');
            infoDerecha.className = 'evento-derecha';

            const fecha = document.createElement('span');
            fecha.className = 'evento-fecha';
            fecha.textContent = `Fecha: ${evento.fecha || ''}`;

            const hora = document.createElement('span');
            hora.className = 'evento-hora';
            hora.textContent = `Hora: ${evento.hora || ''}`;

            infoDerecha.append(fecha, hora);

            tarjeta.append(infoIzquierda, infoDerecha);

            tarjeta.addEventListener('click', () => {
                this.dispatchEvent(new CustomEvent('evento-click', {
                    detail: evento,
                    bubbles: true,
                    composed: true
                }));
            });

            contenedor.appendChild(tarjeta);
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block; 
                    width: 100%;
                }

                *, *::before, *::after {
                    box-sizing: border-box;
                }

                .contenedor-eventos {
                    width: 440px;
                    max-width: 100%;
                    height: 468px;
                    border-radius: 12px;
                    border: 3px solid #DF0000;
                    background: #DBD8D8;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                .eventos-titulo {
                    margin: 16px 0 0 0;
                    text-align: center;
                    color: #540A0A;
                    font-family: 'Inter', sans-serif;
                    font-size: 20px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: normal;
                    flex-shrink: 0;
                }

                .lista-eventos {
                    margin-top: 14px;
                    padding: 0 20px 18px 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    flex: 1;
                    overflow-y: auto;
                }

                .tarjeta-evento {
                    min-height: 68px;
                    flex-shrink: 0;
                    align-self: stretch;
                    border-radius: 8px;
                    background: #FFFFFF;
                    padding: 10px 14px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                }

                .evento-izquierda {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    gap: 3px;
                    min-width: 0;
                }

                .evento-nombre {
                    margin: 0;
                    color: #000000;
                    font-family: 'Inter', sans-serif;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 1.25;
                }

                .evento-lugar {
                    margin: 0;
                    color: #000000;
                    font-family: 'Inter', sans-serif;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 300;
                    line-height: 1.25;
                }

                .evento-derecha {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 4px;
                    flex-shrink: 0;
                }

                .evento-fecha,
                .evento-hora {
                    color: #000000;
                    font-family: 'Inter', sans-serif;
                    font-size: 12.5px;
                    font-style: normal;
                    font-weight: 300;
                    line-height: 1.2;
                    text-align: right;
                    white-space: nowrap;
                }
                @media (max-width: 1100px) {
                    .contenedor-eventos {
                        width: 100%;
                        height: 440px;
                    }
                }

                @media (max-width: 640px) {
                    .contenedor-eventos {
                        width: 100%;
                        height: 380px;
                        border-width: 2px;
                    }

                    .eventos-titulo {
                        font-size: 17px;
                        margin-top: 12px;
                    }

                    .lista-eventos {
                        margin-top: 10px;
                        padding: 0 12px 14px;
                        gap: 10px;
                    }

                    .tarjeta-evento {
                        min-height: 58px;
                        padding: 10px 12px;
                    }

                    .evento-nombre {
                        font-size: 14px;
                    }

                    .evento-lugar {
                        font-size: 12.5px;
                    }

                    .evento-fecha,
                    .evento-hora {
                        font-size: 11px;
                    }
                }
            </style>

            <aside class="contenedor-eventos" aria-label="Eventos Importantes">
                <h2 class="eventos-titulo"></h2>
                <div class="lista-eventos" id="lista-eventos"></div>
            </aside>
        `;
    }
}

customElements.define('lista-eventos', ListaEventos);