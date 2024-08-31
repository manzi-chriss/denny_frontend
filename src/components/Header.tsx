import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CircleLoader } from 'react-spinners';
import { AiOutlineMessage } from 'react-icons/ai';
import axios from 'axios';
import Logo from '../assets/Logo.png';
import './Header.css';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMessageFormOpen, setIsMessageFormOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [serverMessage, setServerMessage] = useState<string>('');
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location]);

  const toggleMenu = (): void => setIsOpen(!isOpen);
  const toggleMessageForm = (): void => setIsMessageFormOpen(!isMessageFormOpen);

  const getLinkClass = (path: string): string => {
    return `hover:text-red-500 ${location.pathname === path ? 'text-red-500 font-bold' : ''}`;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { id, value } = e.target;
    setFormData(prevState => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setServerMessage('');
    try {
      const response = await axios.post('https://denny-backend.onrender.com/message/us', formData);
      console.log('Message sent:', response.data);
      setServerMessage(response.data.message || 'Message sent successfully!');
      setIsMessageFormOpen(false);
      setFormData({ name: '', email: '', message: '' });
      showPopupMessage();
    } catch (error) {
      console.error('Error sending message:', error);
      if (axios.isAxiosError(error) && error.response) {
        setServerMessage(error.response.data.message || 'An error occurred while sending the message.');
      } else {
        setServerMessage('An unexpected error occurred.');
      }
      showPopupMessage();
    }
  };

  const showPopupMessage = (): void => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 5000);
  };

  return (
    <>
      <motion.header 
        className="bg-gray-800 text-white shadow-md relative z-10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div 
            className="text-lg font-bold"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link to="/">
              <img src={Logo} alt="Logo" style={{ height: '60px', width: 'auto' }} />
            </Link>
          </motion.div>
          <motion.nav 
            className="hidden md:flex space-x-4 items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          >
            {['/', '/about', '/Portfolio'].map((path) => (
              <motion.div 
                key={path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Link to={path} className={getLinkClass(path)}>
                  {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                </Link>
              </motion.div>
            ))}
            <motion.button
              onClick={toggleMessageForm}
              className="ml-4 focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AiOutlineMessage size={24} />
            </motion.button>
          </motion.nav>
          <motion.div 
            className="md:hidden flex items-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <button onClick={toggleMessageForm} className="mr-4 focus:outline-none">
              <AiOutlineMessage size={24} />
            </button>
            <button onClick={toggleMenu} className="focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </motion.div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="md:hidden bg-gray-800 text-white"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <nav className="flex flex-col space-y-2 px-4 pb-4">
                {['/', '/about','/portfolio'].map((path) => (
                  <motion.div 
                    key={path}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      to={path} 
                      className={getLinkClass(path)} 
                      onClick={() => setIsOpen(false)}
                    >
                      {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="fixed inset-0 bg-black opacity-20 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <CircleLoader color="#FFFFFF" size={60} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMessageFormOpen && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-md"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <h2 className="text-lg font-bold mb-4">Message Us</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-700 text-white"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-700 text-white"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block mb-1">Message</label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-700 text-white"
                    placeholder="Enter your message"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Send
                  </button>
                  <button
                    type="button"
                    onClick={toggleMessageForm}
                    className="ml-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded shadow-lg"
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 20 }}
            transition={{ duration: 0.5 }}
          >
            <p>{serverMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
