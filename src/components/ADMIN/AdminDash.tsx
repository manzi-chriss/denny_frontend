import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import MobileMenu from './MobileMenu';
import StatsGrid from './StatsGrid';
import QuickActions from './QuickActions';
import RecentActivity from './RecentActivity';
import Messages from './Messages';
import ImageUploader from './ImageUploader';
import { FaSignOutAlt } from 'react-icons/fa';

interface DashboardMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
}

function AdminDash() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messages, setMessages] = useState<DashboardMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Users', path: '/users' },
    { name: 'Orders', path: '/orders' },
    { name: 'Products', path: '/products' },
    { name: 'Settings', path: '/settings' },
  ];

  const statsItems = [
    { title: 'Visitors', value: '64', icon: 'fa-users' },
    { title: 'Pictures', value: '312', icon: 'fa-image' },
    { title: 'Services', value: '5', icon: 'fa-cogs' },
    { title: 'Links', value: '2', icon: 'fa-link' },
  ];

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://denny-backend.onrender.com/message/us');
        setMessages(response.data); // Directly set the response data as messages
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Failed to fetch messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://denny-backend.onrender.com/message/us/${id}`);
      setMessages(messages.filter((message) => message._id !== id));
    } catch (err) {
      console.error('Error deleting message:', err);
      setError('Failed to delete message');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('react_project_1234'); // Remove JWT from localStorage
    window.location.href = '/login'; // Redirect to the login page
  };

  return (
    <div className="min-h-screen bg-gray-800 text-gray-100">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} menuItems={menuItems} />
      <MobileMenu isMenuOpen={isMenuOpen} menuItems={menuItems} />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>
          <button onClick={handleLogout} className="text-white text-2xl">
            <FaSignOutAlt />
          </button>
        </div>
        <StatsGrid statsItems={statsItems} />
        <QuickActions />
        <RecentActivity />
        <Messages messages={messages} loading={loading} error={error} handleDelete={handleDelete} />
      </main>
      <ImageUploader />
    </div>
  );
}

export default AdminDash;
