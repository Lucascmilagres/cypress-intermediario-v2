describe('Login', () => {
  it('sucessfully', () => {
    const user = Cypress.env('user_name')
    const password = Cypress.env('user_password')
    
    cy.login(user, password, { cacheSession: false })
    cy.get('.qa-user-avatar').should('be.visible')
  })
})