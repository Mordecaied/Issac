import React, { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TimeTracking from './components/TimeTracking';
import QuestionTracking from './components/QuestionTracking';
import IssueTracking from './components/IssueTracking';
import TimeSummary from './components/TimeSummary';
import AuthService from './services/AuthService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await AuthService.login(username, password);
      setIsAuthenticated(true);
      setError('');
    } catch (err) {
      setError('Failed to log in');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await AuthService.register(username, email, password);
      setIsAuthenticated(true);
      setError('');
    } catch (err) {
      setError('Failed to register');
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'time':
        return <TimeTracking />;
      case 'questions':
        return <QuestionTracking />;
      case 'issues':
        return <IssueTracking />;
      case 'summary':
        return <TimeSummary />;
      default:
        return null;
    }
  };

  const renderAuthForm = () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isRegistering ? 'Create an account' : 'Log in to your account'}
          </h2>
          <form className="mt-8 space-y-6" onSubmit={isRegistering ? handleRegister : handleLogin}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              {isRegistering && (
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              )}
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isRegistering ? 'Register' : 'Log in'}
              </button>
            </div>
          </form>
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

  if (!isAuthenticated) {
    return renderAuthForm();
  }

  return (
    <AppProvider>
      <Layout>
        <div className="mb-6">
          <div className="flex space-x-4 mb-4">
            <button
              className={`px-4 py-2 rounded transition duration-150 ${activeTab === 'dashboard' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400'}`}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={`px-4 py-2 rounded transition duration-150 ${activeTab === 'time' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400'}`}
              onClick={() => setActiveTab('time')}
            >
              Time Tracking
            </button>
            <button
              className={`px-4 py-2 rounded transition duration-150 ${activeTab === 'questions' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400'}`}
              onClick={() => setActiveTab('questions')}
            >
              Question Tracking
            </button>
            <button
              className={`px-4 py-2 rounded transition duration-150 ${activeTab === 'issues' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400'}`}
              onClick={() => setActiveTab('issues')}
            >
              Issue Tracking
            </button>
            <button
              className={`px-4 py-2 rounded transition duration-150 ${activeTab === 'summary' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400'}`}
              onClick={() => setActiveTab('summary')}
            >
              Time Summary
            </button>
            <button
              className="px-4 py-2 rounded transition duration-150 bg-red-500 text-white hover:bg-red-600 active:bg-red-700"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
        {renderContent()}
      </Layout>
    </AppProvider>
  );
};

export default App;