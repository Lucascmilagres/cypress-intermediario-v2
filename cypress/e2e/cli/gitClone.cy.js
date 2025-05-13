import { faker } from '@faker-js/faker';

const options = { env: { snapshotOnly: true } }

describe('git clone', options, () => {
    const project = {
        name: `project-${faker.datatype.uuid()}`,
        description: faker.lorem.words(10)
    }

    beforeEach(()=> {
        cy.api_deleteProjects();
        cy.api_createProject(project);
    })

    it('successfully', () => {
        cy.cloneViaSSH(project);

        cy.readFile(`cypress/downloads/${project.name}/README.md`)
        .should('contain', `# ${project.name}`)
        .and('contain', project.description);
    })
})