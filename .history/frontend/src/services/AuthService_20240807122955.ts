import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Make sure this matches your backend port

export interface User {
  _id: string;
  username: string;
  email: string;
}

class AuthService {
  async register(username: string, email: string, password: string): Promise<{ user: User; token: string }> {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, { username, email, password });
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  }

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  getCurrentUser(): { user: User; token: string } | null {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  }

  getToken(): string | null {
    const user = this.getCurrentUser();
    return user?.token || null;
  }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;