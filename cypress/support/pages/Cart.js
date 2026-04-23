export class Cart {

static get proceedToCheckoutBtn1(){
    return  cy.get('[data-test="proceed-1"]');
}

static get emailInput() {
    return cy.get('[data-test="email"]');
}

static get passwordInput() {
    return cy.get('[data-test="password"]');
}

static get submitButton() {
    return cy.get('[data-test="login-submit"]');
}

static get proceedToCheckoutBtn2() {
    return cy.get('[data-test="proceed-2"]');
}

static get streetInput(){
    return cy.get('[data-test="street"]');
}

static get cityInput(){
    return cy.get('[data-test="city"]');
}

static get stateInput(){
    return cy.get('[data-test="state"]');
}

static get countryInput(){
    return cy.get('[data-test="country"]');
}

static get numberHouseInput() {
    return cy.get('[data-test="house_number"]')
}

static get postalCodeInput(){
    return cy.get('[data-test="postal_code"]');
}

static get confirmShippingAddressBtn() {
    return cy.get('[data-test="proceed-3"]');
}

static get PaymentMethodDropdown(){
    return cy.get('[data-test="payment-method"]');
}

// <option value="credit-card">Credit Card</option>

static get creditCardNumberInput() {
    return cy.get('[data-test="credit_card_number"]');
}

//16-digit credit card number as it appears on the card, in the format 0000-0000-0000-0000

static get creditCardExpiryInput() {
    return cy.get('[data-test="expiration_date"]');
}

static get creditCardCVVInput() {
    return cy.get('[data-test="cvv"]');
}

//The CVV is a 3-digit or 4-digit number.  

static get creditCardHolderNameInput() {
    return cy.get('[data-test="card_holder_name"]');
}

static get confirmPaymentBtn() {
    return cy.get('[data-test="finish"]');
}

static get messagePaymentSuccess() {
    return cy.get('[data-test="payment-success-message"]');
}


//metodo

static firstStepCheckout() {
   return this.proceedToCheckoutBtn1.click();
}

static fillLoginForm(user) {
      if (user.email) this.emailInput.type(user.email);
      if (user.password) this.passwordInput.type(user.password);
      return this;
}

static submitLogin() {
    return this.submitButton.click();
}

static loginDuringCheckout(user) {
    return this.fillLoginForm(user).submitLogin();
}

static secondStepCheckout() {
   return this.proceedToCheckoutBtn2.click();
}

static fillShippingAddress(user) {
    if (user.street) this.streetInput.type(user.street);
    if (user.city) this.cityInput.type(user.city);
    if (user.state) this.stateInput.type(user.state);
    if (user.country) this.countryInput.type(user.country);
    if (user.postalCode) this.postalCodeInput.type(user.postalCode);
    if (user.numberHouse) this.numberHouseInput.type(user.numberHouse);
    return this;
}

static confirmShippingAddress() {
   return this.confirmShippingAddressBtn.click();
}

static selectPaymentMethod(method) {
     return this.PaymentMethodDropdown.select(method);
}
    

static fillCreditCardInfo(cardInfo , user ) {
    if (cardInfo.number) this.creditCardNumberInput.type(cardInfo.number);
    if (cardInfo.expiration) this.creditCardExpiryInput.type(cardInfo.expiration);
    if (cardInfo.cvv) this.creditCardCVVInput.type(cardInfo.cvv);
    
    if (user.firstName && user.lastName) this.creditCardHolderNameInput.type(`${user.firstName} ${user.lastName}`);
   return this;
}

static confirmPayment() {
    return this.confirmPaymentBtn.click();
}




}