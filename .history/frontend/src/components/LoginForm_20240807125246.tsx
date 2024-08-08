import { useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (emailOrUsername: string, password: string) => {
    try {
      await AuthService.login(emailOrUsername, password);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to log in');
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

  return { isAuthenticated, login, register, logout };
};