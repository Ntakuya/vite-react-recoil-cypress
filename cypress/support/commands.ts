/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    clickLink(label: string): Chainable<Subject>
    lighthouse(url: string): Promise<any>
  }
}

Cypress.Commands.add('clickLink', (label: string | number | RegExp) => {
  cy.get('a').contains(label).click()
})

Cypress.Commands.add("lighthouse", (url: string) => {
  cy.exec(`lighthouse ${url} --chrome-flags="--headless" --output="json" `).then(({ stdout }) => {
    const { categories } = JSON.parse(stdout);
    return Object.keys(categories).reduce((acc, key) => {
      return {
        ...acc,
        [key]: categories[key].score
      }
    }, {});
  });
})
