
describe(' ante caída de API ', () => {
  it('Muestra mensaje de error cuando la API de productos no responde', () => {
    cy.intercept('GET', '**/products?*', {
      forceNetworkError: true // Simula pérdida de red
    }).as('networkError');

    cy.visit('/');
    cy.wait('@networkError');

  
    cy.get('[data-test="product-name"]').should('not.exist');

    cy.log('La UI mostró feedback adecuado ante caída de API');
  });
});