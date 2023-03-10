/*--------------- Action Type variables ---------------*/

const GET_CART_ITEMS = "cart/GET_CART_ITEMS";
const ADD_ITEM_TO_CART = "cart/ADD_ITEM_TO_CART";
const EDIT_CART_ITEM = "cart/EDIT_CART_ITEM";
const DELETE_CART_ITEM = "cart/DELETE_CART_ITEM";
const CHECKOUT_CART = "cart/CHECKOUT_CART";

/*--------------- Regular Action Creators ---------------*/

const getCartItemsAction = (cartItems) => ({
  type: GET_CART_ITEMS,
  cartItems,
});

const addItemToCartAction = (cartItem) => ({
  type: ADD_ITEM_TO_CART,
  cartItem,
});

const editCartItemAction = (id, quantity) => ({
  type: EDIT_CART_ITEM,
  id,
  quantity,
});

const deleteCartItemAction = (id) => ({
  type: DELETE_CART_ITEM,
  id,
});

const checkoutCartAction = () => ({
  type: CHECKOUT_CART,
});

/*--------------- Thunk Action Creators ---------------*/

export const getCartItemsThunk = () => async (dispatch) => {
  const response = await fetch("/api/cart/current");
  if (response.ok) {
    const cartItems = await response.json();
    dispatch(getCartItemsAction(cartItems));
    return cartItems;
  }
};

export const addCartItemThunk = (productId, quantity) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity: quantity }),
  });

  if (response.ok) {
    const cartItem = await response.json();
    dispatch(addItemToCartAction(cartItem));
    return cartItem;
  } else {
    const data = await response.json();
    return data.errors;
  }
};

export const editCartItemThunk = (id, quantity) => async (dispatch) => {
  const response = await fetch(`/api/cart/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity: quantity }),
  });
  if (response.ok) {
    const cartItem = await response.json();
    dispatch(editCartItemAction(id, quantity));
    return cartItem;
  } else {
    const data = await response.json();
    return data.errors;
  }
};

export const deleteCartItemThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/cart/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const deletedItem = await response.json();
    dispatch(deleteCartItemAction(id));
    return deletedItem;
  } else {
    const data = await response.json();
    return data.errors;
  }
};

export const checkoutCartThunk = () => async (dispatch) => {
  const response = await fetch("/api/cart/checkout", {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(checkoutCartAction());
    return data;
  } else {
    const data = await response.json();
    return data.errors;
  }
};

/*--------------- Reducer Function ---------------*/

export default function cart(state = {}, action) {
  switch (action.type) {
    case GET_CART_ITEMS: {
      const newState = {};
      action.cartItems.CartItems.forEach((item) => {
        newState[item.id] = item;
      });
      return newState;
    }
    case EDIT_CART_ITEM: {
      const newState = { ...state };
      newState[action.id].quantity = action.quantity;
      return newState;
    }
    case ADD_ITEM_TO_CART: {
      const newState = { ...state };
      newState[action.cartItem.id] = action.cartItem;
      return newState;
    }
    case DELETE_CART_ITEM: {
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    }
    case CHECKOUT_CART: {
      return {};
    }
    default:
      return state;
  }
}
