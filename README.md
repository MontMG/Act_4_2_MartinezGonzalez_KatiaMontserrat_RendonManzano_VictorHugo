# Portal Académico Estudiantil (Rediseño SIE)

Prototipo web funcional del **Portal Académico Estudiantil** de la Facultad de Ingeniería (UASLP), desarrollado como parte de la materia **Diseño de Interfaces**. El proyecto traslada un sistema de diseño basado en **Diseño Atómico** desde Figma a código modular mediante **Web Components nativos** con JavaScript puro, Shadow DOM y Módulos ES.

## Datos del proyecto

- **Institución:** Universidad Autónoma de San Luis Potosí (UASLP) — Facultad de Ingeniería
- **Materia:** Diseño de Interfaces
- **Profesora:** Dra. Genoveva Viridiana Silva Rodríguez
- **Integrantes:**
  - Katia Montserrat Martínez González
  - Víctor Hugo Rendón Manzano
- **Diseño / Handoff en Figma:** https://www.figma.com/design/VOs2YKD6kjXnjiIQM0P1Uq/Actividad?node-id=2-54&t=lXCnao2r3kNQJSGQ-1

---

## Tecnologías y estándares utilizados

- **HTML5 y CSS3:** Maquetación semántica, CSS Grid, Flexbox y Media Queries para escritorio, tablet y móvil.
- **JavaScript (ES6+):** Sin frameworks ni librerías externas.
- **Web Components nativos:** `Custom Elements` y `Shadow DOM` (`mode: 'open'`) para encapsular estilos y lógica por componente.
- **Módulos ES (`type="module"`):** Carga modular de componentes y scripts controladores por vista.
- **Recursos gráficos:** Tipografía **Inter** (Google Fonts) e íconos SVG locales.

---

## Cómo ejecutar el proyecto

> **Importante:** No abras `index.html` haciendo doble clic directo desde el explorador de archivos (`file://`). Debido a las políticas de CORS del navegador, los Módulos ES (`import` / `export`) requieren ejecutarse desde un servidor local.

### Opción 1: Live Server en VS Code (recomendada)
1. Abre la carpeta raíz del proyecto en **Visual Studio Code**.
2. Instala la extensión **Live Server** (si aún no la tienes).
3. Haz clic derecho sobre `index.html` y selecciona **"Open with Live Server"**.

### Opción 2: Servidor local con Python
Desde una terminal en la carpeta raíz del proyecto, ejecuta:

```bash
python -m http.server 5500
```

Luego abre `http://localhost:5500/index.html` en tu navegador.

---

## Estructura de carpetas

```text
proyecto/
├── index.html                      # Pantalla de Inicio de Sesión (Login)
├── README.md                       # Documentación del proyecto
├── views/                          # Vistas internas del portal
│   ├── pagina-principal.html       # Inicio: accesos directos, calendario y eventos
│   ├── horario.html                # Horario escolar semanal interactivo
│   ├── calificaciones.html         # Calificaciones y desglose por parciales
│   ├── tramites.html               # Trámites pendientes y completados
│   └── materias.html               # Materias inscritas e historial académico
├── components/                     # Web Components reutilizables (Shadow DOM)
│   ├── portal-header.js            # <portal-header>
│   ├── barra-navegacion.js         # <barra-navegacion>
│   ├── tarjeta-notificacion.js     # <tarjeta-notificacion>
│   ├── botones.js                  # <boton-accion>
│   ├── campo-texto.js              # <campo-texto>
│   ├── campo-contrasena.js         # <campo-contrasena>
│   ├── accesos-directos.js         # <accesos-directos>
│   ├── dias.js                     # <dia-calendario>
│   ├── calendario.js               # <mi-calendario>
│   ├── lista-eventos.js            # <lista-eventos>
│   ├── tarjetas-calificacion.js    # <tarjeta-calificacion>
│   ├── tarjetas-tramites.js        # <tarjeta-tramite>
│   ├── tarjeta-materia.js          # <tarjeta-materia>
│   ├── historial-academico.js      # <historial-academico>
│   ├── campo-desplegable.js        # <campo-desplegable>
│   └── casilla-verificacion.js     # <casilla-verificacion>
├── css/                            # Hojas de estilo globales y por vista
│   ├── global.css
│   ├── portal.css
│   ├── principal.css
│   ├── horario.css
│   ├── calificaciones.css
│   ├── tramites.css
│   └── materias.css
├── js/                             # Scripts controladores de cada vista
│   ├── principal.js
│   ├── horario.js
│   ├── calificaciones.js
│   ├── tramites.js
│   └── materias.js
└── assets/                         # Imágenes de la facultad, perfil e íconos SVG
    └── iconos/
```

---

## Catálogo de Web Components

| Componente (Etiqueta) | Archivo | Atributos / Propiedades principales | Eventos personalizados | Uso en vistas |
| :--- | :--- | :--- | :--- | :--- |
| `<portal-header>` | `components/portal-header.js` | Datos del alumno (nombre, ID, promedio, créditos, estatus, avance) | — | Todas las vistas en `views/` |
| `<barra-navegacion>` | `components/barra-navegacion.js` | `activo` (`inicio`, `alumno`, `tramites`) | — | Todas las vistas en `views/` |
| `<tarjeta-notificacion>` | `components/tarjeta-notificacion.js` | Tipo/estado de aviso (`informativa`, `accion`, `leido`) | — | Instanciado en `<barra-navegacion>` |
| `<boton-accion>` | `components/botones.js` | `texto`, `tipo` (`primario`, `secundario`), `estado`, `disabled` | `accion-click` | `index.html` |
| `<campo-texto>` | `components/campo-texto.js` | `label`, `placeholder`, `estado`, `valor` | `cambio` / `foco` | `index.html` |
| `<campo-contrasena>` | `components/campo-contrasena.js` | `label`, `placeholder`, `estado`, visibilidad de contraseña | `cambio` / `foco` | `index.html` |
| `<accesos-directos>` | `components/accesos-directos.js` | `acceso` (`Horario`, `Materias`, `Calificaciones`), `tipo` (`Normal`, `Requiere acción`, `Leído`), `href` | `acceso-click` | `views/pagina-principal.html` |
| `<dia-calendario>` | `components/dias.js` | `numero`, `variante` (`normal`, `evento`, `seleccionado`) | `dia-evento-click` | Instanciado en `<mi-calendario>` |
| `<mi-calendario>` | `components/calendario.js` | `mes`, `dias`, `eventos` | `dia-seleccionado` | `views/pagina-principal.html` |
| `<lista-eventos>` *(nuevo)* | `components/lista-eventos.js` | Atributo `titulo`; propiedad JS `.eventos` (array de objetos con título, lugar, fecha y hora) | `evento-click` | `views/pagina-principal.html` |
| `<tarjeta-calificacion>` | `components/tarjetas-calificacion.js` | `materia`, `grupo`, `calificacion`, `parcial1`–`3`, `tareas`, `final` | `tarjeta-toggle` | `views/calificaciones.html` |
| `<tarjeta-tramite>` | `components/tarjetas-tramites.js` | `tramite`, `clave`, `estado`, `requisitos`, `fecha`, `costo`, `lugar`, `folio` | `tramite-toggle` | `views/tramites.html` |
| `<tarjeta-materia>` *(nuevo)* | `components/tarjeta-materia.js` | `materia`, `profesor`, `horario`, `estatus`, `archivo-pdf` | `descargar-plan` | `views/materias.html` |
| `<historial-academico>` *(nuevo)* | `components/historial-academico.js` | `materia`, `profesor`, `periodo` | — | `views/materias.html` |
| `<campo-desplegable>` | `components/campo-desplegable.js` | `placeholder`, `opciones`, `valor` | `cambio-opcion` | `views/materias.html` |
| `<casilla-verificacion>` | `components/casilla-verificacion.js` | `marcada` (booleano) | `cambio-casilla` | Librería (disponible para reutilización) |

### Notas sobre la arquitectura de componentes
- **Componentes incorporados fuera del handoff original:**
  - `<lista-eventos>`: originalmente planteado en HTML y CSS clásico, se migró a Web Component con Shadow DOM para encapsular el panel de **Eventos Importantes**, recibir dinámicamente la lista de eventos mediante la propiedad `.eventos` y comunicarse directamente con `<mi-calendario>`.
  - `<tarjeta-materia>` y `<historial-academico>`: creados para modularizar la vista de Materias; `<tarjeta-materia>` integra su propio botón de descarga del plan de estudios con estado de carga simulado.
- **Componentes disponibles en librería:** `<casilla-verificacion>` quedó implementado y funcional con soporte de teclado (`Space`/`Enter`) y accesibilidad (`role="checkbox"`), listo para integrarse en futuras vistas o formularios.

---

## Vistas y flujos interactivos

1. **Inicio de Sesión (`index.html`):**
   - Maquetado con la identidad institucional y fachada de la Facultad de Ingeniería.
   - Redirige a `views/pagina-principal.html` al enviar el formulario.
2. **Página Principal (`views/pagina-principal.html`):**
   - Encabezado con resumen académico del alumno y barra de navegación con panel desplegable de avisos.
   - Tres tarjetas de `<accesos-directos>` que muestran estados visuales (`Requiere acción`, `Normal`, `Leído`) y navegan directamente a Horario, Materias y Calificaciones.
   - Calendario interactivo (`<mi-calendario>`): al hacer clic en los días marcados con evento (**4**, **17** y **25**), cambia su estado a seleccionado y actualiza dinámicamente las tarjetas dentro de `<lista-eventos>`.
3. **Horario Escolar (`views/horario.html`):**
   - Tabla generada dinámicamente desde `js/horario.js` con horarios, materias y tooltips interactivos al pasar el cursor que muestran profesor y salón.
4. **Calificaciones (`views/calificaciones.html`):**
   - Cuadrícula adaptable con 8 materias (6 calificadas y 2 pendientes).
   - Las tarjetas calificadas funcionan como acordeón interactivo que despliega el desglose de parciales, tareas y examen final.
5. **Trámites (`views/tramites.html`):**
   - Cuadrícula de trámites con estado **Completado** o pendiente.
   - Al hacer clic en un trámite completado, se despliega el detalle de requisitos, fecha de solicitud, costo, lugar de entrega y folio.
6. **Materias (`views/materias.html`):**
   - Panel izquierdo con las materias inscritas del ciclo actual y botón de descarga simulada del plan de estudios.
   - Panel derecho con historial académico filtrable dinámicamente por periodo mediante `<campo-desplegable>`.

---

## Diseño responsivo y decisiones técnicas

- **Escalado realista para web:** El diseño base en Figma fue trazado sobre un lienzo amplio de escritorio (`1728px`). Para garantizar usabilidad en monitores y laptops estándar (`1280px`–`1440px`), se aplicó un reescalado proporcional (~70%–75%) conservando la paleta de colores, jerarquía tipográfica y proporciones originales.
- **Adaptación a Escritorio, Tablet y Celular:**
  - En `views/pagina-principal.html`, el layout utiliza `CSS Grid` (`grid-template-areas`) para reordenar las secciones según el dispositivo: 3 columnas en escritorio, accesos a la izquierda con `<lista-eventos>` arriba de `<mi-calendario>` en tablet, y 3 accesos en fila horizontal seguidos de eventos y calendario en móvil.
  - En `views/horario.html`, la tabla cuenta con desplazamiento horizontal controlado y reposicionamiento automático de tooltips en los bordes superior y derecho para evitar recortes.

---

