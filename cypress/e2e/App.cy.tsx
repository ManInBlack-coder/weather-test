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
    cy.get('[data-testid="search-button"]').click();
    
    cy.wait(2000); // Vältimaks liiga kiiret testikäivitust
    
    cy.get('[data-testid="my-weather-list"]', { timeout: 10000 })
      .should('be.visible')
      .within(() => {
        cy.contains('Tartu').should('be.visible');
      });
  });
  

  it('adds search result to the weather list and checks the weather data', () => {
    // Step 1: Search for a city and click the search button
    cy.get('[data-testid="weather-search"]', { timeout: 10000 })
      .should('be.visible')  // Ensure the search input is visible
      .type('Tartu');  // Type the city name
  
    cy.get('[data-testid="search-button"]', { timeout: 10000 })
      .should('be.visible')  // Ensure the search button is visible
      .click();  // Click the search button
    
    // Step 2: Verify the search results appear and the city name is present
    cy.get('[data-testid="my-weather-list"]', { timeout: 10000 })
      .should('be.visible')  // Ensure the list is visible
      .within(() => {
        // Check if the city name 'Tartu' is present in the list
        cy.contains('li', 'Tartu')
          .should('be.visible')  // Ensure 'Tartu' is visible in the list
          .first()  // Select the first <li> item
          .click();  // Click on it to select the city
      });
  
    // Step 3: Wait for the weather information to appear after selecting the city
    cy.get('.weather-info', { timeout: 10000 })
      .should('be.visible');  // Ensure the weather info is visible
  
    // Step 4: Check that the correct weather data is displayed
    cy.get('[data-testid="temperature"]', { timeout: 10000 })
      .should('be.visible')
      .and('not.have.text', 'Loading...')  // Ensure temperature is loaded
      .and('not.be.empty');  // Ensure there's actual temperature data
  
    cy.get('[data-testid="weather-type"]', { timeout: 10000 })
      .should('be.visible')
      .and('not.have.text', 'No data')  // Ensure weather type is not 'No data'
      .and('not.be.empty');  // Ensure weather type is not empty
  
    // Step 5: Ensure that the city is removed from the search results after it's added to the weather list
    cy.get('[data-testid="my-weather-list"]', { timeout: 10000 })
      .should('not.exist');  // Ensure the city item no longer exists in the search results
  });
  
  
  
  
});