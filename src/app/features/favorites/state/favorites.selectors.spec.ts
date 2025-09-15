/// <reference types="cypress" />

describe('Favorites Page', () => {
  beforeEach(() => {
    // نزور صفحة المنتجات
    cy.visit('/products');
  });

  it('should add products to favorites and check count', () => {
    // نفترض في UI فيه زر يضيف المنتج للمفضلة
    cy.get('.Add-to-favorites').first().click();

    // نتأكد أن عدد المنتجات في favorites زاد
    cy.get('.favorites-count').should('contain.text', '1');

    cy.get('.Add-to-favorites').eq(1).click();
    cy.get('.favorites-count').should('contain.text', '2');

    // نتأكد من اسم أول منتج موجود في favorites
    cy.get('.favorites-list .product-title').first().should('contain.text', 'Product 1');
  });

  it('should show empty favorites if none added', () => {
    cy.get('.favorites-list').should('not.exist');
    cy.get('.favorites-count').should('contain.text', '0');
  });
});
