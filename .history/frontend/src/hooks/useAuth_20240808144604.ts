import { useState, useCallback, useEffect } from 'react';
import AuthService from '../services/AuthService';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const checkAuthStatus = useCallback(async () => {
    const currentUser = AuthService.getCurrentUser();
    setIsAuthenticated(!!currentUser);
    setUser(currentUser);
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = async (emailOrUsername: string, password: string) => {
    try {
      const data = await AuthService.login(emailOrUsername, password);
      setIsAuthenticated(true);
      setUser(data.user);
      return data;
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      const data = await AuthService.register(username, email, password);
      setIsAuthenticated(true);
      setUser(data.user);
      return data;
    } catch (error: any) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return { isAuthenticated, user, login, register, logout, checkAuthStatus };
};