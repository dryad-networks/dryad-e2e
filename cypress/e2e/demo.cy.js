describe('Sign in', () => {

    beforeEach(() => {
        cy.viewport(1280, 720);

    });

    it('web app log in', () => {
        cy.visit
    })

    it('clicking on log in button in welcome page', () => {
        cy.visit('/');

        cy.get('button')
            .contains('Dryad Account')
            .click();
    });
});