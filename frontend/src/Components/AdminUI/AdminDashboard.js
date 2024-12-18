import React from "react";
import MyChart from './MyChart';
import Bars from './Bars';

const AdminDashboard = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <h1>Dashboard</h1>
      
      <MyChart />
      
      {/* Adding a title or phrase with margin */}
      <h2 style={{ marginTop: '100px', marginBottom: '20px' }}>
        Sales Overview for the Last 7 Months
      </h2>
      
      <Bars />
    </div>
  );
};

export default AdminDashboard;
