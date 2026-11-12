# Auryx — Sitio web

Sitio de **Auryx, agencia creativa**: estrategia, diseño y tecnología para marcas que quieren ir más lejos.

HTML, CSS y JavaScript puros, sin frameworks ni dependencias. Publicado con GitHub Pages:
https://alexnava96.github.io/auryx-web/

## Páginas

| Página | Archivo |
|---|---|
| Inicio | `index.html` |
| Servicios (general) | `servicios/index.html` |
| Un servicio por página | `servicios/aura.html`, `web.html`, `pulso.html`, `norte.html`, `impulso.html`, `flujo.html`, `respaldo.html` |
| Blog | `blog/index.html` y un archivo por artículo |
| Casos | `casos.html` |
| Recursos | `recursos.html` |
| Nosotros | `nosotros.html` |
| Contacto | `contacto.html` |
| Página no encontrada | `404.html` |

```
auryx-web/
├── css/styles.css      Tokens de marca, inicio, menú, footer y animaciones
├── css/paginas.css     Componentes de las páginas internas y colores por servicio
├── js/main.js          Animaciones e interacciones generales
├── js/paginas.js       Filtros, formulario de contacto y suscripción
└── assets/img/         Imágenes (WebP), favicon e imagen para redes
```

## Abrirlo en Visual Studio Code

1. Abre la carpeta `auryx-web` en VS Code.
2. Instala la extensión **Live Server** (Ritwick Dey).
3. Clic derecho en `index.html` → **Open with Live Server**.

Se abre en el navegador y se recarga solo cada vez que guardas.

## Qué personalizar primero

| Marcador | Dónde | Qué va |
|---|---|---|
| `[PRECIO]` | `index.html` (planes) | Precio de cada plan |
| `[hola@auryx.co]` y `data-email="hola@auryx.co"` | Footer, contacto, blog y recursos | Correo real (los formularios abren el correo hacia esa dirección) |
| `[+57 300 000 0000]` | Footer y contacto | WhatsApp real (enlázalo con `https://wa.me/57XXXXXXXXXX`) |
| `[Nombre del cliente]`, `[Resultado verificado]` | `casos.html` | Casos reales, con autorización del cliente |
| `[Nombre]`, `[Cargo]` | `nosotros.html` | Equipo |
| Textos entre corchetes | `blog/*.html` | El contenido de cada artículo |

## Agregar un artículo al blog

1. Copia uno de los archivos de `blog/` y cámbiale el nombre (minúsculas y guiones).
2. Cambia el título, la descripción, la categoría, el autor, la fecha y el texto.
3. Agrega su tarjeta en `blog/index.html` (con su `data-category`) y la URL en `sitemap.xml`.

## Animaciones

- Título del hero que aparece palabra por palabra y partículas de luz de fondo.
- Parallax de la A de luz al hacer scroll y contadores animados.
- Cinta de servicios en movimiento continuo.
- Secciones que se revelan al entrar en pantalla y botones magnéticos.
- Por servicio: chat que se escribe solo (IA), búsqueda que se teclea y curva que se dibuja (Publicidad), datos viajando entre nodos (Automatización), radar (Estrategia), corazones flotando (Contenido) y revisión de estado paso a paso (Soporte).
- Borde de luz giratorio en el plan recomendado.

Todo respeta la opción del sistema **Reducir movimiento**: si está activa, el sitio se muestra completo y sin animaciones.

## Publicar cambios

Haz commit y push a la rama `main` desde VS Code (Control de código fuente → Confirmar → Sincronizar cambios). GitHub Pages publica la nueva versión en uno o dos minutos.
