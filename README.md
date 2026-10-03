# Lion Warrior Company - Front-end

Diseño front-end del sitio web de la barbería Lion Warrior Company.
Evidencia GA6-220501096-AA4-EV03 | SENA - Tecnólogo en Análisis y Desarrollo de Software | Ficha 3235899

## Tecnologías aplicadas

| Tecnología | Dónde se encuentra                                                                          |
| ---------- | ------------------------------------------------------------------------------------------- |
| HTML       | Plantillas de cada componente: `src/app/**/*.html`                                          |
| CSS        | Estilos por componente (`*.css`), estilos globales (`src/styles.css`) y Bootstrap           |
| JavaScript | Lógica de interacción en los archivos `*.ts` (TypeScript, que Angular compila a JavaScript) |

El proyecto usa Angular como framework, el mismo componente formativo trabajado en el programa.

## Cómo ejecutar el proyecto

Requisitos: Node.js y npm instalados.

```bash
npm install
ng serve
```

Luego abrir `http://localhost:4200/` en el navegador.
(Si `ng` no se reconoce: `npx ng serve`).

## Estructura

```
src/app/
├── components/   → navbar y footer (reutilizables en todas las páginas)
├── pages/        → home, login, register, service, contact, distrilion
├── app.routes.ts → rutas de navegación
└── app.html      → navbar + router-outlet + footer
```

## Funcionalidades por pantalla

- **Home:** carrusel de imágenes con cambio automático y navegación manual.
- **Login / Register:** formularios con validación (campos obligatorios, formato de correo, teléfono y contraseña) y mensajes de error visibles.
- **Service:** catálogo de servicios de la barbería.
- **Contact:** información de contacto.
- **DistriLion:** módulo de distribuidor con carrito de compra arrastrable.
- **Navbar / Footer:** presentes en todas las páginas, con enlaces a cada sección.

## Usabilidad y diseño

- principios de usabilidad aplicaDOS, tomados de evidencias anteriores
- Diseño adaptable a distintos tamaños de pantalla (Bootstrap y media queries).
- Navegación consistente mediante componentes reutilizables.
- Retroalimentación al usuario en los formularios (mensajes de error claros).

## GitHub

ver https://github.com/dmejianovoa/lion-warrior-company.git
