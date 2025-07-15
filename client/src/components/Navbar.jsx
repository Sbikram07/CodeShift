import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar = ({ onProfileClick, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isChatPage = location.pathname === '/chat';

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4">
      {/* Mobile: Center logo */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Logo and Title */}
        <div className="flex justify-center md:justify-start items-center gap-3 text-xl font-bold text-blue-600">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-10 w-auto object-contain animate-spin"
          />
          <h1 className="text-center">CodeShift</h1>
        </div>

        {/* Button Group */}
        <div className="flex justify-center md:justify-end gap-3 flex-wrap">
          <Button
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
            onClick={() => navigate('/')}
          >
            Home
          </Button>

          {isChatPage ? (
            <>
              <Button
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                onClick={onProfileClick}
              >
                Profile
              </Button>
              <Button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                onClick={onLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                onClick={() => navigate('/Register')}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
