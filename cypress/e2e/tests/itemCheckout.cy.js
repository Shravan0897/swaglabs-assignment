// <reference types='cypress'/>

import { LoginAction } from "../../pageObjects/loginAction";
import { CheckoutConfirmation } from "../../pageObjects/checkoutConfirmation";
import { CheckoutInformation } from "../../pageObjects/checkoutInformation";
import { CheckoutOverview } from "../../pageObjects/checkoutOverview";
import { ProductCatalog } from "../../pageObjects/productList";
import { ShoppingCart } from "../../pageObjects/shoppingCart";

describe('When placing items in the cart', () => {

    const login = new LoginAction()
    const productCatalog = new ProductCatalog()
    const shoppingCart = new ShoppingCart()
    const checkoutInformation = new CheckoutInformation()
    const checkoutOverview = new CheckoutOverview()
    const checkoutConfirmation = new CheckoutConfirmation()

    beforeEach(() => {
        cy.viewport('macbook-15')
        login.withCredentials("standard_user", "secret_sauce")
        productCatalog.addItemToCartCalled('Sauce Labs Backpack')
        productCatalog.addItemToCartCalled('Sauce Labs Bolt T-Shirt')

        shoppingCart.open()
    });

    describe('When checking out items in the cart', () => {

        beforeEach(() => {
            shoppingCart.initiateCheckout()
        })

        it("Verify all customer information is mandatory", () => {
            checkoutInformation.withPersonalDetails("", "", "")

            checkoutInformation.error().should('be.visible')
        })

        it("Verify the items in the cart should be shown in the overview", () => {
            checkoutInformation.withPersonalDetails("Sally", "Shopper", "ABC123")

            checkoutOverview.items().should('have.length', 2)
        })

        it("Verify the Thank You message should be shown when the checkout is completed", () => {
            checkoutInformation.withPersonalDetails("Sally", "Shopper", "ABC123")

            checkoutOverview.finishCheckout()

            checkoutConfirmation.message().should('contain', 'Thank you for your order!')

        })

    })

});