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
    <div>
      <h2>Issue Tracking</h2>
      <input
        type="text"
        value={newIssue.title}
        onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
        placeholder="Issue Title"
      />
      <input
        type="text"
        value={newIssue.description}
        onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
        placeholder="Issue Description"
      />
      <button onClick={handleAddIssue}>Add Issue</button>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            <h3>{issue.title}</h3>
            <p>{issue.description}</p>
            <p>Status: {issue.status}</p>
            <select
              value={issue.status}
              onChange={(e) => handleUpdateStatus(issue.id, e.target.value as 'open' | 'in progress' | 'resolved')}
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

export default IssueTracking;
