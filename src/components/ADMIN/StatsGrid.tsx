// StatsGrid.tsx
import React from 'react';

interface StatsItem {
  title: string;
  value: string;
  icon: string;
}

interface StatsGridProps {
  statsItems: StatsItem[];
}

const StatsGrid: React.FC<StatsGridProps> = ({ statsItems }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {statsItems.map(({ title, value, icon }) => (
      <div key={title} className="bg-gray-700 p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <i className={`fas ${icon} text-2xl text-blue-400`}></i>
        </div>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    ))}
  </div>
);

export default StatsGrid;
