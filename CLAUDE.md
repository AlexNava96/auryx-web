# Auryx — sitio web

Sitio de **Auryx, agencia creativa** (Bogotá): estrategia, diseño y tecnología para marcas que quieren ir más lejos.
Es un proyecto personal. Se publica con GitHub Pages en https://alexnava96.github.io/auryx-web/ desde la rama `main`, carpeta raíz. Cada push a `main` lo publica en uno o dos minutos.
Todavía no hay servidor propio: no configurar despliegues a otros hostings sin que Alex lo pida.

## Estructura

```
index.html                 Inicio (hero, mosaicos de servicios, planes, por qué, del blog, contacto)
servicios/index.html       Página general de servicios
servicios/<servicio>.html  Una por servicio: aura, web, pulso, norte, impulso, flujo, respaldo
blog/index.html            Listado del blog con filtros por categoría
blog/<artículo>.html       Artículos (por ahora, estructura con textos de ejemplo)
casos.html                 Casos con filtros por servicio (espacios para casos reales)
recursos.html              Guías, checklists y plantillas (próximamente)
nosotros.html              Historia, misión y visión, valores, forma de trabajo y equipo
contacto.html              Formulario, otros canales y preguntas frecuentes
404.html                   Página no encontrada de GitHub Pages (usa <base href="/auryx-web/">)
sitemap.xml, robots.txt
css/styles.css             Tokens de marca en :root, inicio, mosaicos, menú, footer y animaciones
css/paginas.css            Componentes de las páginas internas y temas por servicio (.t-aura, .t-web…)
js/main.js                 Animaciones e interacciones generales (todas las páginas)
js/paginas.js              Filtros, formulario de contacto, suscripción y copiar enlace
assets/img/                Imágenes WebP, favicon SVG e imagen Open Graph
```

- Es HTML estático, sin compilación. El menú, el bloque de gradientes SVG (`<symbol id="logoA">`) y el footer se repiten en cada página: si cambian, hay que actualizarlos en todas.
- Las páginas dentro de `servicios/` y `blog/` usan rutas con `../`. Las de la raíz, sin prefijo.
- Cada página marca su sección en el menú con `aria-current="page"` y declara su tema en `<main class="t-…">`.
- La portada de cada servicio reutiliza su mosaico del inicio; en `paginas.css` el visual pasa a ir debajo del texto para que no se crucen.
- El formulario de contacto no tiene servidor: abre el correo del visitante con el mensaje armado hacia `data-email`. Acepta `?servicio=<slug>` o `?plan=<plan>` en la URL para preseleccionar la opción.

### Agregar un artículo al blog

1. Copia un archivo de `blog/` con el nombre nuevo (minúsculas y guiones).
2. Cambia título, descripción, categoría (`t-<tema>` en `<main>` y la insignia), autor, fecha y el texto dentro de `.prose`.
3. Agrega su tarjeta en `blog/index.html` con `data-category` y, si quieres, en "Del blog" del inicio.
4. Agrega la URL a `sitemap.xml`.

Categorías y temas: Estrategia (`t-norte`), Web (`t-web`), Contenido (`t-pulso`), Publicidad (`t-impulso`), Automatización (`t-flujo`), IA (`t-aura`).

## Reglas del proyecto

- HTML, CSS y JS siempre en archivos separados. Sin frameworks, sin dependencias, sin estilos en línea.
- Textos en español de Colombia, tono cercano y profesional.
- Todo lo animado debe respetar `prefers-reduced-motion`: con movimiento reducido el contenido se muestra completo y quieto.
- Accesibilidad: contraste mínimo 4.5:1 en texto, áreas táctiles de 44 px, `aria-hidden` en lo decorativo, enlaces y botones reales, ids únicos por página.
- Cada página debe verse bien a 390 px (celular), 1440 px y pantallas anchas, sin desplazamiento horizontal.
- No usar el símbolo ® (la marca no está registrada).
- No inventar resultados, cifras, clientes ni testimonios. Lo que falte va como marcador entre corchetes.
- Las imágenes de luz se funden con el fondo usando `mask-image`, no con velos oscuros encima. Evitar sombras de color, brillos que sigan al cursor y efectos de vidrio que reflejen la imagen de fondo: no le gustan a Alex.

## Marca

- Estilo: interfaz tipo página de producto de Apple. Titulares grandes y centrados, mosaicos redondeados (28 px), mucho espacio.
- Tipografías: Sora (titulares) e Inter (texto), desde Google Fonts.
- Colores base: Nocturno `#0B0D14`, Violeta `#7B5CFF` (texto/botón `#5B3FE0`), Aura `#8EA7FF`, Lavanda `#B9A8FF`, Magenta `#C43CFF`, Cian `#5CE1FF`, Índigo `#2A0E8A`, fondos `#FFFFFF` y `#F5F5F7`.
- Símbolo: una A sin travesaño. La imagen principal es una A hecha de cintas de luz.

## Servicios (cada uno con personalidad propia)

| Producto | Servicio | Página | Color / fondo | Visual |
|---|---|---|---|---|
| Auryx Aura | Chatbots e IA | `servicios/aura.html` | Negro con cinta de luz | Chat que se escribe solo |
| Auryx Web | Sitios web y landing pages | `servicios/web.html` | Blanco, violeta `#5B3FE0` | Ventana de navegador |
| Auryx Pulso | Redes y contenido | `servicios/pulso.html` | Degradado `#8E1FC4 → #C2246E` | Teléfono con publicaciones |
| Auryx Norte | Estrategia | `servicios/norte.html` | Blanco, índigo `#2A1A8C` | Radar con la A como brújula |
| Auryx Impulso | Publicidad y SEO | `servicios/impulso.html` | Azul suave, `#1F4FB8` | Búsqueda y curva de crecimiento |
| Auryx Flujo | Automatización | `servicios/flujo.html` | Petróleo `#04161D`, cian | Nodos con datos viajando |
| Auryx Respaldo | Soporte y mantenimiento | `servicios/respaldo.html` | Blanco, verde `#1D7A4C` | Panel de estado |

Planes: Presencia, Crecimiento (recomendado) e Integral.

## Pendientes

- Reemplazar `[PRECIO]`, `[hola@auryx.co]` (también en `data-email` de los formularios) y `[+57 300 000 0000]` por los datos reales; enlazar WhatsApp con `https://wa.me/57XXXXXXXXXX`.
- Escribir los artículos del blog: hoy tienen estructura, textos cortos de ejemplo y guías entre corchetes.
- Llenar casos reales (con autorización de cada cliente), el equipo en `nosotros.html` y la historia de Auryx.
- Crear los recursos descargables y quitar la insignia "Próximamente" cuando estén.
- Enlazar Instagram y LinkedIn, y crear las páginas legales (privacidad, términos y tratamiento de datos personales, Ley 1581).
