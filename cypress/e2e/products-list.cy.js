describe('Sincronización de Lista de Productos de API con UI', () => {

 it(' Verificar que la UI muestra los productos que recibe del backend', () => {
    // Intercepto la llamada que hace la UI hace para cargar productos..La app hace una petición : /products?page=1&per_page=9
    cy.intercept('GET', '**/products?page=*').as('getProducts');

    // Visitar la página y esperar a que la llamada ocurra.
    cy.visit('/');
    cy.wait('@getProducts').then((interception) => {
      // Los datos que el backend envió a la UI.
      const apiProducts = interception.response.body.data;
      const apiCount = apiProducts.length;
      const firstNameInApi = apiProducts[0].name;

      cy.log(`Backend envió ${apiCount} productos. El primero es "${firstNameInApi}"`);

      // Veo cuantos sonlos productos visibles en la UI y verificar el primero.
      cy.get('[data-test="product-name"]')
        .should('have.length', apiCount)
        .first()
        .should('contain', firstNameInApi);

      cy.log('La UI muestra correctamente la lista de productos sincronizada con el backend');
    });
  });


it('Simula una respuesta vacía y verifica mensaje de "sin productos"', () => {
    // Intercepto y fuerzo una respuesta vacía.
    cy.intercept('GET', '**/products?page=*', {
      statusCode: 200,
      body: { data: [] },
    }).as('emptyProducts');

    cy.visit('/');
    cy.wait('@emptyProducts');

    // Verificamos que aparece el mensaje esperado y no hay productos.
    cy.get('[data-test="no-results"]').should('be.visible');
   
    cy.log('La UI maneja correctamente el estado de catálogo vacío');
  });

});


