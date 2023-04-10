import { ADD_TO_CART, SET_ALL_PRODUCTS } from './actions';

const reducer = (state, action) => {
  if (action.type === SET_ALL_PRODUCTS) {
    return {
      ...state,
      products: action.payload.product,
      totalProducts: action.payload.totalProducts,
    };
  } else if (action.type === ADD_TO_CART) {
    return {
      ...state,
      cart: [...state.cart, action.payload.id],
      totalCartProducts: action.payload.total,
    };
  }

  throw new Error(`no such action ${action.type}`);
};

export default reducer;
