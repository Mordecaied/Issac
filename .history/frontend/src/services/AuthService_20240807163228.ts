import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:5000/api';

export interface User {
  _id: string;
  username: string;
  email: string;
}

interface ErrorResponse {
  message: string;
  errors?: string[];
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
      throw this.handleError(error);
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
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ErrorResponse>;
      if (serverError && serverError.response) {
        const errorMessage = serverError.response.data.message || serverError.response.data.errors?.[0] || 'An unexpected error occurred';
        return new Error(errorMessage);
      }
    }
    return new Error('An unexpected error occurred');
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