import { useState, useCallback, useEffect } from 'react';
import AuthService from '../services/AuthService';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  const checkAuthStatus = useCallback(async () => {
    setIsLoading(true);
    const currentUser = AuthService.getCurrentUser();
    console.log('Current user from localStorage:', currentUser);
    if (currentUser && currentUser.token) {
      setIsAuthenticated(true);
      setUser(currentUser.user);
      setAuthToken(currentUser.token);
    } else {
      setIsAuthenticated(false);
      setUser(null);
      setAuthToken(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  async login(emailOrUsername: string, password: string) {
    console.log('AuthService login attempt:', emailOrUsername);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { emailOrUsername, password });
      console.log('AuthService login response:', response.data);
      if (response.data.token && response.data.user) {
        localStorage.setItem('user', JSON.stringify({
          token: response.data.token,
          user: response.data.user
        }));
      }
      return response.data;
    } catch (error) {
      console.error('AuthService login error:', error);
      throw error;
    }
  }

  const register = async (username: string, email: string, password: string) => {
    try {
      console.log('Register attempt in useAuth');
      const data = await AuthService.register(username, email, password);
      console.log('Register response:', data);
      setIsAuthenticated(true);
      setUser(data.user);
      setAuthToken(data.token);
      return data;
    } catch (error: any) {
      console.error('Registration error in useAuth:', error);
      setIsAuthenticated(false);
      setUser(null);
      setAuthToken(null);
      throw error;
    }
  };

  const logout = () => {
    console.log('Logout attempt in useAuth');
    AuthService.logout();
    setIsAuthenticated(false);
    setUser(null);
    setAuthToken(null);
  };

  return { isAuthenticated, isLoading, user, authToken, login, register, logout, checkAuthStatus };
};