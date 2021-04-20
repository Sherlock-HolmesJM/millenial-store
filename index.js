const elem = {
  body: document.getElementById('body'),
  badgeCount: document.querySelector('.intro-badge'),
  cartBadge: document.querySelector('.intro-cart'),
  cart: document.querySelector('.shopping-cart-container'),
  closeCart: document.querySelector('.shopping-cart-btn.btn-1'),
  checkout: document.querySelector('.shopping-cart-btn.checkout'),
  addToCartButtons: document.querySelectorAll('.shop-card-btn'),
  shopCards: document.querySelector('.shop-cards'),
  shoppingCartItems: document.querySelector('.shopping-cart-tbody'),
  shoppingCartAmount: document.querySelector('.shopping-cart-amount'),
  amountElems: () => document.querySelectorAll('.shopping-cart-item-amount'),
  cardButton: (productID) =>
    document.getElementById('shop-card-btn-' + productID),
  itemPrice: (productID) =>
    document.querySelector(`.shopping-cart-item-amount.${productID}`),
  itemCount: (productID) =>
    document.querySelector(`.shopping-cart-quantity-num.${productID}`),
};

addShopCards();

// ----- Event Listeners ----- //
// ----- Event Listeners ----- //
// ----- Event Listeners ----- //

function closeCart({ target }) {
  if (target.closest('.intro-cart-badge')) return;
  if (target.matches('.shop-card-btn')) return;
  if (target.matches('.shopping-cart-btn')) return;
  if (target.closest('.shopping-cart')) return;
  showCart(false);
}

elem.checkout.addEventListener('click', function (event) {
  // showCart(false);
});

elem.shoppingCartItems.addEventListener('click', function (event) {
  const { id, increment, decrement, delete: del } = event.target.dataset;

  if (del) {
    const cardButton = elem.cardButton(id);
    removeCartItem(getProduct(id));
    updateCardButton(cardButton, '1');
  } else if (increment) {
    updateItemPrice(id, '+');
  } else if (decrement) {
    updateItemPrice(id, '-');
  }
});

elem.cartBadge.addEventListener('click', function (event) {
  showCart(true);
});

elem.body.addEventListener('click', closeCart);
elem.closeCart.addEventListener('click', function () {
  showCart(false);
});

elem.shopCards.addEventListener('click', function (event) {
  if (!event.target.dataset.product) return;

  const product = getProduct(event.target.dataset.id);

  if (event.target.dataset.index === '1') {
    addCartItem(getCartItem(product));
    updateCardButton(event.target, '2');
  } else {
    removeCartItem(product);
    updateCardButton(event.target, '1');
  }
});

// ----- View Controller Functions ----- //
// ----- View Controller Functions ----- //
// ----- View Controller Functions ----- //

function showCart(show = true) {
  elem.cart.style.display = show ? 'flex' : 'none';
}

function updateItemCount(productID, param = '+') {
  const el = elem.itemCount(productID);
  let count = parseInt(el.textContent);
  count = param === '+' ? count + 1 : count - 1;
  el.textContent = count < 1 ? 1 : count;
  if (count < 1)
    alert(
      'You cannot have less than one item. If you wish to remove the item, click Remove.'
    );
}

function updateItemPrice(productID, param = '+') {
  const { price } = getProduct(productID);

  if (!price) return;

  const el = elem.itemPrice(productID);
  const oldPrice = parsePrice(el.textContent);
  const newPrice = param === '+' ? oldPrice + price : oldPrice - price;
  el.textContent = formatPrice(newPrice === 0 ? price : newPrice);

  updateItemCount(productID, param);
  if (newPrice > 0) updateTotalAmount();
}

function updateCardButton(btn, index) {
  btn.dataset.index = index;
  btn.textContent = index === '1' ? 'add to cart' : 'remove from cart';
}

function updateTotalAmount() {
  const amount = Array.from(elem.amountElems()).reduce(
    (acc, item) => acc + parsePrice(item.textContent),
    0
  );
  elem.shoppingCartAmount.textContent = formatPrice(amount);
}

/**
 *
 * @param param + | -
 */
function updateBadgeCount(param = '+') {
  const count = parseInt(elem.badgeCount.textContent);
  elem.badgeCount.textContent = param === '+' ? count + 1 : count - 1;
}

function addCartItem(cartItem) {
  elem.shoppingCartItems.insertAdjacentHTML('beforeend', cartItem);
  updateBadgeCount('+');
  updateTotalAmount();
}

function removeCartItem(product) {
  const item = document.getElementById('shopping-cart-item-' + product.id);
  item.remove();
  updateBadgeCount('-');
  updateTotalAmount();
}

function addShopCards() {
  getProducts()
    .reverse()
    .forEach((product) => {
      const shopCard = getShopCard(product);
      elem.shopCards.insertAdjacentHTML('afterbegin', shopCard);
    });
}

// ----- Other functions ----- //
// ----- Other functions ----- //
// ----- Other functions ----- //

function getProduct(id) {
  return getProducts().find((product) => product.id === id);
}

function getProducts() {
  return [
    {
      index: 1,
      id: 'p1',
      name: 'Samsung TV',
      price: 500000,
      img: './images/product1.png',
    },
    {
      index: 2,
      id: 'p2',
      name: 'Pixel 4a',
      price: 250000,
      img: './images/product2.png',
    },
    {
      index: 3,
      id: 'p3',
      name: 'PS 5',
      price: 300000,
      img: './images/product3.png',
    },
    {
      index: 4,
      id: 'p4',
      name: 'MacBook Air',
      price: 800000,
      img: './images/product4.png',
    },
    {
      index: 5,
      id: 'p5',
      name: 'Apple Watch',
      price: 95000,
      img: './images/product5.png',
    },
    {
      index: 6,
      id: 'p6',
      name: 'Air Pods',
      price: 75000,
      img: './images/product6.png',
    },
  ];
}

// ----- Formatter functions ----- //
// ----- Formatter functions ----- //
// ----- Formatter functions ----- //

/**
 *
 * @param price ₦98,000
 * @returns 98000: remove currency and delimiters from price and return price as a number
 */
function parsePrice(price) {
  price = price.replace('₦', '').split(',').join('');
  return parseInt(price);
}

/**
 *
 * @param price 98000
 * @param currency default ₦
 * @returns ₦98,000
 */

function formatPrice(price, currency = '₦') {
  const head = `${price}`.split('');
  const tails = [];

  for (let i = head.length; i > 3; i -= 3) {
    const index = head.length - 3;
    const tail = head.splice(index, 3).join('');
    tails.push(tail);
  }

  if (tails.length === 0) return `${currency}${head.join('')}`;
  return `${currency}${head.join('')},${tails.reverse().join(',')}`;
}

// ----- HTML template functions ----- //
// ----- HTML template functions ----- //
// ----- HTML template functions ----- //

function getShopCard(product) {
  return `
        <div class="shop-card" id=${product.id}>
          <div class="shop-card-image-div">
            <img
              class="shop-card-image"
              src=${product.img}
              alt=${product.name}
            />
            <div class="shop-card-hover">
              <h2 class="shop-card-hover-title">Price</h2>
              <h2 class="shop-card-hover-price">${formatPrice(
                product.price
              )}</h2>
            </div>
          </div>
          <h3 class="shop-card-title">${product.name}</h3>
          <button class="shop-card-btn" id="shop-card-btn-${product.id}" 
            data-id=${product.id} data-product="yes" data-index="1"
          >ADD TO CART</button>
        </div>`;
}

function getCartItem(product) {
  return `
    <tr id="shopping-cart-item-${product.id}" class="shopping-cart-item">
      <td class="shopping-cart-td shopping-cart-num">${product.index}</td>
      <td class="shopping-cart-td">${product.name}</td>
      <td class="shopping-cart-td shopping-cart-item-amount ${
        product.id
      }">${formatPrice(product.price)}</td>
      <td class="shopping-cart-td shopping-cart-quantity">
        <button class="shopping-cart-btn" data-decrement='1' data-id="${
          product.id
        }">-</button>
        <label class="shopping-cart-quantity-num ${product.id}">1</label>
        <button class="shopping-cart-btn" data-increment='1' data-id="${
          product.id
        }">+</button>
      </td>
      <td class="shopping-cart-td">
        <button class="shopping-cart-btn"
        data-delete='1' data-id="${product.id}">X</button>
      </td>
    </tr>`;
}
