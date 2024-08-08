import React, { useState } from 'react';

interface Issue {
  id: number;
  title: string;
  description: string;
  status: 'open' | 'in progress' | 'resolved';
}

const IssueTracking: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [newIssue, setNewIssue] = useState({ title: '', description: '' });

  const handleAddIssue = () => {
    if (newIssue.title.trim() !== '' && newIssue.description.trim() !== '') {
      setIssues([...issues, { ...newIssue, id: Date.now(), status: 'open' }]);
      setNewIssue({ title: '', description: '' });
    }
  };

  const handleUpdateStatus = (id: number, status: 'open' | 'in progress' | 'resolved') => {
    setIssues(issues.map(issue => issue.id === id ? { ...issue, status } : issue));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Issue Tracking</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newIssue.title}
          onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
          placeholder="Issue Title"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          value={newIssue.description}
          onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
          placeholder="Issue Description"
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
            <h3 className="text-xl font-semibold">{issue.title}</h3>
            <p className="text-gray-600 mb-2">{issue.description}</p>
            <div className="flex items-center">
              <span className="mr-2">Status:</span>
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