import React from 'react';
import './dashboard.css';

const AdminDashboard = () => {
  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-cards">
        <div className="card">
          <h2>Properties</h2>
          <button onClick={() => console.log('Properties clicked')}>Manage</button>
        </div>
        <div className="card">
          <h2>Users</h2>
          <button onClick={() => console.log('Users clicked')}>Manage</button>
        </div>
        <div className="card">
          <h2>Settings</h2>
          <button onClick={() => console.log('Settings clicked')}>Configure</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
