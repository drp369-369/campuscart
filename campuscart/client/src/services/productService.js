import api from './api';

export const getProducts = async (params = {}) => {
  const queryParams = new URLSearchParams();
  if (params.search && params.search.trim()) {
    queryParams.append('search', params.search.trim());
  }
  if (params.category && params.category !== 'All') {
    queryParams.append('category', params.category);
  }

  const queryString = queryParams.toString();
  const url = queryString ? `/products?${queryString}` : '/products';

  const response = await api.get(url);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await api.post('/products', productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};
