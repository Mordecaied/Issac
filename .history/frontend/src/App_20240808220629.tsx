import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <AppProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                ISSAC2
              </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <Routes>
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/register" element={<RegistrationForm />} />
                  <Route 
                    path="/dashboard" 
                    element={
                      <PrivateRoute>
                        <Dashboard />
                      </PrivateRoute>
                    } 
                  />
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </div>
            </div>
          </div>
        </Router>
      </AuthProvider>
    </AppProvider>
  );
};

export default App;