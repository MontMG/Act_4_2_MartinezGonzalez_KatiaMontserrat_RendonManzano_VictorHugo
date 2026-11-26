import '../components/portal-header.js';
import '../components/barra-navegacion.js';

const horas = [
    '7:00 - 8:00',
    '8:00 - 9:00',
    '9:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00'
];

const dias = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES'];

const materiasInscritas = [
    {
        hora: '7:00 - 8:00',
        dias: ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES'],
        materia: 'Criptografía',
        profesor: 'Juana Patricia Gutierrez',
        salon: 'I-12'
    },
    {
        hora: '8:00 - 9:00',
        dias: ['LUNES', 'MIÉRCOLES', 'VIERNES'],
        materia: 'Compiladores',
        profesor: 'Carlos Méndez',
        salon: 'I-14'
    },
    {
        hora: '10:00 - 11:00',
        dias: ['MARTES', 'JUEVES'],
        materia: 'Interfaces de Usuario',
        profesor: 'Ana Sofía Torres',
        salon: 'Lab-3'
    }
];

const tbody = document.getElementById('cuerpo-horario');

horas.forEach((rangoHora) => {
    const fila = document.createElement('tr');

    const celdaHora = document.createElement('td');
    celdaHora.className = 'celda-hora';
    celdaHora.textContent = rangoHora;
    fila.appendChild(celdaHora);

    dias.forEach((dia) => {
        const celda = document.createElement('td');
        const clase = materiasInscritas.find(
            (m) => m.hora === rangoHora && m.dias.includes(dia)
        );

        if (clase) {
            celda.innerHTML = `
        <div class="bloque-materia">
          <span class="nombre-corto">${clase.materia}</span>
          <div class="tooltip-materia">
            <strong>${clase.materia}</strong>
            <div>Profesor: ${clase.profesor}</div>
            <div>Salón: ${clase.salon}</div>
          </div>
        </div>
      `;
        }

        fila.appendChild(celda);
    });

    tbody.appendChild(fila);
});