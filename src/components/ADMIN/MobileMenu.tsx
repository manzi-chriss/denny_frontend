// MobileMenu.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
  isMenuOpen: boolean;
  menuItems: { name: string; path: string }[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isMenuOpen, menuItems }) => (
  isMenuOpen && (
    <div className="md:hidden bg-gray-900">
      {menuItems.map(item => (
        <Link key={item.name} to={item.path} className="block py-2 px-4 hover:bg-gray-700">
          {item.name}
        </Link>
      ))}
    </div>
  )
);

export default MobileMenu;
