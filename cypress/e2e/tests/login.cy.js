// <reference types='cypress'/>

import { LoginAction } from "../../pageObjects/loginAction";
import { LoginForm } from "../../pageObjects/loginForm";
import { PageHeader } from "../../pageObjects/pageHeader";

const login = new LoginAction();
const loginForm = new LoginForm();
const pageHeader = new PageHeader();

beforeEach(() => {
    cy.viewport('macbook-15');
});

describe('Login Tests', () => {

    const testLogin = (username, password) => {
        login.withCredentials(username, password);
    };

    describe('Valid user scenarios', () => {
        it('should login with valid credentials', () => {
            testLogin("standard_user", "secret_sauce");
        });

        it('should show error for incorrect username', () => {
            testLogin("WRONG_USER", "secret_sauce", 'Username and password do not match any user');
        });

        it('should show error for incorrect password', () => {
            testLogin("standard_user", "WRONG_USER", 'Username and password do not match any user');
        });
    });

    describe('Blocked account scenarios', () => {
        it('should show error for blocked user', () => {
            testLogin("locked_out_user", "secret_sauce", 'Sorry, this user has been locked out.');
        });
    });
});
