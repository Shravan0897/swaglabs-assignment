// <reference types='cypress'/>

import { LoginAction } from "../../pageObjects/loginAction";
import { ProductCatalog } from "../../pageObjects/productList";
import { ShoppingCart } from "../../pageObjects/shoppingCart";

describe('When placing items in the cart', () => {

    const login = new LoginAction()
    const productCatalog = new ProductCatalog()
    const shoppingCart = new ShoppingCart()

    beforeEach(() => {
        cy.viewport('macbook-15')
        login.withCredentials("standard_user", "secret_sauce")
    });

    describe('Verify adding a single item', () => {

        beforeEach(() => {
            productCatalog.addItemToCartCalled('Sauce Labs Backpack')
            shoppingCart.open()
        });

        it('It should show the name of the item in the cart', () => {

            shoppingCart.items()
                .should('have.length', 1)
                .eq(0)
                .should('contain.text', 'Sauce Labs Backpack')
        })

        it('It should show the price', () => {
            shoppingCart.itemPrice('Sauce Labs Backpack').should('contain.text', '$29.99')
        })

        it('It should show the description', () => {
            shoppingCart.itemDescription('Sauce Labs Backpack').should('contain.text', 'carry.allTheThings()')
        })

        it('It should show the quantity', () => {
            shoppingCart.itemQuantity('Sauce Labs Backpack').should('contain.text', '1')
        })
    })

    describe('Verify adding several items', () => {
        it('It should show the details of the item in the cart', () => {

            productCatalog.addItemToCartCalled('Sauce Labs Backpack')
            productCatalog.addItemToCartCalled('Sauce Labs Bolt T-Shirt')

            shoppingCart.open()

            shoppingCart.items().should('have.length', 2)

            shoppingCart.items().eq(0).should('contain.text', 'Sauce Labs Backpack')
            shoppingCart.items().eq(1).should('contain.text', 'Bolt T-Shirt')

        })
    })

    describe('Verify removing items from the cart', () => {
        beforeEach(() => {
            productCatalog.addItemToCartCalled('Sauce Labs Backpack')
            productCatalog.addItemToCartCalled('Sauce Labs Bolt T-Shirt')

            shoppingCart.open()
        });

        it('It should be removed from the cart list', () => {

            shoppingCart.removeButtonFor('Sauce Labs Backpack').click()

            shoppingCart.items()
                .should('have.length', 1)
                .eq(0)
                .should('contain.text', 'Sauce Labs Bolt T-Shirt')
        })
    })

})