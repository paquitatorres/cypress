export class MenuHeader {

   static get signInButton() {
      return cy.get('[data-test="nav-sign-in"]');
   }

   static get cartButton() {
      return  cy.get('[data-test="nav-cart"]');
   }

   static get profileButton() {
      return cy.get('[data-test="nav-menu"]')
   }

   static get perfilInfo() {
      return cy.get('[data-test="nav-my-profile"]');
   }


//methods

   static goToSignInPage() {
      this.signInButton.click();
   }

   static goToCartPage() {
      this.cartButton.click();
   }

   static goToProfilePage() {
      this.profileButton.click();
      this.perfilInfo.click();
   }



}

