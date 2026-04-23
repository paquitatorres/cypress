import { generateNewUser } from '../support/data-generators/userBuilder';
import { SignInPage } from '../support/pages/SignInPage';
import { MenuHeader } from '../support/pages/MenuHeader';
import { HomePage } from '../support/pages/HomePage';
import { ProductDescription } from '../support/pages/ProductDescription';
import { Cart } from '../support/pages/Cart'; 
import cardInfo from '../fixtures/cardInfo.json';
import { Perfil } from '../support/pages/Perfil';

describe('Prueba e2e:  Crear un usuario desde cero con datos estaticos y dinamicos, realizar una compra , y revisar los datos del perfil' , () => {
 
 let usuario; 

 before(() => 
  { usuario = generateNewUser(); 
    cy.visit('/');
    MenuHeader.goToSignInPage(); 
    SignInPage.clickRegisterLink();
    SignInPage.fillRegistrationForm(usuario); 
   
    SignInPage.submitRegistration();
 })

  it('Realizar una compra con los datos del usuario creado', () => {
    // Verificar el before de registro fue exitoso 
      cy.url().should('include', 'auth/login');
       MenuHeader.signInButton.should('be.visible'); 

    // Realizar una búsqueda de un producto 
      HomePage.goToHomePage();
      HomePage.searchProduct('plier');
      HomePage.selectFirstProduct();
      ProductDescription.addProductToCart();
      MenuHeader.cartButton.should('be.visible');
      MenuHeader.goToCartPage(); 
 
      Cart.firstStepCheckout();
      Cart.loginDuringCheckout(usuario);
      Cart.secondStepCheckout();
      Cart.fillShippingAddress(usuario);
      Cart.confirmShippingAddress();
      Cart.selectPaymentMethod('credit-card');
      Cart.fillCreditCardInfo(cardInfo , usuario);
       Cart.confirmPayment();

      Cart.messagePaymentSuccess.should('be.visible').and('contain', 'Payment was successful');

      cy.log('Compra realizada con éxito para el usuario: ', usuario.email);
      
  })



   it('Revisar los datos del perfil coincidan con los datos del usuario creado', () => { 
        cy.visit('/');
         MenuHeader.goToSignInPage();
         SignInPage.login(usuario);


    MenuHeader.profileButton.should('be.visible');
    MenuHeader.goToProfilePage();
    Perfil.titlePage.should('be.visible');

     Perfil.nameField.should('have.value', usuario.firstName);
     Perfil.lastNameField.should('have.value', usuario.lastName);
     Perfil.emailField.should('have.value', usuario.email);
     Perfil.phoneField.should('have.value', usuario.phone);
     Perfil.streetField.should('have.value', usuario.street);
     Perfil.postalCodeField.should('have.value', usuario.postalCode);
     Perfil.cityField.should('have.value', usuario.city);
     Perfil.stateField.should('have.value', usuario.state);
    
     cy.log(' Perfil validado correctamente.');
   })











})