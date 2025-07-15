import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePopup } from "../context/PopupContext";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { showPopup } = usePopup();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { success, message } = await login(form);
    if (success) {
      showPopup("Logged in successfully");
      navigate("/chat");
    } else {
      showPopup(message);
      window.location.reload();
    }

    setLoading(false);
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      
      {/* ⬅ Back to Home Button - Top Left */}
      <div className="absolute top-4 left-4">
        <Button
          onClick={() => navigate('/')}
          className="text-sm text-blue-600 bg-white hover:underline hover:scale-105 transition"
        >
          ⬅ Back to Home
        </Button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-sm"
      >
        <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">
          Login to Code Shifter
        </h2>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>

        {/* Register Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">Don’t have an account?</p>
          <Button
            type="button"
            onClick={() => navigate('/register')}
            className="mt-2 text-blue-600 hover:underline font-medium"
            variant="link"
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
