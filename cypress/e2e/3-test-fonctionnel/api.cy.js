context("GET /orders", () => {
  it("liste des produits du panier sans connexion: refusée", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:8081/orders",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});

describe("POST /login", () => {
  it("login réussi", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8081/login",
      body: {
        username: "test2@test.fr",
        password: "testtest",
      },
    });
  });
});

describe("GET /orders", () => {
  it("liste des produits du panier étant connecté", () => {
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
          expect(response.status).to.eq(200);
        });
    });
  });
});

context("GET /products", () => {
  it("liste de 8 produits", () => {
    cy.request("GET", "http://localhost:8081/products").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).length.to.be.greaterThan(7);
    });
  });
});

context("GET /products", () => {
  it("produit avec id 3", () => {
    cy.request("GET", "http://localhost:8081/products/3").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(3);
    });
  });
});

context("GET /products", () => {
  it("produit avec id 4", () => {
    cy.request("GET", "http://localhost:8081/products/4").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(4);
    });
  });
});

describe("PUT /orders/add", () => {
  it("ajouter un produit disponible au panier", () => {
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
        method: "PUT",
        url: "http://localhost:8081/orders/add",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          "product": 5,
          "quantity": 1
        }
      }).then((response) => {
          expect(response.status).to.eq(200);
        });
    });
  });
});

describe("PUT /orders/add", () => {
  it("ajouter un produit en rupture de stock", () => {
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
        method: "PUT",
        url: "http://localhost:8081/orders/add",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          "product": 3,
          "quantity": 1
        }
      }).then((response) => {
          expect(response.status).to.eq(403);
        });
    });
  });
});

describe("POST /reviews", () => {
  it("ajouter un avis", () => {
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
        method: "POST",
        url: "http://localhost:8081/reviews",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          "title": "title test",
          "comment": "comment test",
          "rating": 5
        }
      }).then((response) => {
          expect(response.status).to.eq(200);
        });
    });
  });
});