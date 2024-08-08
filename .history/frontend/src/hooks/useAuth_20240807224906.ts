import { useState, useCallback, useEffect } from 'react';
import AuthService from '../services/AuthService';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthStatus = useCallback(async () => {
    const user = AuthService.getCurrentUser();
    setIsAuthenticated(!!user);
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = async (emailOrUsername: string, password: string) => {
    try {
      await AuthService.login(emailOrUsername, password);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      await AuthService.register(username, email, password);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, register, logout, checkAuthStatus };
};