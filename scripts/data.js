// ----- Data Controller ----- //
// ----- Data Controller ----- //
// ----- Data Controller ----- //

function dataController() {
  const products = getProducts();
  let items = [];

  const updatePrice = (itemID, param = 'inc') => {
    const { price } = products.find((p) => p.id === itemID);
    item = items.find((item) => item.id === itemID);

    const count = param === 'inc' ? item.quantity + 1 : item.quantity - 1;

    if (count > 0) {
      item.price = price * count;
      item.quantity = count;
    } else return false;
  };

  return {
    products,
    getProduct: (productID) => products.find((p) => p.id === productID),
    getItems: () => items,
    addItem: (item) => items.push({ ...item, quantity: 1 }),
    removeItem: (itemID) =>
      (items = items.filter((item) => item.id !== itemID)),
    updateItemPrice: (itemID, param) => updatePrice(itemID, param),
    clearItems: () => {
      items = [];
    },
  };

  // ======== Data ===========
  // ======== Data ===========

  function getProducts() {
    return [
      {
        index: 1,
        id: 'p1',
        name: 'Samsung TV',
        price: 500000,
        img: './images/product1.png',
        quantity: 1,
      },
      {
        index: 2,
        id: 'p2',
        name: 'Pixel 4a',
        price: 250000,
        img: './images/product2.png',
        quantity: 1,
      },
      {
        index: 3,
        id: 'p3',
        name: 'PS 5',
        price: 300000,
        img: './images/product3.png',
        quantity: 1,
      },
      {
        index: 4,
        id: 'p4',
        name: 'MacBook Air',
        price: 800000,
        img: './images/product4.png',
        quantity: 1,
      },
      {
        index: 5,
        id: 'p5',
        name: 'Apple Watch',
        price: 95000,
        img: './images/product5.png',
        quantity: 1,
      },
      {
        index: 6,
        id: 'p6',
        name: 'Air Pods',
        price: 75000,
        img: './images/product6.png',
        quantity: 1,
      },
    ];
  }
}
