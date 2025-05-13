import { faker } from '@faker-js/faker';

const options = { env: { snapshotOnly: true } }

describe('Create issue for new project', options, () => {
    beforeEach(() => {
        cy.login();
        cy.api_deleteProjects();
      })  

    it('successfully', () => {
        const issue = {
            title: `issue-${faker.datatype.uuid()}`,
            description: faker.lorem.words(10),
            project: {
                name: `project-${faker.datatype.uuid()}`,
                description: faker.lorem.words(10)     
            }
        } 

        cy.api_createProject(issue.project);
        cy.gui_createIssue(issue);

        cy.get('.issue-details').should('contain', issue.title).and('contain', issue.description);
    })
  })

describe('Create issue for existing project', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('');
        cy.api_deleteProjects();
      })

      it('successfully', () => {
        cy.ensureAtLeastOneProject().then((project) => {
            const issue = {
                project: {
                  name: project.name,
                  description: project.description
                },
              title: `issue-${faker.datatype.uuid()}`,
              description: faker.lorem.words(10),
            };

            cy.gui_createIssue(issue);

            cy.contains(issue.title).should('be.visible');
            cy.contains(issue.description).should('be.visible');
        })
    })
})