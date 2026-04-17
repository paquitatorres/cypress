// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// cypress/support/commands.js

import 'cypress-axe';
import 'cypress-plugin-tab';


Cypress.Commands.add('registerUserViaApi', (userData) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('API_BASE_URL')}/users/register`,
    body: userData,
    failOnStatusCode: false,
  });
});


// Comando para un escaneo estándar de accesibilidad
Cypress.Commands.add('checkAccessibility', (selector = null, options = null) => {
  cy.injectAxe();
  cy.checkA11y(selector, options, (violations) => {
    cy.task('log', `Se encontraron ${violations.length} violaciones de accesibilidad.`);
    violations.forEach(v => {
      cy.task('log', `- [${v.impact}] ${v.help} (${v.id})`);
    });
  });
});

// Comando más estricto, solo para problemas críticos o serios
Cypress.Commands.add('checkCriticalAccessibility', (selector = null) => {
  cy.injectAxe();
  cy.checkA11y(selector, {
    includedImpacts: ['critical', 'serious'] // Solo falla en estos niveles
  });
});


// lo de navegar por teclado, tab hasta el elemento 


Cypress.Commands.add('tabUntil', { prevSubject: 'optional' }, (subject, selector, maxTabs = 20) => {
  // Función recursiva que avanza con Tab hasta encontrar el selector
  const checkAndTab = (count = 0) => {
    if (count > maxTabs) {
      throw new Error(`No se encontró el elemento '${selector}' después de ${maxTabs} tabs.`);
    }
    return cy.focused({ timeout: 1000 }).then($focused => {
      if ($focused.is(selector)) {
        return cy.wrap($focused);
      }
      return cy.focused().tab().then(() => checkAndTab(count + 1));
    });
  };

  // Preparación del punto de partida
  if (subject) {
    return cy.wrap(subject).focus().then(() => checkAndTab());
  }
  
  // Sin subject: intentamos obtener el foco actual.
  // Si no hay foco (timeout), forzamos foco en body y tab inicial.
  return cy.get('body').then($body => {
    const activeElement = $body[0].ownerDocument.activeElement;
    if (activeElement === $body[0] || activeElement.tagName === 'BODY') {
      
      // No hay foco útil, forzamos foco en body y un primer tab
      return cy.wrap($body).focus().tab().then(() => checkAndTab());
    }
    
    // Ya hay un elemento enfocado, comenzamos directamente
    return checkAndTab();
  });
});