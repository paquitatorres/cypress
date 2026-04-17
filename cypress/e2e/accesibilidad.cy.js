import { HomePage } from '../support/pages/HomePage';


describe('Pruebas de Accesibilidad Básicas', () => {
  
    it('El home no debería tener violaciones críticas', () => {
    cy.visit('/');
    cy.checkCriticalAccessibility(); 
    cy.log(' Análisis de accesibilidad completado para el home');
  });

  
  it('La pagina de contacto debería ser accesible', () => {
    cy.visit('/contact');
     cy.get('.auth-form form').should('be.visible');
     //analzo el formulario 
      cy.checkAccessibility('.auth-form form');
    cy.log(' Análisis de accesibilidad completado para el formulario de contacto'); });
  
});


describe('Navegación usando el teclado en el home', () => {
  
  beforeEach(() => {
    cy.visit('/');
    //dejo como referencia que el menu que este visible 
     cy.get('[data-test="nav-home"]').should('be.visible');
  });

 it('Debe permitir navegar hasta Contact usando tab y activarlo con enter', () => {

  cy.get('body').focus(); 

  // tab hasta que lo encuentre 
   cy.tabUntil('[data-test="nav-contact"]');
  
  cy.focused().should('have.attr', 'data-test', 'nav-contact').realPress('Enter');;
  
  cy.url().should('include', '/contact');
  
  cy.get('.auth-form').should('be.visible');
  
  cy.log('Navegación por teclado hasta Contact fue exitosa');
  });
   

it('Debe poder buscar un producto usando solo teclado', () => {
  cy.get('body').focus();
  cy.tabUntil('[data-test="search-query"]');
  cy.focused().should('have.attr', 'data-test', 'search-query').type('plier');
  cy.realPress('Enter');
  cy.get('[data-test="product-name"]').should('have.length.greaterThan', 0);
  cy.log('Búsqueda por teclado completada exitosamente');

  });

 it('El foco debe ser visible en todo momento (indicador de accesibilidad)', () => {
  cy.get('body').focus();
  cy.tab();

    cy.focused().then($el => { const outline = window.getComputedStyle($el[0]).outline;
       expect(outline).to.not.match(/none|0px/); });

  cy.log('El indicador de foco es visible - Buenas prácticas de accesibilidad');
});



  }); 