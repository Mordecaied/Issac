import { useState, useCallback, useEffect } from 'react';
import AuthService from '../services/AuthService';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const checkAuthStatus = useCallback(async () => {
    setIsLoading(true);
    const currentUser = AuthService.getCurrentUser();
    if (currentUser && currentUser.token) {
      // Here, you might want to verify the token with the server
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
      const data = await AuthService.login(emailOrUsername, password);
      setIsAuthenticated(true);
      setUser(data.user);
      return data;
    } catch (error: any) {
      console.error('Login error:', error);
      setIsAuthenticated(false);
      setUser(null);
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
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return { isAuthenticated, isLoading, user, login, register, logout, checkAuthStatus };
};