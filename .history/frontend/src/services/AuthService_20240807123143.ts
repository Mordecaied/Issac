import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:5000/api'; // Make sure this matches your backend port

export interface User {
  _id: string;
  username: string;
  email: string;
}

interface ErrorResponse {
  message: string;
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
      this.handleError(error, 'Registration error:');
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
      this.handleError(error, 'Login error:');
    }
  }

  private handleError(error: unknown, prefix: string): never {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ErrorResponse>;
      if (serverError && serverError.response) {
        console.error(prefix, serverError.response.data);
        throw new Error(serverError.response.data.message);
      }
    }
    console.error(prefix, error);
    throw new Error('An unexpected error occurred');
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