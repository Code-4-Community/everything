describe('url-client', () => {
  beforeEach(() => cy.visit('/'));

  it('should generate a short url when a URL is entered', () => {
    cy.intercept(
      {
        method: 'POST', // Route all GET requests
        url: 'http://localhost:3333/api/shorten',
      },
      {
        id: 0,
        original: 'https://www.c4cneu.com',
        short: 'http://my.url/s/0',
      }
    ).as('shorten');

    cy.get('#url-input').type('https://www.c4cneu.com');
    cy.get('#submit-btn').click();

    cy.wait('@shorten');

    cy.get('#url-list').should('include.text', '/s/0');
  });
});