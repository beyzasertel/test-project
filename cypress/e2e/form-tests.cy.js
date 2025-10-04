it("Yanlış email girildiğinde hata mesajı ve submit butonu disabled olmalı", () => {
  cy.visit("http://localhost:5173");

  // Yanlış email gir
  cy.get('[data-cy="email-input"]').type("Beyza");

  // Hata mesajı görünür ve doğru
  cy.get('[data-cy="error-msg"]')
    .should("have.length", 1)
    .and("contain.text", "Lütfen geçerli bir e-posta adresi girin!");

  // Submit butonu disabled olmalı
  cy.get('[data-cy="submit-btn"]').should("have.attr", "disabled");
});
