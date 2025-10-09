// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('authUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('authUser');
      }
    }
    setLoading(false);
  }, []);

  // Guardar usuario en localStorage cuando cambie
  useEffect(() => {
    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('authUser');
    }
  }, [user]);

  const login = (userData) => {
    const userWithId = {
      ...userData,
      id: Date.now().toString(), // ID único basado en timestamp
      loginTime: new Date().toISOString(),
      provider: userData.provider || 'manual'
    };
    setUser(userWithId);
    return userWithId;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
  };

  const isAuthenticated = () => {
    return !!user;
  };

  // Simulación de login con providers sociales
  const loginWithProvider = async (provider) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          username: `Usuario ${provider}`,
          email: `user@${provider}.com`,
          provider: provider,
          avatar: `https://ui-avatars.com/api/?name=${provider}&background=4CAF50&color=fff`
        };
        const loggedUser = login(mockUser);
        resolve(loggedUser);
      }, 1500); // Simular delay de autenticación
    });
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
    loginWithProvider
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};