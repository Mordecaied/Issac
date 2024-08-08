import React, { useState } from 'react';
import { useAppContext, Issue, Timer } from '../context/AppContext';

const IssueTracking: React.FC = () => {
  const { issues, addIssue, updateIssue, timers } = useAppContext();
  const [newIssue, setNewIssue] = useState('');
  const [selectedTimerId, setSelectedTimerId] = useState<string>('');

  const handleAddIssue = () => {
    if (newIssue.trim() !== '' && selectedTimerId !== '') {
      addIssue({ 
        id: Date.now(), 
        timerId: parseInt(selectedTimerId, 10),
        text: newIssue, 
        status: 'open'
      });
      setNewIssue('');
      setSelectedTimerId('');
    }
  };

  const handleUpdateStatus = (id: number, status: 'open' | 'in progress' | 'resolved') => {
    const issue = issues.find((i: Issue) => i.id === id);
    if (issue) {
      updateIssue({ ...issue, status });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800 border-red-300';
      case 'in progress': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Issue Tracking</h2>
      <div className="mb-4">
        <select
          value={selectedTimerId}
          onChange={(e) => setSelectedTimerId(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        >
          <option value="">Select a timer</option>
          {timers.map((timer: Timer) => (
            <option key={timer.id} value={timer.id.toString()}>{timer.projectName}</option>
          ))}
        </select>
        <input
          type="text"
          value={newIssue}
          onChange={(e) => setNewIssue(e.target.value)}
          placeholder="Describe the issue"
          className="w-full p-2 mb-2 border rounded"
        />
        <button 
          onClick={handleAddIssue}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-150"
          disabled={!selectedTimerId || newIssue.trim() === ''}
        >
          Add Issue
        </button>
      </div>
      <ul className="space-y-4">
        {issues.map((issue: Issue) => (
          <li key={issue.id} className="border-b pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{issue.text}</p>
                <p className="text-sm text-gray-500">
                  Timer: {timers.find((t: Timer) => t.id === issue.timerId)?.projectName || 'Unknown'}
                </p>
              </div>
              <select
                value={issue.status}
                onChange={(e) => handleUpdateStatus(issue.id, e.target.value as 'open' | 'in progress' | 'resolved')}
                className={`border rounded p-1 ${getStatusColor(issue.status)}`}
              >
                <option value="open">Open</option>
                <option value="in progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IssueTracking;