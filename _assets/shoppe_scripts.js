if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
}

function ready() {
    updateCartTotal();

    let addToCartButtons = document.getElementsByClassName('shoppe-item-btn');
    for (let i = 0; i < addToCartButtons.length; i++) {
        let addToCartButton = addToCartButtons[i];
        addToCartButton.addEventListener('click', addToCartClicked);
    }

    let removeButtons = document.getElementsByClassName('item-remove-btn');
    for (let i = 0; i < removeButtons.length; i++) {
        let removeButton = removeButtons[i];
        removeButton.addEventListener('click', removeItem);
    }

    let quantityElements = document.getElementsByClassName('cart-quantity-input');
    for (let i = 0; i < quantityElements.length; i++) {
        let quantityElement = quantityElements[i];
        quantityElement.addEventListener('change', quantityChanged);
    }

    let purchaseButton = document.getElementsByClassName('purchase-btn')[0];
    purchaseButton.addEventListener('click', purchaseItems);
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
        quantity = parseFloat(cartRow.getElementsByClassName('cart-quantity-input')[0].value);
        subTotal += (price * quantity);
    }

    subTotal = Math.round(subTotal * 100) / 100;
    taxTotal = Math.round(subTotal * taxRate * 100) / 100;
    total = subTotal + taxTotal;
    document.getElementsByClassName('sub-total')[0].innerText = '$' + subTotal.toFixed(2);
    document.getElementsByClassName('tax-total')[0].innerText = '$' + taxTotal.toFixed(2);
    document.getElementsByClassName('total-amount')[0].innerText = '$' + total.toFixed(2);
}

function addToCartClicked(event) {
    let button = event.target;
    let shopItem = button.parentElement.parentElement;
    let title = shopItem.getElementsByClassName('shoppe-item-title')[0].innerText;
    let price = shopItem.getElementsByClassName('shoppe-item-price')[0].innerText;
    let imgSrc = shopItem.getElementsByClassName('shoppe-item-img')[0].src;
    let imgAlt = shopItem.getElementsByClassName('shoppe-item-img')[0].alt;

    addItemToCart(title, price, imgSrc, imgAlt);
}

function addItemToCart(title, price, imgSrc, imgAlt) {
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-item');
    let cartItems = document.getElementsByClassName('cart-items')[0];

    let addItemContents = 
        `<div class="cart-item-img-container"><img class="cart-item-img" src="${imgSrc}" alt="${imgAlt}"/></div>
        <div class='cart-item-name'>${title}</div>
        <div class='cart-item-price'>${price}</div>
        <input class="cart-quantity-input" type="number" value="1"/>
        <button role="button" class="btn item-remove-btn" type="button">REMOVE</button>`

    cartRow.innerHTML = addItemContents;
    cartItems.append(cartRow);

    cartRow.getElementsByClassName('item-remove-btn')[0].addEventListener('click', removeItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
    updateCartTotal();
}

function quantityChanged(event) {
    input = event.target;
    if (isNaN(input.value) || input.value < 1) {
        input.value = 1;
    }

    updateCartTotal();
}

function removeItem(event) {
    let itemToRemove = event.target;
    itemToRemove.parentElement.remove();
    updateCartTotal();
}

function purchaseItems(event) {
    let button = event.target;
    let container = button.parentElement;
    let totalAmount = container.getElementsByClassName('total-amount')[0].innerText;
    alert(`Thank you for your purchase of ${totalAmount}!`);

    let cartItems = document.getElementsByClassName('cart-items')[0];
    let nodes = cartItems.childNodes.length;

    while (nodes > 1) {
        cartItems.removeChild(cartItems.lastChild);
        nodes--;
    }

    updateCartTotal();
}