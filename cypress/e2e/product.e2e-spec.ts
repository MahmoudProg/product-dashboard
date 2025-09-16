describe('Product List Page', () => {
  beforeEach(() => {
    // Replace with your actual route
    cy.visit('/products');
  });

  it('should display filters, categories, and products grid', () => {
    // Filters section
    cy.get('.filters').should('exist');
    cy.get('.filters input[formControlName="searchTerm"]').should('exist');
    cy.get('.filters select[formControlName="sortBy"]').should('exist');
    cy.get('.filters select[formControlName="sortOrder"]').should('exist');
    cy.contains('APPLY_FILTER').should('exist');

    // Categories
    cy.get('.categories').should('exist');
    cy.get('.categories button').should('have.length.greaterThan', 0);

    // Product cards
    cy.get('.grid .card').should('exist');
  });

  it('should search for a product', () => {
    cy.get('.filters input[formControlName="searchTerm"]')
      .type('shirt')
      .should('have.value', 'shirt');

    cy.get('.grid .card').each(($el) => {
      cy.wrap($el).contains(/shirt/i);
    });
  });

  it('should sort products by price ascending', () => {
    cy.get('.filters select[formControlName="sortBy"]').select('price');
    cy.get('.filters select[formControlName="sortOrder"]').select('asc');

    cy.get('.grid .card .price').then(($els) => {
      // حوّل NodeListOf<Element> لأرقام
      const prices = Array.from($els).map(el => {
        const text = (el as HTMLElement).textContent?.replace(/[^0-9.]/g, '') || '0';
        return parseFloat(text);
      });

      // تحقق إن الأسعار متصاعدة باستخدام cy.wrap لكل رقم
      for (let i = 1; i < prices.length; i++) {
        cy.wrap({ current: prices[i], previous: prices[i - 1] })
          .its('current')
          .should('be.gte', prices[i - 1]);
      }
    });
  });



  it('should paginate products', () => {
    cy.get('.pagination button').contains('NEXT').click();
    cy.get('.grid .card').should('exist');

    cy.get('.pagination button').contains('PREVIOUS').click();
    cy.get('.grid .card').should('exist');
  });

  it('should add and remove product from cart', () => {
    cy.get('.grid .card .Add-to-cart').first().click();
    cy.get('.grid .card .Remove-from-cart').should('exist');

    cy.get('.grid .card .Remove-from-cart').first().click();
    cy.get('.grid .card .Add-to-cart').should('exist');
  });
});
