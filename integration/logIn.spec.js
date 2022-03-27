import * as logInHelpers from '../support/logInHelpers'

const INPUT_VALUES = {
    validEmail: 's11819108@stu.najah.edu',
    validLoginEmail: 'sarasaffarini.35@gmail.com',
    invalidEmail: 's1',
    existingEmail: 'sarasaffarini.35@gmail.com',
    validPassword: 'sara289289',
    invalidPassword: 's',
    blankEmail: ' ',
    blankPassword: ' '
}

const ERROR_MESSAGES = {
    invalidEmailErrorMsg: 'Invalid email address.',
    invalidPasswordErrorMsg: 'Invalid password.',
    existingEmailErrorMsg: 'An account using this email address has already been registered. Please enter a valid password or request a new one. ',
    requiredEmailErrorMsg: 'An email address required.',
    requiredPasswordErrorMsg: 'Password is required.'
}

describe('LogIn Page', () => {
    beforeEach(() => {
        cy.visit('http://automationpractice.com/index.php?controller=authentication&back=my-account')
        cy.get('.page-heading').contains('Authentication')
    })

    //CREATE AN ACCOUNT FEILD

    it('Create an account using a valid email', () => {
        logInHelpers.createAccount(INPUT_VALUES.validEmail, true);
    })

    it('Create an account using an in-valid email', () => {
        logInHelpers.createAccount(INPUT_VALUES.invalidEmail, false)
        logInHelpers.verifyErrorMsg(logInHelpers.LOCATORS.createAccountError, ERROR_MESSAGES.invalidEmailErrorMsg)
    })

    it('Create an account using an already existing email', () => {
        logInHelpers.createAccount(INPUT_VALUES.existingEmail, false)
        logInHelpers.verifyErrorMsg(logInHelpers.LOCATORS.createAccountError, ERROR_MESSAGES.existingEmailErrorMsg)
    })

    it('Create an account with blank email field', () => {
        logInHelpers.createAccount(INPUT_VALUES.blankEmail, false)
        logInHelpers.verifyErrorMsg(logInHelpers.LOCATORS.createAccountError, ERROR_MESSAGES.invalidEmailErrorMsg)
    })

    //LOG IN FEILD

    it('Log in using a valid email and valid password', () => {
        logInHelpers.loginByEmail(INPUT_VALUES.validLoginEmail, INPUT_VALUES.validPassword, true)
    })

    it('Log in using a valid email and in-valid password', () => {
        logInHelpers.loginByEmail(INPUT_VALUES.validLoginEmail, INPUT_VALUES.invalidPassword, false)
        logInHelpers.verifyErrorMsg(logInHelpers.LOCATORS.logInError, ERROR_MESSAGES.invalidPasswordErrorMsg)
    })

    it('Log in using an in-valid email and valid password', () => {
        logInHelpers.loginByEmail(INPUT_VALUES.invalidEmail, INPUT_VALUES.validPassword, false)
        logInHelpers.verifyErrorMsg(logInHelpers.LOCATORS.logInError, ERROR_MESSAGES.invalidEmailErrorMsg)
    })

    it('Log in using an in-valid email and an in-valid password', () => {
        logInHelpers.loginByEmail(INPUT_VALUES.invalidEmail, INPUT_VALUES.invalidPassword, false)
        logInHelpers.verifyErrorMsg(logInHelpers.LOCATORS.logInError, ERROR_MESSAGES.invalidEmailErrorMsg)
    })

    it('Log in while leaving both the email and password feilds empty', () => {
        logInHelpers.loginByEmail(INPUT_VALUES.blankEmail, INPUT_VALUES.blankPassword, false)
        logInHelpers.verifyErrorMsg(logInHelpers.LOCATORS.logInError, ERROR_MESSAGES.requiredEmailErrorMsg)
    })

    it('Log in while leaving the email feild empty', () => {
        logInHelpers.loginByEmail(INPUT_VALUES.blankEmail, INPUT_VALUES.validPassword, false)
        logInHelpers.verifyErrorMsg(logInHelpers.LOCATORS.logInError, ERROR_MESSAGES.requiredEmailErrorMsg)
    })

    it('Log in while leaving the password feild empty', () => {
        logInHelpers.loginByEmail(INPUT_VALUES.validEmail, INPUT_VALUES.blankPassword, false)
        logInHelpers.verifyErrorMsg(logInHelpers.LOCATORS.logInError, ERROR_MESSAGES.requiredPasswordErrorMsg)
    })

    it('Click on forget password button', () => {
        cy.get('.lost_password > a').click()
    })
})