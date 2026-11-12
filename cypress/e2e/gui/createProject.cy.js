import { faker } from '@faker-js/faker'

describe('Create Project', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/projects/new')
  })

  it('successfully', () => {
    const project = {
      name: `project-${faker.datatype.uuid()}`,
      description: faker.lorem.paragraph(),
    }
    cy.guiCreateProject(project)

    cy.url().should('be.equal', `${Cypress.config().baseUrl}/${Cypress.env('user_name')}/${project.name}`)
    cy.contains(project.name).should('be.visible')
    cy.contains(project.description).should('be.visible')
    cy.get('.flash-notice').should('contain.text', `Project '${project.name}' was successfully created.`)
  })
})