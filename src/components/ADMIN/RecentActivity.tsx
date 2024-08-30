// RecentActivity.js
import React from 'react';

const RecentActivity = () => (
  <div className="bg-gray-700 p-6 rounded-lg shadow-lg mb-8">
    <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
    <ul className="space-y-2">
      {['New user registered', 'Order #1234 placed', 'Product stock updated', 'New comment received'].map((activity, index) => (
        <li key={index} className="flex items-center">
          <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
          {activity}
        </li>
      ))}
    </ul>
  </div>
);

export default RecentActivity;
