import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Adjust this to match your backend URL

export interface User {
  id: string;
  username: string;
  email: string;
  token: string;
}

class AuthService {
  async login(emailOrUsername: string, password: string): Promise<string> {
    const response = await axios.post(`${API_URL}/auth/login`, { emailOrUsername, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data.token;
  }

  async register(username: string, email: string, password: string): Promise<User> {
    const response = await axios.post(`${API_URL}/auth/register`, { username, email, password });
    return response.data;
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