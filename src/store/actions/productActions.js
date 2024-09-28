import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com/products';

export const fetchCategories = () => async (dispatch) => {
  dispatch({ type: 'FETCH_CATEGORIES_REQUEST' });
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    dispatch({ type: 'FETCH_CATEGORIES_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_FAILURE', payload: error.message });
  }
};

export const fetchProducts = (category, skip = 0, limit = 10, search = '') => async (dispatch) => {
  dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
  try {
    const url = category 
      ? `${API_BASE_URL}/category/${category}?skip=${skip}&limit=${limit}` 
      : `${API_BASE_URL}?skip=${skip}&limit=${limit}`;

    const response = await axios.get(url);
    
    const filteredProducts = search
      ? response.data.products.filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase()) ||
          product.description.toLowerCase().includes(search.toLowerCase())
        )
      : response.data.products;

    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: filteredProducts });
  } catch (error) {
    dispatch({ type: 'FETCH_FAILURE', payload: error.message });
  }
};
