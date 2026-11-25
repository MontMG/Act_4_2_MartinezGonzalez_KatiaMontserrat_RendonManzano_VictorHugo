import '../components/portal-header.js';
import '../components/barra-navegacion.js';
import '../components/calendario.js';
import '../components/accesos-directos.js';

const eventosPorDia = {
    4: [
        {
            titulo: 'Entrega de Proyecto Final',
            lugar: 'Laboratorio 3',
            fecha: '04/11/26',
            hora: '11:00'
        },
        {
            titulo: 'Asesoría de Diseño UI',
            lugar: 'Salón B-12',
            fecha: '04/11/26',
            hora: '16:30'
        }
    ],
    17: [
        { titulo: 'Aniversario de la facultad', lugar: 'Aula Magna', fecha: '17/11/26', hora: '15:00' },
        { titulo: 'Aniversario de la facultad', lugar: 'Aula Magna', fecha: '17/11/26', hora: '15:00' },
        { titulo: 'Aniversario de la facultad', lugar: 'Aula Magna', fecha: '17/11/26', hora: '15:00' },
        { titulo: 'Aniversario de la facultad', lugar: 'Aula Magna', fecha: '17/11/26', hora: '15:00' },
        { titulo: 'Aniversario de la facultad', lugar: 'Aula Magna', fecha: '17/11/26', hora: '15:00' },
        { titulo: 'Aniversario de la facultad', lugar: 'Aula Magna', fecha: '17/11/26', hora: '15:00' }
    ],
    25: [
        {
            titulo: 'Examen Parcial',
            lugar: 'Edificio I, Salón 204',
            fecha: '25/11/26',
            hora: '09:00'
        }
    ]
};

const calendario = document.getElementById('calendario');
const listaEventos = document.getElementById('lista-eventos');

function renderizarEventos(dia) {
    listaEventos.innerHTML = '';
    const eventos = eventosPorDia[dia] || [];

    eventos.forEach((evento) => {
        const tarjeta = document.createElement('article');
        tarjeta.className = 'tarjeta-evento';

        const infoIzquierda = document.createElement('div');
        infoIzquierda.className = 'evento-izquierda';

        const titulo = document.createElement('h3');
        titulo.className = 'evento-nombre';
        titulo.textContent = evento.titulo;

        const lugar = document.createElement('p');
        lugar.className = 'evento-lugar';
        lugar.textContent = `Lugar: ${evento.lugar}`;

        infoIzquierda.append(titulo, lugar);

        const infoDerecha = document.createElement('div');
        infoDerecha.className = 'evento-derecha';

        const fecha = document.createElement('span');
        fecha.className = 'evento-fecha';
        fecha.textContent = `Fecha: ${evento.fecha}`;

        const hora = document.createElement('span');
        hora.className = 'evento-hora';
        hora.textContent = `Hora: ${evento.hora}`;

        infoDerecha.append(fecha, hora);

        tarjeta.append(infoIzquierda, infoDerecha);
        listaEventos.appendChild(tarjeta);
    });
}

calendario.addEventListener('dia-seleccionado', (e) => {
    renderizarEventos(e.detail.dia);
});