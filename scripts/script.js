const data = dataController(); // from data.js
const view = viewController(); // from viewController.js
const utils = utilities(); // from utilities.js

const elements = view.getDOMElements();

// ----- Colors ----- //

const colors = {
  orange: '#ff7a00',
  green: 'green',
};

const getCurrency = () => '₦';

// ----- Form ----- //

const form = { valid: false, name: '', phone: 0, email: '' };
const formTypes = { phone: 'phone', email: 'email', name: 'name' };

function setForm(type, value) {
  form[type] = value;

  if (form.name && form.phone && form.email) form.valid = true;
  else form.valid = false;
}

const formMessages = {
  empty: {
    [formTypes.name]: 'Please enter your name',
    [formTypes.email]: 'Please enter an email',
    [formTypes.phone]: 'Please enter your telephone number',
  },
  invalid: {
    [formTypes.email]: 'Invalid email',
    [formTypes.phone]: 'Phone number can only be numbers',
  },
  length: {
    [formTypes.phone]: 'Phone number cannot be less than 11 characters',
  },
};

view.addShopCards(data.products);

// ----- Event Listeners ----- //
// ----- Event Listeners ----- //
// ----- Event Listeners ----- //

function validateInput(e) {
  const { value } = e.target;
  const { type } = e.target.dataset;

  if (value.trim() === '')
    return view.updateLabel(type, formMessages.empty[type]); // return when there's an error

  if (type === formTypes.name) setForm(type, value);

  if (type === formTypes.email) {
    const result = utils.validateEmail(value);
    if (result) setForm(type, value);
    else return view.updateLabel(type, formMessages.invalid[type]); // return when there's an error
  }

  if (type === formTypes.phone) {
    if (isNaN(value)) return view.updateLabel(type, formMessages.invalid[type]); // return when there's an error
    if (value.length < 11)
      return view.updateLabel(type, formMessages.length[type]); // return when there's an error
    setForm(type, +value);
  }

  view.updateLabel(type, '');

  e.target.style.borderColor = colors.green;
}

function validatePhone(e) {
  const { phone } = formTypes;
  if (isNaN(e.key)) view.updateLabel(phone, formMessages.invalid[phone]);
  else view.updateLabel(phone, '');
}

elements.getInput(formTypes.name).addEventListener('blur', validateInput);
elements.getInput(formTypes.email).addEventListener('blur', validateInput);
elements.getInput(formTypes.phone).addEventListener('blur', validateInput);
elements.getInput(formTypes.phone).addEventListener('keypress', validatePhone);

function closeCart({ target }) {
  if (target.closest('.shopping-cart-td')) return;
  if (target.closest('.shopping-cart-container')) return;
  if (target.closest('.intro-cart-badge')) return;
  if (target.matches('.shop-card-btn')) return;

  view.showCart(false);
}

elements.checkout.addEventListener('click', function () {
  if (!form.valid) return;
  view.showCart(false);
  payWithPaystack(form.email, view.getTotalAmount());
});

elements.summaryButton.addEventListener('click', function () {
  view.showSummary(false);
  document.location.reload();
});

elements.shoppingCartItems.addEventListener('click', function (event) {
  const { id, increment, decrement, delete: del } = event.target.dataset;

  if (del) {
    const cardButton = elements.cardButton(id);
    data.removeItem(id);
    view.updateCardButton(cardButton, '1');
  } else if (increment) {
    data.updateItemPrice(id, 'inc');
  } else if (decrement) {
    const result = data.updateItemPrice(id, 'dec');
    if (result === false)
      alert(
        'You cannot have less than one item. If you wish to remove the item, click Remove.'
      );
  }
  view.updateItems(data.getItems());
});

elements.cartBadge.addEventListener('click', function (event) {
  view.showCart(true);
});

elements.body.addEventListener('click', closeCart);

elements.closeCart.addEventListener('click', function () {
  view.showCart(false);
});

elements.shopCards.addEventListener('click', function (event) {
  if (!event.target.dataset.product) return;

  const productID = event.target.dataset.id;

  if (event.target.dataset.index === '1') {
    data.addItem(data.getProduct(productID));
    view.updateCardButton(event.target, '2');
  } else {
    data.removeItem(productID);
    view.updateCardButton(event.target, '1');
  }
  view.updateItems(data.getItems());
});

function payWithPaystack(email, amount) {
  let handler = PaystackPop.setup({
    key: 'pk_test_90679f116a5220b4c1aa1fb77444c23a9ea88583', // Replace with your public key
    email,
    amount: amount * 100,
    ref: '' + Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    // label: "Optional string that replaces customer email"
    onClose: function () {
      alert('Window closed.');
    },
    callback: function (response) {
      view.buildSummary(form.name, data.getItems());
    },
  });
  handler.openIframe();
}
