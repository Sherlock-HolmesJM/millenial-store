function utilities() {
  return {
    validateEmail,
    formatPrice,
  };

  // ----- Validator functions ----- //

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  // ----- Formatters ----- //

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
}
