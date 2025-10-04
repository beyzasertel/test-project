it("Email yanlış girdim", () => {
  cy.get('input[type="email"]').type("Beyza");
  cy.get('button[type="submit"]').click();
  cy.on("window:alert", (text) => {
    expect(text).to.contains("Lütfen geçerli bir e-posta adresi girin!");
  });
});
