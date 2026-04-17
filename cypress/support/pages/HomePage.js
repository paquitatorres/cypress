
export class HomePage {
//locators 
 
static get homePageBtn() {
   return cy.get('[data-test="nav-home"]');
}

static get searchInput() {
   return cy.get('[data-test="search-query"]');
}

static get searchButton() {
   return cy.get('[data-test="search-submit"]');
}

static get productsNameinCard() {
   return cy.get('[data-test="product-name"]');    
}

//metodos 


static goToHomePage() {
  return  this.homePageBtn.click();
}


static searchProduct(productName) {
   this.searchInput.type(productName);
   this.searchButton.click();
} 

static selectFirstProduct() {
   this.productsNameinCard.first().click();
}












}