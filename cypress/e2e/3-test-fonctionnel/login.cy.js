describe('login', () => {
  it('login réussi', () => {
    cy.visit('http://localhost:8080/')
    cy.get("[data-cy='nav-link-login']").click()
    cy.get("#username").type('test2@test.fr')
    cy.get("#password").type('testtest')
    cy.get("[data-cy='login-submit']").click()
    cy.get("[data-cy='nav-link-cart']").should('exist')
  })
})