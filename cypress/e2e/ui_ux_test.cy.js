describe('Sign in', () => {

    const siteName = "Eberswalde B";
    const siteNameEdited = "Berlin";
    
    beforeEach(() => {
        cy.viewport(1280, 720);
        cy.loginViaUi('ravinda@dryad.net','nawodi89');
        //cy.loginViaApi();
        //cy.setCookie('X-XSRF-TOKEN', '27d34e67480f3c55354ed73e76e79f3167eba064-1693829331099-78e6bd6b8eee517b902574f5')
        cy.getCookie('XSRF-TOKEN').then(s=> {
            console.log(s)
        })
    });

    it("Site title should be displayed on site tile", () => {
        cy.visit('/sites');

        cy.get('app-site').contains('a', siteName, {timeout: 10000}).should('be.visible');
    })

    it("Map of site should be displayed in sites page", () => {
        cy.visit('/sites');

        cy.contains('a', siteName).parentsUntil('app-site')
            .within(() => {
                cy.get('[aria-label=Map]').should('be.visible')
            })
    })
});