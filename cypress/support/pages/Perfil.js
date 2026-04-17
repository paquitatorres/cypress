export class Perfil {

 static get titlePage() {
    return cy.get('[data-test="page-title"]')
 }

 static get nameField() {
    return cy.get('[data-test="first-name"]')
 }

 static get lastNameField() {
    return cy.get('[data-test="last-name"]');
 }

 static get emailField() {
    return cy.get('[data-test="email"]');
 }

 static get phoneField() {
    return cy.get('[data-test="phone"]');
 }

 static get streetField() {
    return cy.get('[data-test="street"]');
 }

 static get postalCodeField() {
    return cy.get('[data-test="postal_code"]');
 }
 
 static get cityField() {
    return cy.get('[data-test="city"]');
 }

 static get stateField() {
    return cy.get('[data-test="state"]');
 }

 static get countryField() {
    return cy.get('[data-test="country"]');
 }

 static get dateOfBirthField() {
    return cy.get('[data-test="dob"]');
 }



//methods







}