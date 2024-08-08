import React, { useState } from 'react';
import { useAppContext } from '../AppContext';

const IssueTracking: React.FC = () => {
  const { issues, addIssue, updateIssue } = useAppContext();
  const [newIssue, setNewIssue] = useState('');

  const handleAddIssue = () => {
    if (newIssue.trim() !== '') {
      addIssue({ 
        id: Date.now(), 
        text: newIssue, 
        status: 'open'
      });
      setNewIssue('');
    }
  };

  const handleUpdateStatus = (id: number, status: 'open' | 'in progress' | 'resolved') => {
    const issue = issues.find(i => i.id === id);
    if (issue) {
      updateIssue({ ...issue, status });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Issue Tracking</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newIssue}
          onChange={(e) => setNewIssue(e.target.value)}
          placeholder="Describe the issue"
          className="w-full p-2 mb-2 border rounded"
        />
        <button 
          onClick={handleAddIssue}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Issue
        </button>
      </div>
      <ul className="space-y-4">
        {issues.map((issue) => (
          <li key={issue.id} className="border-b pb-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold">{issue.text}</p>
              <select
                value={issue.status}
                onChange={(e) => handleUpdateStatus(issue.id, e.target.value as 'open' | 'in progress' | 'resolved')}
                className="border rounded p-1"
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