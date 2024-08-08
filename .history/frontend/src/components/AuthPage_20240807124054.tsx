import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import { useAuth } from '../hooks/useAuth';

const AuthPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const { login, register } = useAuth();

  const handleLoginSuccess = async (emailOrUsername: string, password: string) => {
    try {
      await login(emailOrUsername, password);
      // Login successful, no need to do anything else as useAuth will update the isAuthenticated state
    } catch (error) {
      console.error('Login failed:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleRegistrationSuccess = async (username: string, email: string, password: string) => {
    try {
      await register(username, email, password);
      // Registration successful, no need to do anything else as useAuth will update the isAuthenticated state
    } catch (error) {
      console.error('Registration failed:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isRegistering ? 'Create an account' : 'Log in to your account'}
        </h2>
        {isRegistering ? (
          <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />
        ) : (
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        )}
        <div className="text-center">
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {isRegistering ? 'Already have an account? Log in' : 'Need an account? Register'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;