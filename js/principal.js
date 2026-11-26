import '../components/portal-header.js';
import '../components/barra-navegacion.js';
import '../components/accesos-directos.js';
import '../components/calendario.js';
import '../components/lista-eventos.js';

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
const panelEventos = document.getElementById('panel-eventos');

calendario.addEventListener('dia-seleccionado', (e) => {
    panelEventos.eventos = eventosPorDia[e.detail.dia] || [];
});