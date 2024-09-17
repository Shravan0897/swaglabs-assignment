// <reference types='cypress'/>

import { LoginAction } from "../../pageObjects/loginAction";
import { ProductCatalog } from "../../pageObjects/productList";

describe('When browsing the product catalog', () => {

    const login = new LoginAction()
    const productCatalog = new ProductCatalog()

    beforeEach(() => {
        cy.viewport('macbook-15')
        login.withCredentials("standard_user", "secret_sauce")
    });

    describe('Verify all six products should be displayed', () => {
        it('It should show titles for 6 products', () => {
            productCatalog.productNames().should('have.length', 6)
        });
    });

    describe('Verify the customer should be able to add any item to the cart', () => {

        it('Verify adding a item to the cart should update the cart count', () => {

            productCatalog.addItemToCartCalled('Sauce Labs Backpack')
            productCatalog.shoppingCartBadge().should('contain.text', '1')
            productCatalog.addToCartButtons().should('have.length', 5)
            productCatalog.removeFromCartButtons().should('have.length', 1)
        });

        it('Verify adding two items to the cart', () => {
            productCatalog.addItemToCartCalled('Sauce Labs Backpack')
            productCatalog.addItemToCartCalled('Sauce Labs Bike Light')

            productCatalog.shoppingCartBadge().should('contain.text', '2')
        });

        it('Verify adding two items to the cart then removing one', () => {
            productCatalog.addItemToCartCalled('Sauce Labs Backpack')
            productCatalog.addItemToCartCalled('Sauce Labs Bike Light')

            productCatalog.removeItemFromCartCalled('Sauce Labs Backpack')

            productCatalog.shoppingCartBadge().should('contain.text', '1')
            productCatalog.addToCartButtons().should('have.length', 5)
            productCatalog.removeFromCartButtons().should('have.length', 1)
        });
    });

});

