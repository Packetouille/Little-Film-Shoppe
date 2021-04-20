console.log('hello');
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
}

function ready() {
    updateCartTotal();

    let addToCartButtons = document.getElementsByClassName('shoppe-item-btn');
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i];
        button.addEventListener('click', addToCart);
    }

    let quantityElements = document.getElementsByClassName('cart-quantity-input');
    for (let i = 0; i < quantityElements.length; i++) {
        let quantityElement = quantityElements[i];
        quantityElement.addEventListener('change', quantityChanged);
    }

    let purchaseButton = document.getElementsByClassName('purchase-btn')[0];
    purchaseButton.addEventListener('click', purchaseItems);

    updateCartTotal();
}

function updateCartTotal() {
// Function gets the innerText of the price element (replaces the '$') and innerText from the quantity element 
// and uses the values to calculate the total. We then modify the innerText of the total-price element with the
// calculated total.
    let cartItems = document.getElementsByClassName('cart-items')[0];
    let cartItem = cartItems.getElementsByClassName('cart-item');
    let subTotal = 0.00;
    let taxTotal = 0.00;
    let total = 0.00;
    taxRate = .06;

    for (let i = 0; i < cartItem.length; i++) {
        let cartRow = cartItem[i];
        price = parseFloat(cartRow.getElementsByClassName('cart-item-price')[0].innerText.replace('$', ''));
        quantity = cartRow.getElementsByClassName('cart-quantity-input')[0].value;
        subTotal += (price * quantity);
    }

    subTotal = Math.round(subTotal * 100) / 100;
    console.log(`subTotal: ${subTotal} | typeof subTotal: ${typeof subTotal}`);
    taxTotal = Math.round(subTotal * taxRate * 100) / 100;
    console.log(`taxTotal: ${taxTotal} | typeof taxTotal: ${typeof taxTotal}`);
    total = subTotal + taxTotal;
    console.log(`Total: ${total} | typeof total: ${typeof total}`);
    document.getElementsByClassName('sub-total')[0].innerText = '$' + subTotal.toFixed(2);
    document.getElementsByClassName('tax-total')[0].innerText = '$' + taxTotal.toFixed(2);
    document.getElementsByClassName('total-amount')[0].innerText = '$' + total.toFixed(2);
}

function addToCart(event) {
    let button = event.target;
    let shopItem = button.parentElement.parentElement;
    let title = shopItem.getElementsByClassName('shoppe-item-title')[0].innerText;
    let price = shopItem.getElementsByClassName('shoppe-item-price')[0].innerText;
    let img = shopItem.getElementsByClassName('')
    console.log(title, price);
}

function quantityChanged(event) {
    input = event.target;
    if (isNaN(input.value) || input.value < 1) {
        input.value = 1;
    }

    updateCartTotal();
}

function purchaseItems(event) {
    let button = event.target;
    let container = button.parentElement;
    let totalAmount = container.getElementsByClassName('total-amount')[0].innerText;
    alert(`Thank you for your purchase of ${totalAmount}!`);
}