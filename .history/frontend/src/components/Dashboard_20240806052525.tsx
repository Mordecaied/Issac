import React from 'react';
import TimeTracker from './TimeTracker';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <TimeTracker />
      {/* Add more dashboard-specific content here */}
    </div>
  );
};

export default Dashboard;