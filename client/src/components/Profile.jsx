import React from 'react';

const Profile = ({user,onClose,onLogout}) => {
   if (!user) return null; 
  return (
    <div className="fixed top-0 right-0 h-full w-72 bg-white shadow-2xl p-6 z-50 transition-transform duration-300">
      {/* Close button */}
      <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl" onClick={onClose}>&times;</button>

      <h2 className="text-xl font-bold mb-6 text-blue-600">User Profile</h2>

      <div className="mb-4">
        <p className="text-sm text-gray-600">Name:</p>
        <p className="text-lg font-semibold">{user.username}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">Email:</p>
        <p className="text-lg font-semibold">{user.email}</p>
      </div>

      <button
      
        className="mt-8 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
