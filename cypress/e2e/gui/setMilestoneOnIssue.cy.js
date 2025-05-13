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
    const milestone = {
        title: `milestone-${faker.lorem.word()}`,
    }

    beforeEach(() => {
        cy.api_deleteProjects();
        cy.login();
        cy.api_createIssue(issue).then((res) => {
            cy.api_setMilestoneOnIssue(res.body.project_id, milestone);
            cy.visit(`${res.body.web_url}`)
        })
    })
    
    it('successfully', () => {
        cy.gui_setMilestoneOnIssue(milestone);

        cy.get('.milestone').should('contain', milestone.title)
    })
})
