/// <reference types="cypress" />

describe('Weather App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('renders the app title', () => {
    // Oodake, et pealkiri oleks nähtav enne kontrollimist
    cy.get('h2', { timeout: 10000 }).should('contain.text', 'Weather App').should('be.visible');
  });

  it('shows city search result', () => {
    cy.get('[data-testid="weather-search"]').type('Tartu');
    cy.get('[data-testid="weather-search-btn"]').click();
    
    cy.wait(2000); // Vältimaks liiga kiiret testikäivitust
    
    cy.get('[data-testid="my-weather-list"]', { timeout: 10000 })
      .should('be.visible')
      .within(() => {
        cy.contains('Tartu').should('be.visible');
      });
  });
  

  it('adds search result to the weather list', () => {
    cy.get('[data-testid="search-input"]', { timeout: 10000 }).should('be.visible').type('Tartu');
    cy.get('[data-testid="search-button"]', { timeout: 10000 }).should('be.visible').click();
  
    // Wait until the city list is available
    cy.get('.city-item', { timeout: 10000 }).should('be.visible').first().click();
  
    // Ensure that my-weather-list exists
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="my-weather-list"]').length === 0) {
        throw new Error('Element [data-testid="my-weather-list"] is not created!');
      }
    });
  
    // Check that the weather info is added to the list
    cy.get('[data-testid="weather-info"]', { timeout: 10000 })
      .should('be.visible')
      .within(() => {
        cy.contains('p', 'Tartu').should('be.visible');
        cy.get('.temperature').should('be.visible');
        cy.get('.weather-type').should('be.visible');
      });
  
    // Ensure the city is removed from search results
    cy.get('.city-item').should('not.exist');
  });
  
});
