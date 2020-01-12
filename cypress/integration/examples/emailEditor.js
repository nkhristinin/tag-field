/// <reference types="Cypress" />

context("Email editor", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/");
  });

  it("Should work correctly", () => {
    const wrongEmail = "asd";
    const email1 = "email1@mail.com";
    const email2 = "email2@mail.com";
    const tagBlockClass = ".tag-field__tag-block";

    cy.get("#email .tag-field").as("emailEditor");

    cy.get("@emailEditor")
      // type wrong and correct email
      .type(wrongEmail)
      .type("{enter}")
      .type(email1)
      .type("{enter}")
      .type(email2)
      .type("{enter}")
      .get(tagBlockClass)
      .should("have.length", 3)
      .get(`${tagBlockClass}--invalid`)
      .should("have.length", 1)
      .contains(wrongEmail)
      .get(`${tagBlockClass}--valid`)
      .should("have.length", 2)
      .contains(email1);

    cy.get("@emailEditor")
      // check remove by backspace
      .type("{backspace}")
      .get(tagBlockClass)
      .should("have.length", 2)
      .contains(email2)
      .should("not.exist");

    // type the same tag
    cy.get("@emailEditor")
      .type(email1)
      .type("{enter}")
      .get(tagBlockClass)
      .should("have.length", 2);

    // type with separation
    cy.get("@emailEditor")
      .type("a,b")
      .type("{enter}")
      .get(tagBlockClass)
      .should("have.length", 4);

    // type close icon
    cy.get(`${tagBlockClass}-close`)
      .first()
      .click()
      .get(tagBlockClass)
      .should("have.length", 3)
      .contains(wrongEmail)
      .should("not.exist");
  });
});
