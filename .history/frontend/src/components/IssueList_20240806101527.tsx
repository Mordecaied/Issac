import React, { useState } from 'react';
import { useAppContext, Issue } from '../context/AppContext';

const IssueList: React.FC<{ timerId: number }> = ({ timerId }) => {
  const { issues, addIssue, updateIssue } = useAppContext();
  const [newIssue, setNewIssue] = useState('');

  const timerIssues = issues.filter((i: Issue) => i.timerId === timerId);

  const handleAddIssue = () => {
    if (newIssue.trim() !== '') {
      addIssue({
        id: Date.now(),
        timerId,
        text: newIssue,
        status: 'open'
      });
      setNewIssue('');
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 mt-4">Issues</h3>
      <input
        type="text"
        value={newIssue}
        onChange={(e) => setNewIssue(e.target.value)}
        placeholder="New Issue"
        className="w-full p-2 mb-2 border rounded"
      />
      <button
        onClick={handleAddIssue}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Add Issue
      </button>
      <ul className="space-y-2">
        {timerIssues.map((issue: Issue) => (
          <li key={issue.id} className="flex items-center justify-between">
            <span>{issue.text}</span>
            <select
              value={issue.status}
              onChange={(e) => updateIssue({ ...issue, status: e.target.value as 'open' | 'in progress' | 'resolved' })}
              className="ml-2 p-1 border rounded"
            >
              <option value="open">Open</option>
              <option value="in progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IssueList;