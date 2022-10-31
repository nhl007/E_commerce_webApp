import {} from './actions';
import { PRODUCT_FETCHING_SUCCESS } from './actions';

const reducer = (state, action) => {
  if (action.type === PRODUCT_FETCHING_SUCCESS) {
    return {
      ...state,
      products: action.payload,
    };
  }
  throw new Error(`no such action ${action.type}`);
};

export default reducer;
