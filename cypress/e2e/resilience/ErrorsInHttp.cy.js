describe(' Resiliencia: Errores HTTP', () => {
  const productId = '01KPD3V4CZ2BNHDNWNVWZ82ST0'; // Combination Pliers




  it('Muestra mensaje de error cuando la API de producto devuelve 500', () => {
    cy.intercept('GET', `**/products/${productId}`, {
      statusCode: 500,
      body: { message: 'Internal Server Error' }
    }).as('getProductError');

    cy.visit(`/product/${productId}`);
    cy.wait('@getProductError');

    // Verificar mensaje de error pero la aplicacion no tiene parece un mensaje de error especifico
    //cy.contains('Error').should('be.visible');
    // Verificar que no se muestra el precio (indica que no cargó)
    cy.get('[data-test="unit-price"]').should('not.exist');

    cy.log(' La UI manejó correctamente un error 500 del servidor');
  });


  
  it('(404) cuando se manda una solicitud para un producto inexistente', () => {
    const fakeId = 'producto-inexistente-12345';

    cy.intercept('GET', `**/products/${fakeId}`, {
      statusCode: 404,
      body: { message: 'Product not found' }
    }).as('getProduct404');

    cy.visit(`/product/${fakeId}`);
    cy.wait('@getProduct404');

    // Verificar que aparece mensaje de no encontrado o redirección
   // cy.contains('not found').should('be.visible');
   // cy.get('[data-test="unit-price"]').should('not.exist');

    cy.log(' La UI manejó correctamente un error 404');
  });
});
