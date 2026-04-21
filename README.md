# Cypress (Pruebas en e-commerse tanto de API con UI)

![Cypress](https://img.shields.io/badge/Cypress-14.0.0-brightgreen?logo=cypress)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI/CD-blue?logo=githubactions)
![Mochawesome](https://img.shields.io/badge/Report-Mochawesome-9cf)


##  Objetivo 
El proyecto cubre distintas dimensiones de calidad para asegurar robustez del sistema.

Este proyecto tiene como objetivo demostrar la capacidad de diseñar y automatizar pruebas end-to-end sobre una aplicación e-commerce, cubriendo no solo el flujo funcional principal, sino también aspectos clave de calidad como resiliencia, seguridad, accesibilidad y consistencia de datos entre API y UI.

A través de este enfoque, se busca:

* Validar el flujo crítico de negocio (registro, compra y persistencia de datos)
* Asegurar la integridad entre la información provista por la API y su representación en la UI
* Simular escenarios reales mediante mocking para reducir la dependencia del backend
* Detectar fallos ante condiciones adversas (errores de red, respuestas vacías, fallos del servidor)
* Identificar vulnerabilidades básicas de seguridad en el frontend
* Verificar el cumplimiento de estándares de accesibilidad

El proyecto refleja un enfoque de testing orientado a calidad integral, más allá de la simple validación funcional.

## Tecnologías

| Cypress | JavaScript | GitHub Actions | Axe | Ubuntu |
|:-------:|:----------:|:--------------:|:---:|:------:|
| <a href="https://www.cypress.io" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c09f4cf5a9a8dab2c8/icons/Cypress-Light.svg" alt="cypress" width="40" height="40"/></a> | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/></a> | <a href="https://github.com/features/actions" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c09f4cf5a9a8dab2c8/icons/GithubActions-Light.svg" alt="github actions" width="40" height="40"/></a> | <a href="https://www.deque.com/axe/" target="_blank" rel="noreferrer"><img src="https://deque-systems.gallerycdn.vsassets.io/extensions/deque-systems/vscode-axe-linter/4.11.0/1768840736983/Microsoft.VisualStudio.Services.Icons.Default" alt="axe" width="40" height="40"/></a> | <a href="https://ubuntu.com" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c09f4cf5a9a8dab2c8/icons/Ubuntu-Light.svg" alt="ubuntu" width="40" height="40"/></a> |



## Cobertura de los tests 

### Smoke Test (de Flujos Crítico )

Validación end-to-end del recorrido principal del usuario:

Registro de usuario (datos estáticos + Faker)
Búsqueda de producto
Agregado al carrito
Login
Checkout completo
Validación de datos en perfil

✔ Valor: asegura que el flujo principal de compra funciona correctamente de punta a punta.

🔗 Consistencia API + UI
Comparación de datos entre API y UI
Validación de estados vacíos (“sin productos”)

✔ Valor: garantiza integridad entre backend y frontend.

🎭 Mocking & Control del Backend

Uso de cy.intercept() para simular escenarios dinámicos:

Cambios de precio en tiempo real
Manipulación de respuestas de API

✔ Valor: permite testear escenarios difíciles de reproducir y reduce dependencia del backend.

🛡️ Resiliencia (Manejo de errores)
Simulación de caída de red
Manejo de errores HTTP (500 / 404)
Validación de mensajes amigables para el usuario

✔ Valor: asegura estabilidad ante fallos reales.

🔒 Seguridad
Validación de cabeceras HTTP (CSP, X-Frame-Options)
Simulación de ataque de fuerza bruta (detección de falta de rate limiting)
Verificación de no exposición de datos sensibles

✔ Valor: detección temprana de vulnerabilidades comunes.

♿ Accesibilidad 
Escaneo automático (WCAG 2.1 AA)
Navegación por teclado
Validación de foco visible

✔ Valor: mejora la experiencia de usuario y cumple buenas prácticas.



▶️ Instalación y ejecución
npm install
npx cypress open

Modo headless:

npx cypress run
📊 Reportes

Los tests generan reportes HTML utilizando Mochawesome.

npm run test
npm run report

Los reportes pueden integrarse con CI (GitHub Actions) como artifacts descargables.


Integración continua (CI)

El proyecto incluye un workflow configurado en .github/workflows/cypress-tests.yml que:

Ejecuta todas las pruebas en cada push a main.

Genera el reporte HTML y lo adjunta como artefacto descargable.

Publica los hallazgos de seguridad en un archivo security-issues.json.

El proyecto puede ejecutarse automáticamente con GitHub Actions:

Ejecución de tests en cada push
Generación de reportes
Publicación de resultados como artifacts








