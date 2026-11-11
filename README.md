# Auryx — Sitio web

Sitio de una sola página para **Auryx, agencia creativa**: estrategia, diseño y tecnología para marcas que quieren ir más lejos.

HTML, CSS y JavaScript puros, sin frameworks ni dependencias.

## Estructura

```
auryx-web/
├── index.html          Estructura y contenido
├── css/styles.css      Estilos, tokens de marca y animaciones
├── js/main.js          Interacciones y animaciones
└── assets/img/         Imágenes (WebP), favicon e imagen para redes
```

## Abrirlo en Visual Studio Code

1. Abre la carpeta `auryx-web` en VS Code.
2. Instala la extensión **Live Server** (Ritwick Dey).
3. Clic derecho en `index.html` → **Open with Live Server**.

Se abre en el navegador y se recarga solo cada vez que guardas.

## Qué personalizar primero

Busca estos marcadores en `index.html` y reemplázalos:

| Marcador | Qué va |
|---|---|
| `[PRECIO]` | Precio de cada plan |
| `[hola@auryx.co]` y `mailto:hola@auryx.co` | Correo real |
| `[+57 300 000 0000]` | WhatsApp real (enlázalo con `https://wa.me/57XXXXXXXXXX`) |
| Enlaces `href="#contacto"` de redes | Perfiles de Instagram y LinkedIn |
| Enlaces legales del footer | Páginas de privacidad, términos y tratamiento de datos |

## Colores y personalidades

Los colores viven como variables al inicio de `css/styles.css` (`:root`). Cada servicio tiene su color:

| Servicio | Variable | Color |
|---|---|---|
| Auryx Aura · IA | gradiente aura | `#B9A8FF → #5CE1FF` |
| Auryx Web | `--c-web` | `#5B3FE0` |
| Auryx Pulso · Contenido | `--c-pulso-a/b` | `#8E1FC4 → #C2246E` |
| Auryx Norte · Estrategia | `--c-norte` | `#2A1A8C` |
| Auryx Impulso · Publicidad | `--c-impulso` | `#1F4FB8` |
| Auryx Flujo · Automatización | `--c-flujo` | `#5CE1FF` |
| Auryx Respaldo · Soporte | `--c-respaldo` | `#1D7A4C` |

## Animaciones

- Título del hero que aparece palabra por palabra y partículas de luz de fondo.
- Parallax de la A de luz al hacer scroll y contadores animados.
- Cinta de servicios en movimiento continuo.
- Secciones que se revelan al entrar en pantalla.
- Luz que sigue al cursor en mosaicos y tarjetas, y botones magnéticos.
- Por servicio: chat que se escribe solo (IA), búsqueda que se teclea y curva que se dibuja (Publicidad), datos viajando entre nodos (Automatización), radar (Estrategia), corazones flotando (Contenido) y revisión de estado paso a paso (Soporte).
- Borde de luz giratorio en el plan recomendado.

Todo respeta la opción del sistema **Reducir movimiento**: si está activa, el sitio se muestra completo y sin animaciones.

## Publicar con GitHub Pages

1. Sube la carpeta a un repositorio de GitHub.
2. En el repositorio: **Settings → Pages → Build and deployment**.
3. En *Source* elige **Deploy from a branch**, rama `main`, carpeta `/ (root)` y guarda.
4. En uno o dos minutos el sitio queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.
