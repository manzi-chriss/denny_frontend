// src/components/Layout.tsx
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <div className={`min-h-screen  dark:bg-gray-900 dark:text-white bg-white text-gray-800`}>
      {children}
    </div>
  );
}

export default Layout;