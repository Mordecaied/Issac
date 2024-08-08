import React from 'react';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [projects] = useState(['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5']);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">History</h2>
          <ul>
            {projects.map((project, index) => (
              <li key={index} className="mb-2">
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  {project}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Current Sessions</h1>
        {children}
      </div>
    </div>
  );
};

export default Layout;