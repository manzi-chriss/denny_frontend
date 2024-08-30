// Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  menuItems: { name: string; path: string }[];
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen, menuItems }) => (
  <header className="bg-gray-900 shadow-lg">
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
      </button>
      <nav className="hidden md:block">
        {menuItems.map(item => (
          <Link key={item.name} to={item.path} className="ml-4 hover:text-blue-400 transition-colors">
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  </header>
);

export default Header;
