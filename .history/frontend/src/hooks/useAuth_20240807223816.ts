import { useState, useCallback } from 'react';
import AuthService from '../services/AuthService';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthStatus = useCallback(async () => {
    const user = AuthService.getCurrentUser();
    if (user && user.token) {
      // You might want to validate the token with the server here
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = async (emailOrUsername: string, password: string) => {
    try {
      const result = await AuthService.login(emailOrUsername, password);
      console.log('Login successful:', result);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.error('Login error in useAuth:', error);
      throw new Error(error.message || 'Failed to log in');
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      await AuthService.register(username, email, password);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.error('Registration error:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to register');
    }
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, register, logout, checkAuthStatus };
};