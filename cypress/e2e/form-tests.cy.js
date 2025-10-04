describe("Login Form Validation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("Email alanı boş bırakıldığında hata mesajı ve submit butonu disabled olmalı", () => {
    // Email alanı boş email gir
    cy.get('[data-cy="email-input"]').clear().blur();

    // Email hatası görünür ve doğru
    cy.get('[data-cy="email-error"]').should(
      "contain.text",
      "Email alanı boş olamaz!"
    );

    // Submit butonu disabled olmalı
    cy.get('[data-cy="submit-btn"]').should("be.disabled");
  });

  it("Şifre alanı boş bırakıldığında hata mesajı ve submit butonu disabled olmalı", () => {
    // Email alanı boş email gir
    cy.get('[data-cy="password-input"]').clear().blur();

    // Email hatası görünür ve doğru
    cy.get('[data-cy="password-error"]').should(
      "contain.text",
      "Lütfen şifrenizi girin."
    );

    // Submit butonu disabled olmalı
    cy.get('[data-cy="submit-btn"]').should("be.disabled");
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

  it("Tüm koşullar sağlandığında submit butonu tıklanabiliyor", () => {
    // Geçerli email gir
    cy.get('[data-cy="email-input"]').type("email@email.com");

    // Geçerli şifre gir
    cy.get('[data-cy="password-input"]').type("P@ssword123");

    // Checkbox seç ve seçimi kaldır
    cy.get('[data-cy="terms-checkbox"]').check();
    cy.get('[data-cy="terms-checkbox"]').uncheck();

    // Checkbox hatası
    cy.get('[data-cy="terms-error"]').should(
      "contain.text",
      "Kullanım koşullarını kabul etmelisiniz."
    );

    // Submit butonu disabled olmalı
    cy.get('[data-cy="submit-btn"]').should("have.attr", "disabled");
  });

  it("Email ve şifre girildiğinde checkbox seçilmezse ve submit butonu disabled olmalı", () => {
    // Geçerli email gir
    cy.get('[data-cy="email-input"]').type("email@email.com");

    // Geçerli şifre gir
    cy.get('[data-cy="password-input"]').type("P@ssword123");

    // Checkbox seç ve seçimi kaldır
    cy.get('[data-cy="terms-checkbox"]').check();

    // Submit butonu disabled olmalı
    cy.get('[data-cy="submit-btn"]').click();
  });
});
