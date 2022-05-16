describe("", () => {
    beforeEach(() => {
        cy.visit("/")
    })

    it("/", () => {
        cy.location().url().should("include", "/")
        cy.lighthouse("http://localhost:3000").then(res => {
            cy.wrap(res).its("accessibility").should("gt", 0.9)
            cy.wrap(res).its("best-practices").should("gt", 0.9)
            cy.wrap(res).its("performance").should("gt", 0.9)
            cy.wrap(res).its("pwa").should("gt", 0.9)
            cy.wrap(res).its("seo").should("gt",0.9)
        });
    })
})
