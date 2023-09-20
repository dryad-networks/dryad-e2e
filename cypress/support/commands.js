// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginViaUi', (email, password) => {
    cy.session('login session', () => {
        cy.visit('/login');

        cy.get('button')
            .contains('Login')
            .click();

        cy.get('input[name=username]')
            .clear()
            .type(email);

        cy.get('input[name=password]')
            .clear()
            .type(password);

        cy.get('input[type=submit]')
            .click();

        //cy.wait(500);

        cy.location('pathname')
            .should('eq', '/sites');

        },
        {
        validate() {
            cy.document()
                .its('cookie')
                .should('contain', 'XSRF-TOKEN')
        }
    })
    //},
// {
//          cacheAcrossSpecs: false
//         }
});

Cypress.Commands.add('loginViaApi', () => {

    cy.session('login session', () => {
            cy.request({
                method: "GET",
                url: Cypress.env("api_base_url") + "sites",
                headers: {
                    Authorization: "Bearer " + Cypress.env("api_key"),
                    "Content-Type": "application/json"
                },
            }).then((data) => {
                const cookies = data.headers["set-cookie"]
                console.log(cookies)
                for (let i = 0; i < cookies?.length; i++) {
                    const firstPart = cookies[i].split(";")[0]
                    const separator = firstPart.indexOf("=")
                    const name = firstPart.substring(0, separator)
                    const value = firstPart.substring(separator + 1)
                    cy.setCookie(name, value)
                    console.log("Token****************: "+name+value)
                    //window.localStorage.setItem('X-Xsrf-Token', '27d34e67480f3c55354ed73e76e79f3167eba064-1693829331099-78e6bd6b8eee517b902574f5')
                }
            })
    })
})
