import { faker } from '@faker-js/faker';

const accessToken = `Bearer ${Cypress.env('gitlab_access_token')}`

Cypress.Commands.add('api_createProject', project => {
    cy.request({
        method: 'POST',
        url: '/api/v4/projects',
        body: {
            name: project.name,
            description: project.description,
            initialize_with_readme: true
        },
        headers: {
            Authorization: accessToken
        }
  })
});

Cypress.Commands.add('api_getAllProjects', () => {
    cy.request({
        method:'GET',
        url:'/api/v4/projects/',
        headers: {
            Authorization: accessToken
        }
    })
});

Cypress.Commands.add('api_deleteProjects', () => {
    cy.api_getAllProjects().then((res) => {
        res.body.forEach((project) => {
            cy.request({
                method: 'DELETE',
                url: `/api/v4/projects/${project.id}`,
                headers: {
                    Authorization: accessToken
                }
            })
        })
    })
});

Cypress.Commands.add('ensureAtLeastOneProject', () => {
    cy.api_getAllProjects().then((res) => {
        const projects = res.body;

        if(projects.length === 0) { 
            const newProject = {
                name: `project-${faker.datatype.uuid()}`,
                description: faker.lorem.words(10)
            }

            return cy.api_createProject(newProject).then((res) => res.body);
        }

        const randomIndex = Math.floor(Math.random() * projects.length);
        return projects[randomIndex];
    })
})

Cypress.Commands.add('api_createIssue', (issue) => {
    cy.ensureAtLeastOneProject().then((res) => {
        cy.request({
            method: 'POST',
            url: `/api/v4/projects/${res.id}/issues`,
            body: {
                title: issue.title,
                description: issue.description
            },
            headers: {
                Authorization: accessToken
            }
        })
    })
})

Cypress.Commands.add('api_setLabelOnIssue', (projectId, label) => {
    cy.request({
        method: 'POST',
        url: `/api/v4/projects/${projectId}/labels`,
        body: {
            name: label.name,
            color: label.color,
        },
        headers: {
            Authorization: accessToken
        }
    })
})

Cypress.Commands.add('api_setMilestoneOnIssue', (projectId, milestone) => {
    cy.request({
        method: 'POST',
        url: `/api/v4/projects/${projectId}/milestones`,
        body: {
            title: milestone.title,
        },
        headers: {
            Authorization: accessToken
        }
    })
})
