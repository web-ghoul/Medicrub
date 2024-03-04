/* eslint-disable no-undef */
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


Cypress.Commands.add('getByDataTest', (dataTest) => cy.get(`[data-test='${dataTest}']`))

Cypress.Commands.add('loginTyping', (username, password, button) => {
  if(username.value){
    cy.getByDataTest(username.dataTest).type(username.value)
  }
  if(password.value){
    cy.getByDataTest(password.dataTest).type(password.value)
  }
  cy.getByDataTest(button).click()
})

Cypress.Commands.add('clearInput', (dataTest) => {
  cy.getByDataTest(dataTest).clear()
})

