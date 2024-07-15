describe("connexion", () => {
  it("présence des champs et boutons de connexion", () => {
    cy.visit("http://localhost:8080/#/login");
    cy.get("#username").should("exist");
    cy.get("#password").should("exist");
    cy.get("[data-cy='login-submit']").should("exist");    
    });
});

describe('bouton ajouter et stock', () => {
    it('présence des boutons ajouter et champs stock', () => {
      cy.visit('http://localhost:8080/#/login')
      cy.intercept('/login').as('loginRequest')
      cy.get("#username").type('test2@test.fr')
      cy.get("#password").type('testtest')
      cy.get("[data-cy='login-submit']").click() // appel login
      cy.wait('@loginRequest') // attente de login
      cy.get("[data-cy='nav-link-products']").should('be.visible').click()
      cy.get("[data-cy='product-link']").eq(0).should('be.visible').click()
      cy.get("[data-cy='detail-product-add']").should('be.visible')
      cy.get("[data-cy='detail-product-stock']").should('be.visible')
      cy.get("[data-cy='nav-link-products']").should('be.visible').click()
      cy.get("[data-cy='product-link']").eq(1).should('be.visible').click()
      cy.get("[data-cy='detail-product-add']").should('be.visible')
      cy.get("[data-cy='detail-product-stock']").should('be.visible')
      cy.get("[data-cy='nav-link-products']").should('be.visible').click()
      cy.get("[data-cy='product-link']").eq(2).should('be.visible').click()
      cy.get("[data-cy='detail-product-add']").should('be.visible')
      cy.get("[data-cy='detail-product-stock']").should('be.visible')
    })
  })


