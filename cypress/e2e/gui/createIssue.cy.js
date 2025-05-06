import { faker } from '@faker-js/faker';


describe('Create issue for new project', () => {
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
      })
    
    it('successfully', () => {
        cy.api_getAllProjects().then((res) => {
            const projects = res.body;
            const randomIndex = Math.floor(Math.random() * projects.length);
            const randomProject = projects[randomIndex];
            cy.wrap(randomProject).as('randomProject');
        })

        cy.get('@randomProject').then((project) => {
            const issue = {
                project: {
                    name: project.name,
                    description: project.description
                },
                title: `issue-${faker.datatype.uuid()}`,
                description: faker.lorem.words(10),
            }  
            cy.gui_createIssue(issue);
            cy.contains(issue.description).should('be.visible');
            cy.contains(issue.title).should('be.visible');
        })
    })
})