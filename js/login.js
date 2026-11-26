import '../components/campo-texto.js';
import '../components/campo-contrasena.js';
import '../components/botones.js';

const formLogin = document.getElementById('form-login');
const campoUsuario = document.getElementById('campo-usuario');
const campoPassword = document.getElementById('campo-password');
const btnIniciar = document.getElementById('btn-iniciar');

function actualizarEstadoBoton() {
    const usuarioLleno = campoUsuario.value.trim().length > 0;
    const passwordLleno = campoPassword.value.trim().length > 0;

    if (usuarioLleno && passwordLleno) {
        btnIniciar.removeAttribute('disabled');
    } else {
        btnIniciar.setAttribute('disabled', '');
    }
}

function iniciarSesion() {
    const usuario = campoUsuario.value.trim();
    const password = campoPassword.value.trim();

    if (!usuario) {
        campoUsuario.setAttribute('estado', 'error');
        campoUsuario.setAttribute('mensaje', 'Campo obligatorio');
        return;
    }

    if (!password) {
        return;
    }

    campoUsuario.setAttribute('estado', 'correcto');
    window.location.href = './paginas/pagina-principal.html';
}

campoUsuario.addEventListener('campo-input', () => {
    if (campoUsuario.getAttribute('estado') === 'error' && campoUsuario.value.trim().length > 0) {
        campoUsuario.setAttribute('estado', 'normal');
    }
    actualizarEstadoBoton();
});

campoUsuario.addEventListener('campo-blur', () => {
    if (campoUsuario.value.trim().length === 0) {
        campoUsuario.setAttribute('estado', 'error');
        campoUsuario.setAttribute('mensaje', 'Campo obligatorio');
    } else {
        campoUsuario.setAttribute('estado', 'correcto');
    }
});

campoPassword.addEventListener('campo-input', actualizarEstadoBoton);

btnIniciar.addEventListener('accion-click', iniciarSesion);

formLogin.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !btnIniciar.hasAttribute('disabled')) {
        e.preventDefault();
        iniciarSesion();
    }
});