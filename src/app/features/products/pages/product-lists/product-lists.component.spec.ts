/// <reference types="cypress" />

describe('Product Lists Page', () => {
  beforeEach(() => {
    cy.visit('/products');
  });

  it('should display products list', () => {
    cy.get('.grid .card').should('have.length.greaterThan', 0);
  });

  it('should apply price range filter', () => {
    cy.get('input[formControlName="searchTerm"]').type('Product');
    cy.get('button').contains('APPLY_FILTER').click();


    cy.get('.grid .card').each(($el) => {
      cy.wrap($el).find('.price').invoke('text').then(parseFloat).should('be.within', '50', 500);
    });
  });

  it('should add and remove product from cart', () => {
    cy.get('.Add-to-cart').first().click();
    cy.get('.Remove-from-cart').should('exist').click();
    cy.get('.Add-to-cart').should('exist');
  });

  it('should filter products by category', () => {
    cy.get('.categories button').contains('Category 1').click();
    cy.get('.grid .card .category').each(($el) => {
      cy.wrap($el).should('contain.text', 'Category 1');
    });
  });

  it('should sort products', () => {
    cy.get('select[formControlName="sortBy"]').select('price');
    cy.get('select[formControlName="sortOrder"]').select('asc');

    let lastPrice = 0;
    cy.get('.grid .card .price').each(($el) => {
      cy.wrap($el).invoke('text').then((text) => {
        const price = (text);
        cy.wrap(price).should('be.gte', lastPrice);
        lastPrice = price;
      });
    });
  });


  it('should navigate pagination', () => {
    cy.get('.pagination button').contains('NEXT').click();
    cy.get('.pagination span').should('contain.text', '2');
  });
});
