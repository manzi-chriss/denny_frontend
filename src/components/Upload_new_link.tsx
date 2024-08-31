import { useState } from 'react';
import Axios from 'axios';

function Upload_new_link() {
  const [link, setLink] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(link);
    console.log(description);
    Axios.post('https://denny-backend.onrender.com/upload', { description, filePath: link })
      .then((response) => {
        setResponseMessage(response.data.message);
        setLink('');
        setDescription('');
      })
      .catch((error) => {
        console.error(error);
        setResponseMessage('An error occurred. Please try again.');
      });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="link" className="block text-white mb-2">
            Link
          </label>
          <input
            type="url"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
            className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-white mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3} // Changed from "3" to {3}
            placeholder="Enter a description"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Upload
        </button>
      </form>
      {responseMessage && (
        <div className="mt-4 text-white">
          {responseMessage}
        </div>
      )}
    </div>
  );
}

export default Upload_new_link;
