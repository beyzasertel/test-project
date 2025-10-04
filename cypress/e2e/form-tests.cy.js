describe("Login Form Validation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("Yanlış email girildiğinde hata mesajı ve submit butonu disabled olmalı", () => {
    // Yanlış email gir
    cy.get('[data-cy="email-input"]').type("Beyza");

    // Email hatası görünür ve doğru
    cy.get('[data-cy="email-error"]').should(
      "contain.text",
      "Lütfen geçerli bir e-posta adresi girin!"
    );

    // Submit butonu disabled olmalı
    cy.get('[data-cy="submit-btn"]').should("have.attr", "disabled");
  });

  it("Yanlış email ve zayıf şifre girildiğinde hata mesajları ve submit butonu disabled olmalı", () => {
    // Yanlış email gir
    cy.get('[data-cy="email-input"]').type("Beyza");

    // Zayıf şifre gir
    cy.get('[data-cy="password-input"]').type("deneme123");

    // Email hatası
    cy.get('[data-cy="email-error"]').should(
      "contain.text",
      "Lütfen geçerli bir e-posta adresi girin!"
    );

    // Password hatası
    cy.get('[data-cy="password-error"]').should(
      "contain.text",
      "Şifre en az 8 karakter, büyük harf, küçük harf, rakam ve özel karakter içermelidir."
    );

    // Submit butonu disabled olmalı
    cy.get('[data-cy="submit-btn"]').should("have.attr", "disabled");
  });
});
