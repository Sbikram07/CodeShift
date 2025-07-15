import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePopup } from '../context/PopupContext';

const Register = () => {
  const [form, setform] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { register } = useAuth();
  const { showPopup } = usePopup();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { success, message } = await register(form);
    if (success) {
      showPopup('Registration Successful');
      navigate('/');
    } else {
      showPopup(message || 'Registration Failed');
      navigate('/register');
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-100 shadow-2xl shadow-gray-400">
      {/* 🔙 Back to Home button - top-left */}
      <div className="absolute top-4 left-4">
        <Button
          onClick={() => navigate('/')}
          className="text-sm text-blue-600 bg-white hover:underline hover:scale-105 transition"
        >
          ⬅ Back to Home
        </Button>
      </div>

      {/* Register form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Register
        </h2>

        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          value={form.username}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <Button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </Button>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">Already have an account?</p>
          <Button
            type="button"
            onClick={() => navigate('/login')}
            className="mt-2 bg-slate-100 text-blue-600 hover:underline hover:scale-105"
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
