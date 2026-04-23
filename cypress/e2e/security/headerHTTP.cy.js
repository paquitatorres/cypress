// Prueba Informativa 

describe(' Seguridad: Cabeceras HTTP', () => {
  const endpoints = [
    { name: 'products', path: 'products' },
    { name: 'login', path: 'users/login' }
  ];

  before(() => {
    cy.task('clearSecurityReport'); // Limpiamos reporte anterior
  });

  endpoints.forEach((endpoint) => {
    it(`Verifica cabeceras de seguridad en ${endpoint.name}`, () => {
      const fullUrl = `${Cypress.env('API_BASE_URL')}/${endpoint.path}`;
      cy.request({ url: fullUrl, failOnStatusCode: false }).then((response) => {
        const headers = response.headers;
        const missingHeaders = [];

        if (!headers['x-frame-options']) missingHeaders.push('X-Frame-Options');
        if (!headers['x-content-type-options']) missingHeaders.push('X-Content-Type-Options');
        if (!headers['content-security-policy']) missingHeaders.push('Content-Security-Policy');

        if (missingHeaders.length > 0) {
          cy.task('logSecurityIssue', { endpoint: endpoint.name, missingHeaders });
          // El test pasa "verde" con advertencia en reporte 
          cy.log(` ${missingHeaders.length} cabeceras ausentes - ver reporte`);
        } else {
          cy.log(' Todas las cabeceras esperadas presentes');
        }
      });
    });
  });

  after(() => {
    // Leemos el reporte y mostramos resumen en consola
    cy.task('log', '--- Resumen de Vulnerabilidades de Cabeceras ---');
    cy.readFile('cypress/reports/security-issues.json').then((issues) => {
      if (issues.length) {
        cy.log(` Se encontraron ${issues.length} endpoints con cabeceras faltantes.`);
        issues.forEach(issue => {
          cy.log(`   ➤ ${issue.endpoint}: faltan ${issue.missingHeaders.join(', ')}`);
        });
      } else {
        cy.log(' Ninguna vulnerabilidad de cabeceras detectada');
      }
    });
  });
});