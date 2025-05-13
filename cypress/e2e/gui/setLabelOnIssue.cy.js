import { faker } from '@faker-js/faker';

const options = { env: { snapshotOnly: true } }

describe('Set label on issue', options, () => {
    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.lorem.words(10),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.lorem.words(10)     
        }
    }
    const label = {
        name: `label-${faker.lorem.word()}`,
        color: faker.color.rgb()
    }

    beforeEach(() => {
        cy.api_deleteProjects();
        cy.login();
        cy.api_createIssue(issue).then((res) => {
            cy.api_setLabelOnIssue(res.body.project_id, label);
            cy.visit(`${res.body.web_url}`)
        })
      })  

    it('successfully', () => {
        cy.gui_setLabelOnIssue(label);
        
        cy.get('.qa-labels-block').should('contain', label.name)
        cy.contains(label.name);
    })
})