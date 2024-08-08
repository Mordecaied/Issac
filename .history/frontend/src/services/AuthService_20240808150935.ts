import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class AuthService {
  async login(emailOrUsername: string, password: string) {
    console.log('AuthService login attempt:', emailOrUsername);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { emailOrUsername, password });
      console.log('AuthService login response:', response.data);
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      console.error('AuthService login error:', error);
      throw error;
    }
  }

  async register(username: string, email: string, password: string) {
    console.log('AuthService register attempt:', username, email);
    try {
      const response = await axios.post(`${API_URL}/auth/register`, { username, email, password });
      console.log('AuthService register response:', response.data);
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      console.error('AuthService register error:', error);
      throw error;
    }
  }

  logout() {
    console.log('AuthService logout');
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      console.log('Current user found in localStorage');
      return JSON.parse(userStr);
    }
    console.log('No current user in localStorage');
    return null;
  }

  getToken() {
    const user = this.getCurrentUser();
    return user?.token;
  }
}

const authService = new AuthService();
export default authService;