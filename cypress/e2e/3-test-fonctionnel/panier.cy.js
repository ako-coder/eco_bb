let stock; // variable stock globale pour poivoir la réutiliser

describe("panier", () => {
  beforeEach(() => {
    // 1. connexion avant tous les tests
    cy.visit("http://localhost:8080/");
    cy.get("[data-cy='nav-link-login']").click();
    cy.get("#username").type("test2@test.fr");
    cy.get("#password").type("testtest");
    cy.get("[data-cy='login-submit']").click();
    cy.get("[data-cy='nav-link-cart']").should("exist");
  
    //nettoyage du panier avant chaque test
    cy.visit("http://localhost:8080/");
    cy.get("[data-cy='nav-link-cart']").click(); // mail: gaubiac.pascal@gmail.com
    cy.wait(1000);
    cy.get('body').then($body => {
      if ($body.find("[data-cy='cart-line']").length > 0) {
        cy.get("[data-cy='cart-line-delete']").each(($el) => {
          cy.wrap($el).click();
        });
      }
    });
  });

  it("test statut du panier", () => { // --- (new) v1.0.2 ---
    cy.request({
      method: "GET",
      url: "http://localhost:8081/orders",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it("test du panier", () => {
    
    // selection d'un produit
    cy.get("[data-cy='nav-link-products']").click();
    cy.get("[data-cy='product-link']").eq(3).click(); // modifier le chiffre eq(x) ici selon le produit qu'on veut tester
    cy.wait(1000);    

    // vérification si le stock du produit est supérier à 1
    cy.get("[data-cy='detail-product-stock']").should('be.visible').invoke('text').then((stockText) => {
      stock = parseInt(stockText, 10)
      expect(stock).to.be.greaterThan(1)})
    
    // ajout du produit au panier + vérification si le produit est ajouté  
    cy.get("[data-cy='detail-product-add']").should("be.visible").click();
    cy.get("[data-cy='cart-line']").should("be.visible");

    // retour et verification du stock du produit
    cy.get("[data-cy='nav-link-products']").click()
    cy.get("[data-cy='product-link']").eq(3).click()
    cy.wait(1000);

    // stock -1 ?
    cy.get("[data-cy='detail-product-stock']").invoke('text').then((newStockText) => {
      const newStock = parseInt(newStockText, 10)
      expect(newStock).to.equal(stock - 1)
    }); 
  });

  it("test des limites", () => {
    // test de limites
    cy.get("[data-cy='nav-link-products']").click();
    cy.get("[data-cy='product-link']").eq(3).click();
    cy.wait(1000);

    // test d'ajout d'un produit négatif
    cy.get("[data-cy='detail-product-quantity']").clear().type('-1')
    cy.get("[data-cy='detail-product-add']").click()
    cy.get("[data-cy='nav-link-cart']").click()
    cy.get("[data-cy='cart-line']").should('not.exist');

    cy.get("[data-cy='nav-link-products']").click();
    cy.get("[data-cy='product-link']").eq(3).click();
    cy.wait(1000);

    //test avec un chiffre supérieur à 20
    cy.get("[data-cy='detail-product-quantity']").clear().type('50')
    cy.get("[data-cy='detail-product-add']").click()
    cy.get("[data-cy='nav-link-cart']").click()
    cy.wait(4000)
    cy.get("[data-cy='cart-line']").should('not.exist');

    cy.wait(4000);

    //retour
    cy.get("[data-cy='nav-link-products']").click();
    cy.get("[data-cy='product-link']").eq(3).click();
    cy.wait(1000);

    //vérification du stock du produit
    cy.get("[data-cy='detail-product-stock']").invoke('text').then((finalStockText) => {
      const finalStock = parseInt(finalStockText, 10);
      expect(finalStock).to.be.lessThan(0);
    });
  });

  it("ajout de produit et verification panier via l'API", () => {
    // selection d'un produit
    cy.get("[data-cy='nav-link-products']").click();
    cy.get("[data-cy='product-link']").eq(3).click(); // modifier le chiffre eq(x) ici selon le produit qu'on veut tester
    cy.wait(1000);    

    // vérification si le stock du produit est supérier à 1
    cy.get("[data-cy='detail-product-stock']").should('be.visible').invoke('text').then((stockText) => {
      stock = parseInt(stockText, 10)
      expect(stock).to.be.greaterThan(1)})
    
    // ajout du produit au panier + vérification si le produit est ajouté via API 
    cy.get("[data-cy='detail-product-add']").should("be.visible").click();
    
    //appel API pour vérifier le panier
    cy.request({
      method: "POST",
      url: "http://localhost:8081/login",
      body: {
        username: "test2@test.fr",
        password: "testtest",
      },
    }).then((res) => {
      const token = res.body.token;
      cy.request({
        method: "GET",
        url: "http://localhost:8081/orders",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
          console.log(response)
          expect(response.status).to.eq(200);
          expect(response.body.id).to.be.greaterThan(0);
        });
    });
  });  

});

after(() => {
  //nettoyage du panier après le test
  cy.get("[data-cy='nav-link-cart']").click();
  cy.wait(1000);
  cy.get('body').then($body => {
    if ($body.find("[data-cy='cart-line']").length > 0) {
      cy.get("[data-cy='cart-line-delete']").each(($el) => {
        cy.wrap($el).click();
      });
    }
  });
});
