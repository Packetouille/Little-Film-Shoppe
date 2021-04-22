if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
}

function ready() {
    updateCartTotal();

    // Add Event Listeners to 'Add To Cart' buttons. 
    let addToCartButtons = document.getElementsByClassName('shoppe-item-btn');
    for (let i = 0; i < addToCartButtons.length; i++) {
        let addToCartButton = addToCartButtons[i];
        addToCartButton.addEventListener('click', addToCartClicked);
    }

    // Add Event Listeners to 'Remove' button(s) in the shoppe cart
    let removeButtons = document.getElementsByClassName('item-remove-btn');
    for (let i = 0; i < removeButtons.length; i++) {
        let removeButton = removeButtons[i];
        removeButton.addEventListener('click', removeItem);
    }
    
    // Add Event Listeners to 'Quantity' input field(s) in the shoppe cart 
    let quantityElements = document.getElementsByClassName('cart-quantity-input');
    for (let i = 0; i < quantityElements.length; i++) {
        let quantityElement = quantityElements[i];
        quantityElement.addEventListener('change', quantityChanged);
    }

    // Add Event Listener to 'Purchase' botton in the shoppe cart
    let purchaseButton = document.getElementsByClassName('purchase-btn')[0];
    purchaseButton.addEventListener('click', purchaseItems);
}

function updateCartTotal() {
// This function updates the cart total by getting the innerText of the price and quantity elements and uses
// After calculating, we then modify the innerText of the total-price element with the calculated totals.
    let cartItems = document.getElementsByClassName('cart-items')[0];
    let cartItem = cartItems.getElementsByClassName('cart-item');
    let subTotal = 0.00;
    let taxTotal = 0.00;
    let total = 0.00;
    let taxRate = .06;

    for (let i = 0; i < cartItem.length; i++) {
    // Calucates the subTotal by fetching the item price and quantity from HTML elements
    // for each item in the cart and keeping a running total in the subTotal variable.
        let cartRow = cartItem[i];
        price = parseFloat(cartRow.getElementsByClassName('cart-item-price')[0].innerText.replace('$', ''));
        quantity = parseFloat(cartRow.getElementsByClassName('cart-quantity-input')[0].value);
        subTotal += (price * quantity);
    }

    subTotal = Math.round(subTotal * 100) / 100;
    taxTotal = Math.round(subTotal * taxRate * 100) / 100;
    total = subTotal + taxTotal;
    document.getElementsByClassName('sub-total')[0].innerText = '$' + subTotal.toFixed(2);  // modify sub total field
    document.getElementsByClassName('tax-total')[0].innerText = '$' + taxTotal.toFixed(2);  // modify tax field
    document.getElementsByClassName('total-amount')[0].innerText = '$' + total.toFixed(2);  // modify total field
}

function addToCartClicked(event) {
// This function runs when an 'Add To Cart' button is clicked. It checks for duplicates before calling
// the addItemtoCart() and passes along various parameters needed within the cart item's <div> element.
    let button = event.target;
    let shopItem = button.parentElement.parentElement;

    let itemName = shopItem.getElementsByClassName('shoppe-item-name')[0].innerText;
    let itemTitle = shopItem.getElementsByClassName('shoppe-item-name')[0].title;

    // Check to see if item already exists in cart. Alert if true.
    if (checkDuplicate(itemName, itemTitle)){
        alert("Item already exists in the shoppe cart!");
        return;
    }

    let price = shopItem.getElementsByClassName('shoppe-item-price')[0].innerText;
    let imgSrc = shopItem.getElementsByClassName('shoppe-item-img')[0].src;
    let imgAlt = shopItem.getElementsByClassName('shoppe-item-img')[0].alt;

    addItemToCart(itemName, itemTitle, price, imgSrc, imgAlt);
}

function checkDuplicate(name, title) {
// This function checks to see if item already exists in cart. Receives the item name and
// title attribute as parameters and compares them to all items already in the cart.
    let cartItems = document.getElementsByClassName('cart-item');
    for (let i = 0; i < cartItems.length; i++) {
        let cartItemName = cartItems[i].getElementsByClassName('cart-item-name')[0].innerText;
        let cartItemTitle = cartItems[i].getElementsByClassName('cart-item-name')[0].title;
        
        if (name == cartItemName && title == cartItemTitle) return true;
    }
    return false;
}

function addItemToCart(itemName, itemTitle, price, imgSrc, imgAlt, ) {
// This function receives various parameters needed within the <div> element of a cart item. It creates
// a new <div> element and adds a class of 'cart-item' to it. The HTML for the cart-item is built using
// the passed in parameters, and it appends the HTML to the <div class="cart-items"> element in shoppe.html.
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-item');
    let cartItems = document.getElementsByClassName('cart-items')[0];

    let addItemContents = 
        `<div class="cart-item-img-container"><img class="cart-item-img" src="${imgSrc}" alt="${imgAlt}"/></div>
        <div class="cart-item-name" title="${itemTitle}">${itemName}</div>
        <div class="cart-item-price">${price}</div>
        <input class="cart-quantity-input" type="number" value="1"/>
        <button role="button" class="btn item-remove-btn" type="button">REMOVE</button>`

    cartRow.innerHTML = addItemContents;
    cartItems.append(cartRow);

    cartRow.getElementsByClassName('item-remove-btn')[0].addEventListener('click', removeItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
    updateCartTotal();
}

function quantityChanged(event) {
// This function runs when there is a change in the 'Quantity' field in the cart item. It checks for
// invalid values and adjusts it to the default of 1 if necessary. Lastly it calls the updateCartTotal()
// function to adjust the total reflecting the quantity change.
    input = event.target;
    if (isNaN(input.value) || input.value < 1) {
        input.value = 1;
    }

    updateCartTotal();
}

function removeItem(event) {
// This function removes the <div> element for the cart-item where the 'Remove' button was clicked.
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