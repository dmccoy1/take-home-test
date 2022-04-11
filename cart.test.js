const { products, calculateSubTotal, calculateVAT, calculateShipping, calculateDiscount, cartCheckout } = require('./cart');
let subTotal = 0


test('testing subtotal', () => {
    const cart = ["tshirt", "shoes", "jacket", "blouse", "pants"]
    cartCheckout(cart)
    // calculateSubTotal(cart[i])
    expect(subTotal).toBe(386.95);
});
