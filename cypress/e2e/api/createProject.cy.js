import { faker } from '@faker-js/faker';

describe('Create Project', () => {
    beforeEach(()=> {
        cy.api_deleteProjects();
    })

    it('successfully', () => {
        const project = {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.lorem.words(10)
        }

        cy.api_createProject(project)
            .then((res) => {
                expect(res.status).to.eq(201);
                expect(res.body.name).to.eq(project.name);
                expect(res.body.description).to.eq(project.description);
            })
    })
})