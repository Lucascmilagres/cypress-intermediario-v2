import { faker } from '@faker-js/faker';

describe('Create Issue', () => {
    beforeEach(() => {
        cy.api_deleteProjects();
    })

    it('successfully', () => { 
        const issue = {
            project: {
                name: `project-${faker.datatype.uuid()}`,
                description: faker.lorem.words(10)
            },
            title: `Issue-${faker.datatype.uuid()}`,
            description: faker.lorem.words(10)
        }

        cy.api_createIssue(issue).then((res) => {
            expect(res.status).to.eq(201);
            expect(res.body.title).to.eq(issue.title);
            expect(res.body.description).to.eq(issue.description);
        })
    })
})