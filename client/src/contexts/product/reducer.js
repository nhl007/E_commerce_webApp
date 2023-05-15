import {
  ADMIN_DELETE_PRODUCT,
  SET_ALL_PRODUCTS,
  SET_CURRENT_PRODUCT,
  // SET_CURRENT_PRODUCT_REVIEW,
  UPDATE_CART,
} from './actions';

const reducer = (state, action) => {
  if (action.type === SET_ALL_PRODUCTS) {
    return {
      ...state,
      products: action.payload.product,
      totalProducts: action.payload.totalProducts,
    };
  }
  if (action.type === SET_CURRENT_PRODUCT) {
    return {
      ...state,
      currentProduct: action.payload,
    };
  }
  // if (action.type === SET_CURRENT_PRODUCT_REVIEW) {
  //   return {
  //     ...state,
  //     currentProductReviews: action.payload,
  //   };
  // }s
  else if (action.type === UPDATE_CART) {
    return {
      ...state,
      cart: [...action.payload.cart],
      totalCartProducts: action.payload.total,
    };
  } else if (action.type === ADMIN_DELETE_PRODUCT) {
    const updatedProducts = state?.products.filter(
      (prod) => prod._id !== action.payload.id
    );
    return {
      ...state,
      products: [...updatedProducts],
      totalCartProducts: updatedProducts.length,
    };
  }

  throw new Error(`no such action ${action.type}`);
};

export default reducer;
