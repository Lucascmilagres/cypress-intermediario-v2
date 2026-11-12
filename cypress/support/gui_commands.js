Cypress.Commands.add('login', (
    user = Cypress.env('user_name'), 
    password = Cypress.env('user_password'),
    cacheSession = true
    ) => {
        const login = () => {
            cy.visit('/users/sign_in')
            cy.get('[data-qa-selector="login_field"]').type(user)
            cy.get('[data-qa-selector="password_field"]').type(password, { log: false })
            cy.get('[data-qa-selector="sign_in_button"]').click()
        }

        const validate = () => {
            cy.visit('')
            cy.url().should('not.contains', '/users/sign_in')
        }
        
        const options = {
            cacheAcrossSpecs: true,
            validate
        }

        if(cacheSession) {
            cy.session(user, login, options)
        }
        else{
            login()
        }
        cy.visit('')
})

Cypress.Commands.add('logout', () => {
    cy.get('.qa-user-avatar').click()
    cy.get('[data-qa-selector="sign_out_link"]').click()
})

Cypress.Commands.add('guiCreateProject', (project) => {
    cy.get('#project_name').type(project.name)
    cy.get('#project_description').type(project.description, { delay: 0 })
    cy.get('#project_initialize_with_readme').check()
    cy.contains('Create project').click()
})