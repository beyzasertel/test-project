it("Email yanlış girdim", () => {
  cy.visit("http://localhost:5173");
  cy.get('[data-cy="email-input"]').type("Beyza");
  cy.get('[data-cy="password-input"]').type("deneme123");
  cy.get('[data-cy="terms-checkbox"]').check();
  cy.get('[data-cy="submit-btn"]').click();
  cy.on("window:alert", (text) => {
    expect(text).to.contains("Lütfen geçerli bir e-posta adresi girin!");
  });
});
