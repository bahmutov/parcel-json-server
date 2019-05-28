/// <reference types="cypress" />
const todos = require('../../test/data.json').todos

it('responds from REST API', () => {
  cy.request('/todos')
    .its('body')
    .should('deep.equal', todos)
})

it('responds with bundled app', () => {
  cy.visit('/')
  cy.contains('App example').should('be.visible')
})
