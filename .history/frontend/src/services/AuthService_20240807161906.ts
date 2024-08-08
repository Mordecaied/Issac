import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export interface User {
  id: string;
  username: string;
  email: string;
}

class AuthService {
  async login(emailOrUsername: string, password: string): Promise<string> {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { emailOrUsername, password });
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data.token;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Invalid credentials');
      }
      throw new Error('Network error. Please try again.');
    }
  }

  async register(username: string, email: string, password: string): Promise<User> {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, { username, email, password });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Registration failed');
      }
      throw new Error('Network error. Please try again.');
    }
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  }

  getToken(): string | null {
    const user = this.getCurrentUser();
    return user?.token || null;
  }
}

export default new AuthService();