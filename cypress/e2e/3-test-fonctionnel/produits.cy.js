describe('produits', () => {
    it('présence des produits', () => {
      cy.visit('http://localhost:8080/')
      cy.get("[data-cy='nav-link-products']").click()
      cy.get("[data-cy='product-picture']").should('exist')
      cy.get("[data-cy='product-name']").should('exist')
      cy.get("[data-cy='product-ingredients']").should('exist')
      cy.get("[data-cy='product-price']").should('exist')
      cy.get("[data-cy='product-link']").should('have.length', 8) // quantité: 8

      // boucle
      for(let i=0; i<8; i++){
        cy.get("[data-cy='nav-link-products']").click()
        cy.get("[data-cy='product-link']").eq(i).click()
        cy.get("[data-cy='detail-product-img']").should('exist')
        cy.get("[data-cy='detail-product-name']").should('exist')
        cy.get("[data-cy='detail-product-description']").should('exist')
        cy.get("[data-cy='detail-product-skin']").should('exist')
        cy.get("[data-cy='detail-product-aromas']").should('exist')
        cy.get("[data-cy='detail-product-ingredients']").should('exist')      
        cy.get("[data-cy='detail-product-stock']").should('exist')
        if(cy.get("[data-cy='detail-product-stock']").invoke('text').then((text) => parseInt(text.split(" ")[0])) <= 0) {
          cy.get("[data-cy='detail-product-add']").should('not.exist')
        }
        cy.get("[data-cy='nav-link-products']").click()
      }      
    })
  })