import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TimeTracking from './components/TimeTracking';
import QuestionTracking from './components/QuestionTracking';
import IssueTracking from './components/IssueTracking';
import TimeSummary from './components/TimeSummary';
import AuthPage from './components/AuthPage';
import { useAuth } from './hooks/useAuth';

const App: React.FC = () => {
  const { isAuthenticated, checkAuthStatus } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      await checkAuthStatus();
      setIsLoading(false);
    };
    initAuth();
  }, [checkAuthStatus]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <AuthPage /> : <Navigate to="/dashboard" replace />} />
          <Route
            path="/*"
            element={
              isAuthenticated ? (
                <Layout>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/time" element={<TimeTracking />} />
                    <Route path="/questions" element={<QuestionTracking />} />
                    <Route path="/issues" element={<IssueTracking />} />
                    <Route path="/summary" element={<TimeSummary />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </AppProvider>
    </Router>
  );
};

export default App;