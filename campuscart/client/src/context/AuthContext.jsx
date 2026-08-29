import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => authService.getStoredUser());
  const [token, setToken] = useState(() => authService.getStoredToken());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = authService.getStoredToken();
      if (storedToken) {
        try {
          const res = await authService.getCurrentUser();
          if (res && res.data) {
            setCurrentUser(res.data);
            localStorage.setItem('campuscart_user', JSON.stringify(res.data));
          }
        } catch (error) {
          console.warn('Session expired or invalid token:', error.message);
          authService.logout();
          setCurrentUser(null);
          setToken(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const handleLogin = async (credentials) => {
    const res = await authService.login(credentials);
    if (res && res.data) {
      const { token: userToken, ...userData } = res.data;
      setToken(userToken);
      setCurrentUser(userData);
    }
    return res;
  };

  const handleRegister = async (userData) => {
    const res = await authService.register(userData);
    if (res && res.data) {
      const { token: userToken, ...user } = res.data;
      setToken(userToken);
      setCurrentUser(user);
    }
    return res;
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setToken(null);
  };

  const value = {
    currentUser,
    token,
    isAuthenticated: !!currentUser && !!token,
    loading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
