import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import TimeTracking from './components/TimeTracking';
import QuestionTracking from './components/QuestionTracking';
import IssueTracking from './components/IssueTracking';
import TimeSummary from './components/TimeSummary';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/time-tracking" element={<TimeTracking />} />
            <Route path="/question-tracking" element={<QuestionTracking />} />
            <Route path="/issue-tracking" element={<IssueTracking />} />
            <Route path="/time-summary" element={<TimeSummary />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
};

export default App;