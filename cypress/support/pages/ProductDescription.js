export class ProductDescription {

static get addToCartButton() { 
return cy.get('[data-test="add-to-cart"]');
}

//solo aparece cuando se agrega el primer producto al carrito, por eso no se puede usar un locator fijo
static get confirmationAddProductMessage() {
return cy.get('#toast-container');;   
}

static get ProductDescription(){
    return cy.get('[data-test="product-description"]');
}

static get ProductPrice(){
    return cy.get('[data-test="product-price"]');
}

static get ProductImage(){
    return cy.get('[data-test="product-image"]');
}
//metodo 

static addProductToCart() {
this.addToCartButton.click();   
}



}
