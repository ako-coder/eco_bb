// context("GET /orders", () => {
//     it("liste des produits du panier sans connexion", () => {
//       cy.request("GET", 'http://localhost:8081/orders').then((response) => {
//         expect(response.status).to.eq(401)
//       })
//     })
//   })

//   context("GET /orders", () => {
//     it("liste des produits du panier", () => {
//       cy.request("GET", 'http://localhost:8081/orders').then((response) => {
//         expect(response.status).to.eq(200)
//       })
//     })
//   })

  context("GET /products", () => {
    it("liste des produits", () => {
      cy.request("GET", 'http://localhost:8081/products').then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).length.to.be.greaterThan(7)
      })
    })
  })

  context("GET /products", () => {
    it("produit avec id 3", () => {
      cy.request("GET", 'http://localhost:8081/products/3').then((response) => {
        expect(response.status).to.eq(200)
        // expect(response.body).length.to.be.greaterThan(3)
      })
    })
  })

  context("GET /products", () => {
    it("produit avec id 4", () => {
      cy.request("GET", 'http://localhost:8081/products/4').then((response) => {
        expect(response.status).to.eq(200)
        // expect(response.body).length.to.be.greaterThan(3)
      })
    })
  })