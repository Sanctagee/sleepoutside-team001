import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, ouputSelector) {
        this.key = key;
        this.outputSelector = ouputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }
    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }
    calculateItemSubTotal() {
        //calculate and display the total dollar amount of the items in the cart, and the number of items.
        
    }

    calculateOrderTotal() {
        //calculate the tax and shipping amounts. Add those to the cart total to figure outthe order total.
        this.tax = (this.itemTotal ...)
        this.shipping =
        this.orderTotal =
        
        //display the totals
        this.displayOrderTotals();
    }
    displayOrderTotals() {
        //once the totals are all calculated display them in the order sumary page
        const tax = document.querySelector(`${this.outputSelector} #tax`);

        tax.innerText = `$${this.tax.toFixed(2)}`;
    }
}