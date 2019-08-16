/// <reference types="cypress" />
const todos = require('../../test/data.json').todos

it('responds from REST API', () => {
  cy.request('POST', '/reset', { todos })
  cy.request('/todos')
    .its('body')
    .should('deep.equal', todos)
})

it('resets REST resources', () => {
  cy.request('POST', '/reset', { todos: [] })
  cy.request('/todos')
    .its('body')
    .should('deep.equal', [])
})

it('responds with bundled app', () => {
  cy.visit('/')
  cy.contains('App example').should('be.visible')
})
