describe("panier", () => {
  before(() => {
    // connexion avant tous les tests
    cy.visit("http://localhost:8080/");
    cy.get("[data-cy='nav-link-login']").click();
    cy.get("#username").type("test2@test.fr");
    cy.get("#password").type("testtest");
    cy.get("[data-cy='login-submit']").click();
    cy.get("[data-cy='nav-link-cart']").should("exist");
  });

  it("test du panier", () => {
    cy.get("[data-cy='nav-link-products']").click();
    cy.get("[data-cy='product-link']").eq(3).click();
    cy.wait(1000);

    let stock; // variable stock globale pour poivoir la réutiliser

    cy.get("[data-cy='detail-product-stock']").should('be.visible').invoke('text').then((stockText) => {
      stock = parseInt(stockText, 10)
      expect(stock).to.be.greaterThan(1)})

    cy.get("[data-cy='detail-product-add']").should("be.visible").click();
    cy.get("[data-cy='cart-line']").should("be.visible");

    // retour
    cy.get("[data-cy='nav-link-products']").click()
    cy.get("[data-cy='product-link']").eq(3).click()
    cy.wait(1000);

    // stock -1 ?
    cy.get("[data-cy='detail-product-stock']").invoke('text').then((newStockText) => {
      const newStock = parseInt(newStockText, 10)
      expect(newStock).to.equal(stock - 1)
    })

    cy.get("[data-cy='nav-link-products']").click();
    cy.get("[data-cy='product-link']").eq(3).click();
    cy.wait(1000);

    cy.get("[data-cy='detail-product-quantity']").clear().type('-1')
    cy.get("[data-cy='detail-product-add']").click()

    cy.get("[data-cy='detail-product-quantity']").clear().type('50')
    cy.get("[data-cy='detail-product-add']").click()
  });

  // it("test des limites", () => {
  //   cy.get("[data-cy='detail-product-quantity']").clear().type('-1')
  //   cy.get("[data-cy='detail-product-add']").click()

  //   cy.get("[data-cy='detail-product-quantity']").clear().type('50')
  //   cy.get("[data-cy='detail-product-add']").click()
  // });

});
