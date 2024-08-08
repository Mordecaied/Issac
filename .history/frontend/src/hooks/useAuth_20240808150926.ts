import { useState, useCallback, useEffect } from 'react';
import AuthService from '../services/AuthService';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const checkAuthStatus = useCallback(async () => {
    setIsLoading(true);
    const currentUser = AuthService.getCurrentUser();
    console.log('Current user from localStorage:', currentUser);
    if (currentUser && currentUser.token) {
      setIsAuthenticated(true);
      setUser(currentUser.user);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = async (emailOrUsername: string, password: string) => {
    try {
      console.log('Login attempt in useAuth');
      const data = await AuthService.login(emailOrUsername, password);
      console.log('Login response:', data);
      setIsAuthenticated(true);
      setUser(data.user);
      return data;
    } catch (error: any) {
      console.error('Login error in useAuth:', error);
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      console.log('Register attempt in useAuth');
      const data = await AuthService.register(username, email, password);
      console.log('Register response:', data);
      setIsAuthenticated(true);
      setUser(data.user);
      return data;
    } catch (error: any) {
      console.error('Registration error in useAuth:', error);
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  };

  const logout = () => {
    console.log('Logout attempt in useAuth');
    AuthService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return { isAuthenticated, isLoading, user, login, register, logout, checkAuthStatus };
};