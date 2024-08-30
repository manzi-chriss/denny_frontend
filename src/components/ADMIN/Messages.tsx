// Messages.tsx
import React from 'react';

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
}

interface MessagesProps {
  messages: Message[];
  loading: boolean;
  error: string | null;
  handleDelete: (id: string) => void;
}

const Messages: React.FC<MessagesProps> = ({ messages, loading, error, handleDelete }) => (
  <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
    <h3 className="text-xl font-semibold mb-4">Messages</h3>
    {loading ? (
      <p>Loading messages...</p>
    ) : error ? (
      <p className="text-red-500">{error}</p>
    ) : (
      <ul className="space-y-2">
        {messages.map(({ _id, name, email, message }) => (
          <li key={_id} className="flex items-center justify-between">
            <div className="flex-1">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              <div>
                <p className="text-white">{message}</p>
                <span className="text-gray-400 text-sm">{name} ({email})</span>
              </div>
            </div>
            <button
              onClick={() => handleDelete(_id)}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded transition duration-300"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default Messages;
