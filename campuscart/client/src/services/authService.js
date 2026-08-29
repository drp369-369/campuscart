import api from './api';

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  if (response.data && response.data.data) {
    const { token, ...user } = response.data.data;
    localStorage.setItem('campuscart_token', token);
    localStorage.setItem('campuscart_user', JSON.stringify(user));
  }
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  if (response.data && response.data.data) {
    const { token, ...user } = response.data.data;
    localStorage.setItem('campuscart_token', token);
    localStorage.setItem('campuscart_user', JSON.stringify(user));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('campuscart_token');
  localStorage.removeItem('campuscart_user');
};

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const getStoredUser = () => {
  try {
    const user = localStorage.getItem('campuscart_user');
    return user ? JSON.parse(user) : null;
  } catch (e) {
    return null;
  }
};

export const getStoredToken = () => {
  return localStorage.getItem('campuscart_token');
};
