# Plai.cl - Migración a Arquitectura Estática 🚀

Este repositorio contiene la versión moderna y estática del sitio web **Plai.cl**, migrado desde su origen en WordPress hacia un ecosistema moderno basado en **Astro** y **Tailwind CSS**.

El objetivo primario del proyecto fue eliminar dependencias con PHP, limpiar el código muerto autogenerado por plugins de WordPress, mejorar la velocidad de carga a un modelo "Zero-JS" (gracias a Astro) y preservar/mejorar el diseño con una experiencia `Mobile-First`.

## 🏗️ Arquitectura del Sitio

El proyecto utiliza las siguientes tecnologías clave:
- **[Astro](https://astro.build/)**: Framework del lado del servidor que genera HTML estático rapidísimo, ideal para landings y agencias.
- **[Tailwind CSS](https://tailwindcss.com/)**: Motor de estilos por utilidades utilizado en todos los componentes para evitar grandes hojas de CSS globales.

### Estructura de Directorios

```text
plai-static/
├── public/                 
│   └── images/             # Logos, ilustraciones de gráficas y fondos originales
├── src/
│   ├── components/         # Bloques de UI reutilizables
│   │   ├── Header.astro    # Navegación y Menú Responsive Móvil
│   │   ├── Hero.astro      # Cabecera principal adaptativa con imágenes flotantes
│   │   ├── Services.astro  # "Qué Automatizamos"
│   │   ├── About.astro     # "Por qué Plai" / "Quiénes Somos"
│   │   ├── Casos.astro     # Tarjetas de Casos de Éxito
│   │   └── Contacto.astro  # Llamado a la acción "Hablemos"
│   │   └── Footer.astro    # Pie de página
│   ├── layouts/
│   │   └── Layout.astro    # Plantilla base (contiene <html>, <head>, Google Fonts e integración GA4 nativa)
│   └── pages/
│       └── index.astro     # Landing page que ensambla todos los componentes
├── astro.config.mjs        # Configuración central (integra Tailwind)
├── tailwind.config.mjs     # Tema personalizado con la paleta de colores oficial de Plai
└── package.json            # Dependencias del proyecto
```

## 💻 Entorno Local (Cómo levantar el proyecto)

Asegúrate de tener instalado **Node.js** (v18+) en tu sistema.

1. **Instalar dependencias:**
   Abre una terminal en la raíz del proyecto y ejecuta:
   ```bash
   npm install
   ```

2. **Levantar el servidor de desarrollo:**
   Una vez instalados los paquetes, puedes correr el entorno interactivo con recarga rápida (HMR):
   ```bash
   npm run dev
   ```
   El servidor normalmente arrancará en `http://localhost:4321`. Podrás ver cualquier cambio que hagas en los archivos `.astro` reflejado instantáneamente.

3. **Construir para Producción (Build):**
   Cuando el sitio esté listo para ser desplegado (Vercel, AWS S3, Cloudflare Pages, Netlify, etc), simplemente ejecuta:
   ```bash
   npm run build
   ```
   Esto generará una carpeta `dist/` conteniendo archivos HTML puros, CSS minificado y assets, lista para ser servida por cualquier web server sin necesidad de motores backend.

## 🚀 Despliegue en Producción (Firebase & GitHub Pages)

El proyecto cuenta con una arquitectura de despliegue automatizada y dividida por ramas:

### 1. Entorno de Pruebas (GitHub Pages)
Cualquier código que envíes a la rama `release` será compilado automáticamente por GitHub Actions y publicado de forma gratuita bajo el dominio de `github.io` para revisiones del equipo.

### 2. Entorno de Producción (Firebase Hosting)
La versión oficial, lista para el dominio principal `plai.cl`, se aloja en Google Firebase. 

**Requisitos Previos:**
Solo se hace una vez por computadora.
1. Instala Firebase CLI: `npm install -g firebase-tools`
2. Inicia sesión en Google Cloud: `firebase login`

**Comando Oficial de Despliegue:**
Asegúrate de estar en la rama `main` y ejecuta:
```bash
npm run build && firebase deploy
```
*Este comando construirá la versión final ultraligera dentro de `/dist` y la enviará instantáneamente a los nodos globales de la CDN de Google.*