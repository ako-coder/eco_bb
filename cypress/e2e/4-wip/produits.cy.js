import { faker } from "@faker-js/faker";

describe("produits", () => {
  it("présence des produits", () => {

    // const product = {
    //   id: faker.number.int({ min: 1, max: 100 }),
    //   name: faker.commerce.productName(),
    //   availableStock: faker.number.int({ min: 1, max: 100 }),
    //   skin: faker.commerce.productMaterial(),
    //   aromas: faker.commerce.productAdjective(),
    //   ingredients:
    //     faker.commerce.productMaterial() +
    //     ", " +
    //     faker.commerce.productMaterial() +
    //     " et " +
    //     faker.commerce.productMaterial(),
    //   description: faker.commerce.productDescription(),
    //   price: faker.commerce.price(),
    //   picture: faker.image.url(),
    //   varieties: faker.number.int({ min: 1, max: 10 }),
    // };

    cy.visit("http://localhost:8080/");
    cy.get("[data-cy='nav-link-products']").click();
    cy.get("[data-cy='product-picture']").should("exist");
    cy.get("[data-cy='product-name']").should("exist");
    cy.get("[data-cy='product-ingredients']").should("exist");
    cy.get("[data-cy='product-price']").should("exist");
    cy.get("[data-cy='product-link']").should("have.length", 8); // quantité: 8

    // boucle
    for (let i = 0; i < 8; i++) {
      cy.get("[data-cy='nav-link-products']").click();
      cy.get("[data-cy='product-link']").eq(i).click();
      cy.get("[data-cy='detail-product-img']").should("exist");
      cy.get("[data-cy='detail-product-name']").should("exist");
      cy.get("[data-cy='detail-product-description']").should("exist");
      cy.get("[data-cy='detail-product-skin']").should("exist");
      cy.get("[data-cy='detail-product-aromas']").should("exist");
      cy.get("[data-cy='detail-product-ingredients']").should("exist");
      cy.get("[data-cy='detail-product-stock']").should("exist");
      

      if (cy.get("[data-cy='detail-product-stock']").contains(0)||cy.get("[data-cy='detail-product-stock']").contains("-")) {
        cy.get("[data-cy='detail-product-add']").should("not.exist");
      } else {
        cy.get("[data-cy='detail-product-add']").should("exist");
      }
      cy.get("[data-cy='nav-link-products']").click();
    }
  });
});
