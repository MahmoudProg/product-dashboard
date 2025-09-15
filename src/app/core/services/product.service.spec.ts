/// <reference types="cypress" />

describe('ProductService E2E', () => {
  const BASE_URL = 'https://fakestoreapi.com/products';

  it('should fetch all products', () => {
    cy.request(`${BASE_URL}`).then((response) => {
      cy.wrap(response.status).should('eq', 200);
      cy.wrap(response.body).should('have.length.gte', 1);
      cy.wrap(response.body[0]).should('have.property', 'title');
      cy.wrap(response.body[0]).should('have.property', 'price');
    });
  });

  it('should fetch product by ID and cache it', () => {
    const productId = 1;

    // First request
    cy.request(`${BASE_URL}/${productId}`).then((response) => {
      cy.wrap(response.status).should('eq', 200);
      cy.wrap(response.body).should('have.property', 'id', productId);
      cy.wrap(response.body).should('have.property', 'title');
    });

    cy.request(`${BASE_URL}/${productId}`).then((response) => {
      cy.wrap(response.status).should('eq', 200);
      cy.wrap(response.body).should('have.property', 'id', productId);
    });
  });

  it('should fetch all categories', () => {
    cy.request(`${BASE_URL}/categories`).then((response) => {
      cy.wrap(response.status).should('eq', 200);
      cy.wrap(response.body).should('be.an', 'array');
      cy.wrap(response.body.length).should('be.gte', 1);
    });
  });

  it('should fetch products by category', () => {
    const category = 'electronics'; 
    cy.request(`${BASE_URL}/category/${category}`).then((response) => {
      cy.wrap(response.status).should('eq', 200);
      cy.wrap(response.body).should('be.an', 'array');
      cy.wrap(response.body[0]).should('have.property', 'category', category);
    });
  });
});
