describe('Mocking de Cambio de Precio en Tiempo Real', () => {

  it('Actualiza el precio del producto cuando el backend envía un cambio de precio', () => {
    const productId = '01KPTV9K7FGATK5EJXQCAXF49N'; // Combination Pliers (ID)
    let requestCount = 0;

    // Intercepto la llamada GET del producto
    cy.intercept('GET', `**/products/${productId}`, (req) => {
      requestCount++;
      if (requestCount === 1) {

        // Primera visita: precio normal
        req.reply((res) => {
          res.body.price = 14.15;
        });
      } else {

        // Segunda visita (recarga): precio nuevo
        req.reply((res) => {
          res.body.price = 9.99;
        });
      }
    }).as('getProduct');

    // Primera carga: precio normal
    cy.visit(`/product/${productId}`);
    cy.wait('@getProduct');
    cy.get('[data-test="unit-price"]').should('be.visible');
    cy.get('[data-test="unit-price"]').should('contain', '14.15');
    cy.log(' Precio normal mostrado: $14.15');

    // Simulacion de recarga 
    cy.reload();
    cy.wait('@getProduct');
    
    // Verificamos que el precio se actualizó tras la recarga
    cy.get('[data-test="unit-price"]').should('contain', '9.99');
    cy.log(' La UI actualizó el precio tras una nueva respuesta del backend');
  });


});
  


