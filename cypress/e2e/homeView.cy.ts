describe('Home View', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('display correct header', () => {
    cy.contains('h1', 'List movies')
  })

  it('displays a list of movies', () => {
    cy.get('li').should('have.length.gt', 0)
  })

  it('allows searching for movies', () => {
    const searchTerm = 'Waterworld'
    cy.get('input[type="search"]').type(searchTerm)
    cy.get('[data-cy="movie-item"]').should('have.length', 10)
    cy.contains('Waterworld')
  })

  it('allows toggling movie favorites', () => {
    cy.get('li').first().as('firstMovie')
    cy.get('@firstMovie').within(() => {
      cy.get('button[aria-label="toggle"]').click()
      cy.get('svg').should('have.attr', 'fill', 'yellow')

      cy.get('button').click()
      cy.get('svg').should('have.attr', 'fill', 'none')
    })
  })

  it('navigates to the next page of movies', () => {
    cy.get('button[aria-label="Next"]').click()
    cy.get('button[aria-label="Prev"]').should('not.be.disabled')
  })

  it('navigates to the previous page of movies', () => {
    cy.get('button[aria-label="Next"]').click()
    cy.get('button[aria-label="Prev"]').click()
    cy.get('button[aria-label="Prev"]').should('be.disabled')
  })
})
