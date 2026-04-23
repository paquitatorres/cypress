export class SignInPage {


   static get emailLoginInput() {
      return cy.get('[data-test="email"]');
   }

   static get passwordLoginInput() {
      return cy.get('[data-test="password"]');
   }

  static get loginButton() {
      return cy.get('[data-test="login-submit"]');
   }

   static get registerButton() {
      return cy.get('[data-test="register-link"]');
   }

   static get firstNameInput() {
      return cy.get('[data-test="first-name"]');
   }

   static get lastNameInput() {
      return cy.get('[data-test="last-name"]');
   }

   static get dateOfBirthInput() {
      return cy.get('[data-test="dob"]');
   }

   static get streetInput() {
      return cy.get('[data-test="street"]');
   }

   static get postalCodeInput() {
      return cy.get('[data-test="postal_code"]');
   }

   static get cityInput() {
      return cy.get('[data-test="city"]');
   }

   static get stateInput() {
      return cy.get('[data-test="state"]');
   }

   static get countryDropdown() {
      return cy.get('[data-test="country"]');
   }

   static get phoneInput() {
      return cy.get('[data-test="phone"]');
   }


   static get emailInput() {
      return cy.get('[data-test="email"]');
   }


   static get passwordInput() {
      return cy.get('[data-test="password"]');
   }

   static get NumberHouseInput() {
      return cy.get('[data-test="house_number"]')
   }

   static get submitButton() {
      return cy.get('[data-test="register-submit"]');
   }






// metodos 

   static clickRegisterLink() {
   return this.registerButton.click();
}

   static fillRegistrationForm(user) {
     if (user.firstName) this.firstNameInput.type(user.firstName);
        if (user.lastName) this.lastNameInput.type(user.lastName);
        if (user.dateOfBirth) this.dateOfBirthInput.type(user.dateOfBirth); 
         if (user.street) this.streetInput.type(user.street);
        if (user.postalCode) this.postalCodeInput.type(user.postalCode);
        if (user.city) this.cityInput.type(user.city);
        if (user.state) this.stateInput.type(user.state);
         if (user.country) this.countryDropdown.select(user.country);
        if (user.phone) this.phoneInput.type(user.phone);
        if (user.email) this.emailInput.type(user.email);
        if (user.password) this.passwordInput.type(user.password);
        if (user.numberHouse) this.NumberHouseInput.type(user.numberHouse);
         return this; // Permite encadenar como: fillForm(user).submit()
}

      static submitRegistration() {
        return this.submitButton.click();
    }

      static registerNewUser(user) {
        return this.fillRegistrationForm(user).submitRegistration();
    }

    static login(user) {
        if (user.email) this.emailLoginInput.type(user.email);
        if (user.password) this.passwordLoginInput.type(user.password);
        return this.loginButton.click();
    }

}