import '../components/tarjeta-notificacion.js';

const btnNotificaciones = document.getElementById('btn-notificaciones');
const moduloAvisos = document.getElementById('modulo-avisos');
const puntoAlerta = document.getElementById('punto-alerta');

function actualizarPuntoAlerta() {
    if (!moduloAvisos || !puntoAlerta) return;

    const tarjetas = moduloAvisos.querySelectorAll('tarjeta-notificacion');
    const hayNoLeidas = Array.from(tarjetas).some(
        (tarjeta) => (tarjeta.getAttribute('tipo') || 'informativa').toLowerCase() !== 'leido'
    );

    puntoAlerta.classList.toggle('oculto', !hayNoLeidas);
}

if (btnNotificaciones && moduloAvisos) {
    actualizarPuntoAlerta();

    btnNotificaciones.addEventListener('click', (e) => {
        e.stopPropagation();
        moduloAvisos.classList.toggle('abierto');
    });

    moduloAvisos.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    moduloAvisos.addEventListener('notificacion-leida', actualizarPuntoAlerta);
    moduloAvisos.addEventListener('notificacion-accion', actualizarPuntoAlerta);

    document.addEventListener('click', () => {
        moduloAvisos.classList.remove('abierto');
    });
}