it('search for city', () => {
    cy.contains('Weather Application');
    cy.get('[data-testid="search-input"]').type('Melbourne');
    cy.contains('search').click()
    cy.get('[data-testid="search-results"]  .search-result')
        .should('have.length', 5)
})
