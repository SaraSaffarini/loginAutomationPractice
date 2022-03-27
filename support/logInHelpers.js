// These are the helpers for the login page

export const LOCATORS = {
    createAccountHeader: '#create-account_form > .page-subheading',
    createAccountHeaderValue: 'Create an account',
    createAccountError: '#create_account_error',
    createAccountEmail: '#email_create',
    createAccountBtn: '#SubmitCreate > span',
    logInHeader: '#login_form > .page-subheading',
    logInHeaderValue: 'Already registered?',
    logInEmail: '#email',
    logInPassword: '#passwd',
    logInBtn: '#SubmitLogin > span',
    logInError: '#center_column > :nth-child(2)',
}


/**
 * Making sure actions are taking place in the right area
 * @param {String} locator
 * @param {String} value 
 *  */
export const verifyArea = ((locator, value) => {
    cy.get(locator).contains(value)
})

/**
 * Verifying that  error messages appear 
 * @param {String} locator
 * @param {String} values
 *  */
export const verifyErrorMsg = ((locator, values) => {
    cy.get(locator)
    cy.get('ol > li').contains(values)
})

/**
 * Insert text
 * @param {String} locator
 * @param {String} value 
 *  */
export const insertText = ((locator, value) => {
    cy.get(locator).type(value)
})

/**Login by email and password
 * @param {string} email 
 * @param {string} pwd 
 * @param {boolean} loginSuccess 
 * if flag was true then the user should be directed to the next page, however if false the user should get an error message
 */
export const loginByEmail = ((email, pwd, loginSuccess) => {
    verifyArea(LOCATORS.logInHeader, LOCATORS.logInHeaderValue)
    insertText(LOCATORS.logInEmail, email)
    insertText(LOCATORS.logInPassword, pwd)
    cy.get('#SubmitLogin > span').click()
    if (loginSuccess)
        cy.get('.account > span', { timeout: 9000 }).contains('Sara Saffarini')
    else
        cy.get('#center_column > :nth-child(2) > p', { timeout: 9000 })
})

/**Create an account by email
 * @param {string} email 
 * @param {boolean} createAccountSuccess 
 * if flag was true then the user should be directed to the next page, however if false the user should get an error message
 */
export const createAccount = ((email, createAccountSuccess) => {
    verifyArea(LOCATORS.createAccountHeader, LOCATORS.createAccountHeaderValue)
    insertText(LOCATORS.createAccountEmail, email)
    cy.get('#SubmitCreate > span').click()
    if (createAccountSuccess)
        cy.get(':nth-child(1) > .page-subheading', { timeout: 9000 }).contains('Your personal information')
    else
        cy.get('#create_account_error', { timeout: 9000 })
})