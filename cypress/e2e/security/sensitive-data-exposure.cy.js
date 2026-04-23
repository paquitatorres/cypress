
describe('Exposición de Datos Sensibles en URLs', () => {

  let credentials;

  const SENSITIVE_PATTERNS = [
    'token', 'access_token', 'token', 'jwt',
    'session', 'api_key', 'secret', 'password',
    'bearer', 'credential'
  ];

   const assertNoSensitiveDataInUrl = (url, context = '') => {
    const urlLower = url.toLowerCase();
    SENSITIVE_PATTERNS.forEach(pattern => {
      if (urlLower.includes(pattern)) {
        // Falla solo si esta algun posible indicio de token expuesto
        throw new Error(`[${context}]  DATO SENSIBLE EXPUESTO: "${pattern}" en URL: ${url}`);
      }
    });
  };


  before(() => {
    cy.fixture('emailAndPassword').then((data) => { credentials = data;  });
  });


  

  describe('Con credenciales inválidas', () => {

    it('No debe exponer datos sensibles en ninguna URL del flujo de error', () => {
      const interceptedUrls = [];

      cy.intercept('**/*', (req) => {
        interceptedUrls.push(req.url);
      }).as('allRequests');

      cy.visit('/');
      cy.get('[data-test="nav-sign-in"]').click();
      cy.get('[data-test="email"]').type(credentials.invalidUser.email);
      cy.get('[data-test="password"]').type(credentials.invalidUser.password);
      cy.get('[data-test="login-submit"]').click();

      cy.contains('Invalid email or password', { timeout: 5000 }).should('be.visible');

      cy.url().then((url) => assertNoSensitiveDataInUrl(url, 'Browser URL post-error'));
      cy.then(() => interceptedUrls.forEach(url => assertNoSensitiveDataInUrl(url, 'Network request')));
    });
  });

  
  describe('Con credenciales válidas', () => {

    it('No debe exponer el token de sesión real en ninguna URL', () => {
      const interceptedRequests = [];

      cy.intercept('**/*', (req) => {
        interceptedRequests.push({
          url: req.url,
          method: req.method,
        });
      }).as('allRequests');

      cy.visit('/');
      cy.get('[data-test="nav-sign-in"]').click();
      cy.get('[data-test="email"]').type(credentials.validUser.email);
      cy.get('[data-test="password"]').type(credentials.validUser.password);
      cy.get('[data-test="login-submit"]').click();

      // Verificación de login exitoso

      cy.get('[data-test="nav-sign-in"]', { timeout: 8000 }).should('not.exist');

      // Verifica URL del browser post-login
      cy.url().then((url) => {
        assertNoSensitiveDataInUrl(url, 'Browser URL post-login');
      });

      // Verifica todas las requests de red
      cy.then(() => {
        interceptedRequests.forEach(({ url, method }) => {
          assertNoSensitiveDataInUrl(url, `${method} request`);
        });
        cy.log(`✅ ${interceptedRequests.length} requests verificadas (credenciales válidas)`);
      });
    });

    it('El token no debe aparecer al navegar hacia atrás en el historial', () => {
      cy.visit('/');
      cy.get('[data-test="nav-sign-in"]').click();
      cy.get('[data-test="email"]').type(credentials.validUser.email);
      cy.get('[data-test="password"]').type(credentials.validUser.password);
      cy.get('[data-test="login-submit"]').click();

       cy.get('[data-test="nav-sign-in"]', { timeout: 8000 }).should('not.exist');

      cy.go('back');

      cy.url().then((url) => {
        assertNoSensitiveDataInUrl(url, 'URL al navegar hacia atrás');
      });
    });

  });

  
  describe('Headers de respuesta', () => {

    it('La respuesta de login no debe devolver token en headers inseguros', () => {
      const DANGEROUS_HEADERS = ['x-token', 'x-auth', 'x-access-token'];

      cy.intercept('POST', '**/users/login', (req) => {
        req.continue((res) => {
          DANGEROUS_HEADERS.forEach((header) => {
            expect(res.headers, `Header inseguro encontrado: ${header}`)
              .to.not.have.property(header);
          });
        });
      }).as('loginRequest');

      cy.visit('/');
      cy.get('[data-test="nav-sign-in"]').click();
      cy.get('[data-test="email"]').type(credentials.validUser.email);
      cy.get('[data-test="password"]').type(credentials.validUser.password);
      cy.get('[data-test="login-submit"]').click();

      cy.wait('@loginRequest');
      cy.log(' Headers de respuesta verificados');
    });

  });

});