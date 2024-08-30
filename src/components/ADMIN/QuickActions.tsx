// QuickActions.tsx
import React, { useState } from 'react'; // Import useState
import { Link } from 'react-router-dom';
import Upload_new_link from '../Upload_new_link';// Ensure the import path is correct

const QuickActions: React.FC = () => {
  const [showUpload, setShowUpload] = useState(false); // Moved state here

  const toggleUpload = () => {
    setShowUpload((prev) => !prev);
  };

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-lg mb-8">
      <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
      <button
        onClick={toggleUpload}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      >
        {showUpload ? 'Hide Upload New Link' : 'Upload New Link'}
      </button>

      {showUpload && <Upload_new_link />}

      <div className="flex flex-wrap gap-4">
       
        <Link to="/add-product" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-300">
          Upload New Image
        </Link>
        <Link to="/" className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded transition duration-300">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;
