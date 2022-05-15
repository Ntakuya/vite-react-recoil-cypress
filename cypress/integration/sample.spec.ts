describe("", () => {
    it("/", () => {
        cy.visit("")
        cy.location().url().should("include", "/")
    })
})