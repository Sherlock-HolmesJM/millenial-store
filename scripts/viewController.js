// ----- View Controller ----- //

function viewController() {
  const templates = htmlTemplates(); // from templates.js

  const elem = {
    body: document.getElementById('body'),
    form: document.querySelector('.shopping-cart-form'),
    getInput: (type) => document.querySelector(`.shopping-cart-input.${type}`),
    getLabel: (type) =>
      document.querySelector(`.shopping-cart-input-label.${type}`),
    badgeCount: document.querySelector('.intro-badge'),
    cartBadge: document.querySelector('.intro-cart'),
    cart: document.querySelector('.shopping-cart-container'),
    closeCart: document.querySelector('.shopping-cart-btn.btn-1'),
    checkout: document.querySelector('.shopping-cart-btn.checkout'),
    addToCartButtons: document.querySelectorAll('.shop-card-btn'),
    shopCards: document.querySelector('.shop-cards'),
    shoppingCartItems: document.querySelector('.shopping-cart-tbody'),
    shoppingCartAmount: document.querySelector('.shopping-cart-amount'),
    summary: document.querySelector('.summary-container'),
    summaryItems: document.querySelector('.summary-tbody'),
    summaryName: document.querySelector('.summary-name'),
    summaryButton: document.querySelector('.summary-btn'),
    amountElems: () => document.querySelectorAll('.shopping-cart-item-amount'),
    cardButton: (productID) =>
      document.getElementById('shop-card-btn-' + productID),
  };

  function buildSummary(name, items) {
    showSummary(true);
    changeSummaryName(name);
    loadSummaryItems(items);
  }

  function showSummary(value = true) {
    elem.summary.style.display = value ? 'flex' : 'none';
  }

  function changeSummaryName(name) {
    elem.summaryName.textContent = name;
  }

  function loadSummaryItems(items) {
    const html = items
      .map((item, index) => templates.getSummaryItem(item, ++index))
      .join('');
    elem.summaryItems.innerHTML = html;
  }

  function updateLabel(type, text) {
    if (text) setForm(type, '');
    else elem.getInput(type).style.borderColor = colors.orange;

    elem.getLabel(type).textContent = text;
  }

  function showCart(show = true) {
    elem.cart.style.display = show ? 'flex' : 'none';
  }

  function updateCardButton(btn, index) {
    btn.dataset.index = index;
    btn.textContent = index === '1' ? 'add to cart' : 'remove from cart';
  }

  function updateTotalAmount() {
    const price = data.getItems().reduce((acc, item) => acc + item.price, 0);
    elem.shoppingCartAmount.textContent = getCurrency() + price;
  }

  function getTotalAmount() {
    let amount = elem.shoppingCartAmount.textContent;
    return +amount.replace(getCurrency(), '');
  }

  function updateBadgeCount() {
    elem.badgeCount.textContent = data.getItems().length;
  }

  function updateItems(items) {
    const html = items
      .map((item, index) => templates.getCartItem(item, index + 1))
      .join('');
    elem.shoppingCartItems.innerHTML = html;

    updateBadgeCount();
    updateTotalAmount();
  }

  function addShopCards(products) {
    const cards = products
      .map((product) => templates.getShopCard(product))
      .join('');
    elem.shopCards.innerHTML = cards;
  }

  function getDOMElements() {
    return elem;
  }

  return {
    getDOMElements,
    buildSummary,
    showSummary,
    updateLabel,
    addShopCards,
    showCart,
    updateCardButton,
    updateItems,
    getTotalAmount,
  };
}
