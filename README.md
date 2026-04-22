# Cypress (Pruebas en e-commerse tanto de API con UI)

![Cypress](https://img.shields.io/badge/Cypress-14.0.0-brightgreen?logo=cypress)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI/CD-blue?logo=githubactions)
![Mochawesome](https://img.shields.io/badge/Report-Mochawesome-9cf)


##  Objetivo 
El proyecto busca cubrir distintas dimensiones de calidad, fuera de solamente el diseño de pruebas funcionales, con la finalidad tambien de medir la robustez del sistema sobre una aplicación e-commerce, incluyendo aspectos clave de calidad como resiliencia, seguridad, accesibilidad, consistencia de datos entre API y UI como tambien la automatización de pruebas end-to-end, cubriendo los principales flujos funcionales que necesita el usuario para realizar una compra. 

A través de este enfoque, se busca:

* Validar el flujo crítico de negocio (registro, compra y persistencia de datos)
* Asegurar la integridad entre la información provista por la API y su representación en la UI
* Simular escenarios reales mediante mocking para reducir la dependencia del backend
* Detectar fallos ante condiciones adversas (errores de red, respuestas vacías, fallos del servidor)
* Identificar vulnerabilidades básicas de seguridad en el frontend
* Verificar el cumplimiento de estándares de accesibilidad

En sintesis, este proyecto refleja un enfoque de testing orientado a calidad integral.

## Stack

| Cypress | JavaScript | GitHub Actions | Axe | Ubuntu |
|:-------:|:----------:|:--------------:|:---:|:------:|
| <a href="https://www.cypress.io" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c09f4cf5a9a8dab2c8/icons/Cypress-Light.svg" alt="cypress" width="40" height="40"/></a> | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/></a> | <a href="https://github.com/features/actions" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c09f4cf5a9a8dab2c8/icons/GithubActions-Light.svg" alt="github actions" width="40" height="40"/></a> | <a href="https://www.deque.com/axe/" target="_blank" rel="noreferrer"><img src="https://deque-systems.gallerycdn.vsassets.io/extensions/deque-systems/vscode-axe-linter/4.11.0/1768840736983/Microsoft.VisualStudio.Services.Icons.Default" alt="axe" width="40" height="40"/></a> | <a href="https://ubuntu.com" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c09f4cf5a9a8dab2c8/icons/Ubuntu-Light.svg" alt="ubuntu" width="40" height="40"/></a> |

| Herramienta | Uso |
| Faker.js | Generación de datos aleatorios |
| cy.intercept() | Mocking de red y control de API |
| axe-core | Auditoría de accesibilidad WCAG |

# 🧪 QA Test Suite — Cypress E2E

Suite de pruebas automatizadas end-to-end construida con **Cypress**, diseñada para cubrir los aspectos más críticos de una aplicación de e-commerce: flujos de usuario, integridad de datos, resiliencia, seguridad y accesibilidad.

---

## 🗂️ Estructura de tests

### 🔥 Smoke Test — Flujos Críticos

> *Si algo falla aquí, nada más importa.*

Validación end-to-end del recorrido principal del usuario, asegurando que el flujo de compra completo funcione de punta a punta en todo momento.

**Cubre:**
- Registro de usuario con datos estáticos y datos aleatorios generados con **Faker**
- Búsqueda de producto y agregado al carrito
- Checkout completo con login
- Verificación del perfil para confirmar que los datos del usuario registrado coinciden correctamente

Este test es la primera línea de defensa: si el flujo principal de compra está roto, el usuario no puede usar el producto.

---

### 🔗 Consistencia API + UI

> *Lo que el backend devuelve debe ser exactamente lo que el usuario ve.*

Valida que los datos mostrados en la interfaz sean consistentes con los que expone la API, evitando discrepancias silenciosas entre el frontend y el backend.

**Cubre:**
- Comparación directa de datos entre respuestas de API y elementos renderizados en UI
- Validación de estados vacíos (ej: pantalla "sin productos")

Una UI que muestra datos incorrectos es tan peligrosa como un bug funcional — este test lo detecta antes de que llegue a producción.

---

### 🎭 Mocking & Control del Backend

> *No esperamos que el backend falle — lo hacemos fallar nosotros primero.*

Usando `cy.intercept()`, se interceptan y manipulan las respuestas de la API para simular escenarios dinámicos que serían difíciles o imposibles de reproducir en un entorno real.

**Cubre:**
- Simulación de cambios de precio en tiempo real
- Manipulación de respuestas de API para forzar estados específicos

Esto permite testear comportamientos edge-case sin depender del estado del backend, acelerando el ciclo de QA y haciendo los tests más deterministas.

---

### 💥 Resiliencia — Manejo de Errores

> *Una app de calidad no solo funciona cuando todo va bien.*

Se simulan condiciones adversas para verificar que la aplicación responde de forma controlada y comunica los errores de manera clara al usuario.

**Cubre:**
- Simulación de caída de red
- Manejo de errores HTTP `500` (error de servidor) y `404` (recurso no encontrado)
- Verificación de mensajes de error amigables para el usuario final

La estabilidad ante fallos reales es lo que diferencia una app robusta de una frágil. Estos tests aseguran que los errores no se conviertan en experiencias destructivas para el usuario.

---

### 🔐 Seguridad

> *Las vulnerabilidades más comunes son también las más evitables.*

Se validan aspectos de seguridad básicos pero críticos que suelen pasarse por alto en el testing funcional.

**Cubre:**
- Validación de cabeceras HTTP de seguridad (`Content-Security-Policy`, `X-Frame-Options`)
- Simulación de ataque de fuerza bruta para detectar ausencia de rate limiting
- Verificación de que datos sensibles no queden expuestos en respuestas o en el DOM

La detección temprana de vulnerabilidades en el ciclo de desarrollo es exponencialmente más barata que corregirlas en producción.

---

### ♿ Accesibilidad

> *Una interfaz que no todos pueden usar, no está terminada.*

Se valida el cumplimiento de estándares de accesibilidad web para garantizar que la aplicación sea usable por la mayor cantidad de personas posible.

**Cubre:**
- Escaneo automático de violaciones **WCAG 2.1 AA**
- Validación de navegación completa por teclado
- Verificación de foco visible en elementos interactivos

La accesibilidad no es un extra — es un requisito de calidad. Estos tests ayudan a que el producto cumpla buenas prácticas desde las primeras etapas del desarrollo.

---



## ▶️ Instalación y ejecución

npm install

npx cypress open

Modo headless:

npx cypress run

### 📊 Reportes

Los tests generan reportes HTML utilizando Mochawesome.

npm run test
npm run report


### Integración continua (CI)

El proyecto incluye un workflow configurado en .github/workflows/cypress-tests.yml que:

Ejecuta todas las pruebas en cada push a main.

Genera el reporte HTML y lo adjunta como artefacto descargable.

Publica los hallazgos de seguridad en un archivo security-issues.json.

El proyecto puede ejecutarse automáticamente con GitHub Actions:

Ejecución de tests en cada push
Generación de reportes
Publicación de resultados como artifacts


## Notas de QA y Mejores Prácticas
Page Objects: Separación de localizadores y acciones en support/pages/.

Generación de datos: Uso de @faker-js/faker combinado con fixtures estáticos.

Comandos personalizados: cy.tabUntil(), cy.checkAccessibility(), cy.loginViaApi().

Pruebas no felices: Se documentan vulnerabilidades con throw new Error para visibilizarlas en reportes.

Esperas deterministas: Eliminación de cy.wait() por aserciones sobre UI (should('be.visible')).









