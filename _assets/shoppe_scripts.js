if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
}

function ready() {
    var addToCartButtons = document.getElementsByClassName('shoppe-item-btn');

    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i];
        button.addEventListener('click', addToCart);
    }
}

function addToCart(event) {
    let button = event.target;
    let shopItem = button.parentElement.parentElement;
    let title = shopItem.getElementsByClassName('shoppe-item-title')[0].innerText
    console.log(title);
}