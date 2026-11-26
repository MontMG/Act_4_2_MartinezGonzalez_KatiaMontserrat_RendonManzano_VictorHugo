import '../components/portal-header.js';
import '../components/barra-navegacion.js';
import '../components/tarjeta-materia.js';
import '../components/historial-academico.js';
import '../components/campo-desplegable.js';

const historialMaterias = [
    {
        materia: 'Bases de Datos II',
        profesor: 'Profesor: Roberto Méndez Salazar',
        periodo: '2025-2026 / II'
    },
    {
        materia: 'Sistemas Operativos',
        profesor: 'Profesor: Claudia Ivette Torres',
        periodo: '2025-2026 / II'
    },
    {
        materia: 'Análisis de Algoritmos',
        profesor: 'Profesor: Héctor Manuel Vázquez',
        periodo: '2025-2026 / I'
    },
    {
        materia: 'Arquitectura de Computadoras',
        profesor: 'Profesor: Jorge Luis Navarro',
        periodo: '2025-2026 / I'
    },
    {
        materia: 'Estructura de Datos II',
        profesor: 'Profesor: Luis Alejandro García',
        periodo: '2024-2025 / II'
    },
    {
        materia: 'Programación Orientada a Objetos',
        profesor: 'Profesor: Ana Sofía Delgado',
        periodo: '2024-2025 / II'
    },
    {
        materia: 'Estructura de Datos I',
        profesor: 'Profesor: Luis Alejandro García',
        periodo: '2024-2025 / I'
    }
];

const filtroPeriodo = document.getElementById('filtro-periodo');
const listaHistorial = document.getElementById('lista-historial');

function renderizarHistorial(periodoSeleccionado) {
    listaHistorial.innerHTML = '';

    const filtradas = !periodoSeleccionado || periodoSeleccionado === 'Todos los periodos'
        ? historialMaterias
        : historialMaterias.filter((item) => item.periodo === periodoSeleccionado);

    filtradas.forEach((item) => {
        const tarjeta = document.createElement('historial-academico');
        tarjeta.setAttribute('materia', item.materia);
        tarjeta.setAttribute('profesor', item.profesor);
        tarjeta.setAttribute('periodo', item.periodo);
        listaHistorial.appendChild(tarjeta);
    });
}

renderizarHistorial('Todos los periodos');

filtroPeriodo.addEventListener('cambio-opcion', (e) => {
    renderizarHistorial(e.detail.valor);
});