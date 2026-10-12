export const getCartKey = () => {
  return (localStorage.getItem('token') || localStorage.getItem('isLoggedIn'))
    ? 'userCartItems'
    : 'guestCartItems';
};

export const getCartItems = () => {
  try {
    return JSON.parse(localStorage.getItem(getCartKey())) || [];
  } catch (e) {
    console.error("Error reading cart items", e);
    return [];
  }
};

export const setCartItems = (items) => {
  try {
    localStorage.setItem(getCartKey(), JSON.stringify(items));
    window.dispatchEvent(new Event('cartUpdated'));
  } catch (e) {
    console.error("Error saving cart items", e);
  }
};

export const clearCartItems = () => {
  try {
    localStorage.removeItem(getCartKey());
    window.dispatchEvent(new Event('cartUpdated'));
  } catch (e) {
    console.error("Error clearing cart items", e);
  }
};

export const addToCart = (newItem) => {
  const currentCart = getCartItems();
  const existingItemIndex = currentCart.findIndex(item => item.id === newItem.id);

  if (existingItemIndex > -1) {
    const qty = (currentCart[existingItemIndex].quantity || 1) + (newItem.quantity || 1);
    currentCart[existingItemIndex].quantity = qty;
    currentCart[existingItemIndex].total = qty * currentCart[existingItemIndex].price;
  } else {
    currentCart.push({
      ...newItem,
      quantity: newItem.quantity || 1,
      total: (newItem.quantity || 1) * newItem.price
    });
  }

  setCartItems(currentCart);
  return currentCart;
};
