let products = {

    "tshirt": {
        "itemtype": "T-shirt",
        "price": 30.99,
        "country": "US",
        "weight": 0.2,
        "rate": 2.00,
        "shipping": 0,

    },

    "blouse": {
        "itemtype": "Blouse",
        "price": 10.99,
        "country": "UK",
        "weight": 0.3,
        "rate": 3.00,
        "shipping": 0
    },

    "pants": {
        "itemtype": "Pants",
        "price": 64.99,
        "country": "UK",
        "weight": 0.9,
        "rate": 3.00,
        "shipping": 0
    },

    "sweatpants": {
        "itemtype": "Sweatpants",
        "price": 84.99,
        "country": "CN",
        "weight": 1.1,
        "rate": 2.00,
        "shipping": 0
    },

    "jacket": {
        "itemype": "Jacket",
        "price": 199.99,
        "country": "US",
        "weight": 2.2,
        "rate": 2.00,
        "shipping": 0
    },
    "shoes": {
        "itemype": "Shoes",
        "price": 79.99,
        "country": "CN",
        "weight": 1.3,
        "rate": 2.00,
        "shipping": 0
    }

}

let cart = []
let subTotal = 0
let VAT = 0//14% tax per item
let totalDiscount = 0
let shippingCost = 0
let jacketDiscountRate = products.jacket.price / 2 //50% off
let shoeDiscountRate = products.shoes.price * .10 // 10% off
let shippingDiscount = 0
let jacketDiscountApplied = false
let shoeDiscountApplied = false
let shippingDiscountApplied = false
let topsInCart = 0
let totalCost;

//Calculates Subtotal of Items Only
function calculateSubTotal(item) {
    switch (item) {
        case ("tshirt"):
            subTotal += products.tshirt.price
            break
        case ("blouse"):
            subTotal += products.blouse.price
            break
        case ("pants"):
            subTotal += products.pants.price
            break
        case ("sweatpants"):
            subTotal += products.sweatpants.price
            break
        case ("jacket"):
            subTotal += products.jacket.price
            break
        case ("shoes"):
            subTotal += products.shoes.price
            break
    }
}
//Calculates VAT (Value-Added Tax) of each item and stores the total to VAT variable
function calculateVAT(item) {
    switch (item) {
        case ("tshirt"):
            VAT += products.tshirt.price * 0.14
            break
        case ("blouse"):
            VAT += products.blouse.price * 0.14
            break
        case ("pants"):
            VAT += products.pants.price * 0.14
            break
        case ("sweatpants"):
            VAT += products.sweatpants.price * 0.14
            break
        case ("jacket"):
            VAT += products.jacket.price * 0.14
            break
        case ("shoes"):
            VAT += products.shoes.price * 0.14
            break
    }
}
//Calculates Shipping of each item and stores the total to shippingCost variable
function calculateShipping(item) {
    let grams
    let total = 0
    switch (item) {
        case ("tshirt"):
            grams = products.tshirt.weight * 1000
            total += grams * products.tshirt.rate
            break
        case ("blouse"):
            grams = products.blouse.weight * 1000
            total += grams * products.blouse.rate
            break
        case ("pants"):
            grams = products.pants.weight * 1000
            total += grams * products.pants.rate
            break
        case ("sweatpants"):
            grams = products.sweatpants.weight * 1000
            total += grams * products.sweatpants.rate
            break
        case ("jacket"):
            grams = products.jacket.weight * 1000
            total += grams * products.jacket.rate
            break
        case ("shoes"):
            grams = products.shoes.weight * 1000
            total += grams * products.shoes.rate
            break
    }
    shippingCost += total / 100
}
//Calculates Discount
function calculateDiscount(cart) {
    //handles shoe discount
    if (cart.includes("shoes")) {
        totalDiscount += shoeDiscountRate
        shoeDiscountApplied = true
    }
    //handles 50% discount for jacket if two tops(T-shirt or Blouse) are purchased.
    if (topsInCart >= 2) {
        totalDiscount += jacketDiscountRate
        jacketDiscountApplied = true
    }

    //handles shipping discount
    if (cart.length >= 2 && shippingCost < 10) { //added logic to handle shipping discount if it was less than the MAX discount of $10
        shippingDiscount = shippingCost
        shippingDiscountApplied = true
    } else if (cart.length >= 2 && shippingCost >= 10) {
        shippingDiscount = 10
        shippingDiscountApplied = true
    }
    totalDiscount += shippingDiscount
}
// the main function that evaluates the cart and calls the calculating functions.
function cartCheckout(cart) {
    for (i = 0; i < cart.length; i++) {
        calculateSubTotal(cart[i])
        calculateVAT(cart[i])
        calculateShipping(cart[i])
        if (cart[i] == "tshirt" || cart[i] == "blouse") {//counter for "tops" - necessary for creating a discount for Jackets if two tops are in the cart. 
            topsInCart += 1
        }
    }
    calculateDiscount(cart)
}

cartCheckout(cart)
totalCost = (subTotal + VAT + shippingCost) - totalDiscount

//Invoice
console.log(`Subtotal:$${subTotal.toFixed(2)}`)
console.log(`Shipping:$${shippingCost}`)
console.log(`VAT:$${VAT.toFixed(3)}`)
if (totalDiscount > 0) {
    console.log("Discounts:")
}
if (shoeDiscountApplied == true) {
    console.log(`        10% off shoes: -$${shoeDiscountRate}`)
}
if (jacketDiscountApplied == true) {
    console.log(`        50% off jacket: -$${jacketDiscountRate}`)
}
if (shippingDiscountApplied == true) {
    console.log(`        $${shippingDiscount} off shipping: -$${shippingDiscount}`)
}
console.log(`Total: $${totalCost.toFixed(3)}`)
module.exports = products;
module.exports = calculateSubTotal;
module.exports = calculateVAT;
module.exports = calculateShipping;
module.exports = calculateDiscount;
module.exports = cartCheckout;