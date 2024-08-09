import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import TimeTracking from './components/TimeTracking';
import QuestionTracking from './components/QuestionTracking';
import IssueTracking from './components/IssueTracking';
import TimeSummary from './components/TimeSummary';
import AuthPage from './components/AuthPage';
import { useAuth } from './hooks/useAuth';

const App: React.FC = () => {
  const { isAuthenticated, isLoading, authToken, logout, checkAuthStatus } = useAuth();

  React.useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AppProvider>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/login" element={<AuthPage />} />
              <Route 
                path="/dashboard" 
                element={
                  isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
                } 
              />
              <Route 
                path="/time-tracking" 
                element={
                  isAuthenticated ? <TimeTracking /> : <Navigate to="/login" replace />
                } 
              />
              <Route 
                path="/question-tracking" 
                element={
                  isAuthenticated ? <QuestionTracking /> : <Navigate to="/login" replace />
                } 
              />
              <Route 
                path="/issue-tracking" 
                element={
                  isAuthenticated ? <IssueTracking /> : <Navigate to="/login" replace />
                } 
              />
              <Route 
                path="/time-summary" 
                element={
                  isAuthenticated ? <TimeSummary /> : <Navigate to="/login" replace />
                } 
              />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </AppProvider>
  );
};

export default App;