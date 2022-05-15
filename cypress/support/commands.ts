/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable<Subject> {
    clickLink(label: string): void
  }
}

Cypress.Commands.add('clickLink', (label: string | number | RegExp) => {
  cy.get('a').contains(label).click()
})
