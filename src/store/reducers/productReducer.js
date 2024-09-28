const initialState = {
  categories: [],
  products: [],
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CATEGORIES_REQUEST':
    case 'FETCH_PRODUCTS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_CATEGORIES_SUCCESS':
      return { ...state, loading: false, categories: action.payload };
    case 'FETCH_PRODUCTS_SUCCESS':
      return {
        ...state,
        loading: false,
        products: [...state.products, ...action.payload],
      };
    case 'FETCH_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default productReducer;
