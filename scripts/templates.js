// ======== HTML Templates ===========
// ======== HTML Templates ===========

function htmlTemplates() {
  const utils = utilities(); // from utilities.js

  function getSummaryItem(item, index) {
    return `
    <tr>
      <td class="summary-td summary-num">${index}</td>
      <td class="summary-td">${item.name}</td>
      <td class="summary-td">${item.quantity}</td>
    </tr>
  `;
  }

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
              <h2 class="shop-card-hover-price">${utils.formatPrice(
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

  function getCartItem(item, index) {
    return `
    <tr id="shopping-cart-item-${item.id}" class="shopping-cart-item">
      <td class="shopping-cart-td shopping-cart-num">${index}</td>
      <td class="shopping-cart-td">${item.name}</td>
      <td class="shopping-cart-td shopping-cart-item-amount ${item.id}">
        ${getCurrency()}${item.price}
      </td>
      <td class="shopping-cart-td shopping-cart-quantity">
        <label class="shopping-cart-icon" data-decrement='1' data-id="${
          item.id
        }">
        -
        </label>
        <label class="shopping-cart-quantity-num ${item.id}">
          ${item.quantity}
        </label>
        <label class="shopping-cart-icon" data-increment='1' data-id="${
          item.id
        }">
        +
        </label>
      </td>
      <td class="shopping-cart-td">
        <button class="shopping-cart-btn remove"
        data-delete='1' data-id="${item.id}">Remove</button>
      </td>
    </tr>`;
  }

  return {
    getCartItem,
    getShopCard,
    getSummaryItem,
  };
}
