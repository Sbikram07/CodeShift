import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { _id, username, email }
  const [loading, setLoading] = useState(true);
  const isLogin = !!user;

  // Get profile on app load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/auth/me', {
          method: 'POST',
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Failed to fetch user');

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Auth check failed:", err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const login = async (form) => {
    try {
      const res = await fetch('http://localhost:3000/api/auth/sign-in', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error('Login error:', err.message);
      return { success: false, message: 'Something went wrong during login.' };
    }
  };

  const register = async (form) => {
    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error('Registration error:', err.message);
      return { success: false, message: 'Something went wrong during registration.' };
    }
  };

const logout = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/auth/logout', {
      method:'POST',
      credentials: 'include',
    });

    if (res.ok) {
      setUser(null);
      return { success: true };
    } else {
      const data = await res.json();
      return { success: false, message: data.message || 'Logout failed' };
    }
  } catch (err) {
    console.error('Logout error:', err.message);
    return { success: false, message: 'Something went wrong' };
  }
};


  return (
    <AuthContext.Provider value={{ user, isLogin, loading, login, logout, register}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
