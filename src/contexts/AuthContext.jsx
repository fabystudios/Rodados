// src/contexts/AuthContext.jsx
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
        // Generar emails más realistas según el provider
        const getProviderData = (providerName) => {
          const timestamp = Date.now().toString().slice(-4);
          
          switch (providerName.toLowerCase()) {
            case 'google':
              return {
                username: 'Juan Pérez',
                email: `juan.perez${timestamp}@gmail.com`,
                domain: 'gmail.com'
              };
            case 'facebook':
              return {
                username: 'María González',
                email: `maria.gonzalez${timestamp}@outlook.com`,
                domain: 'facebook.com'
              };
            case 'instagram':
              return {
                username: 'Carlos Rodríguez',
                email: `carlos.rodriguez${timestamp}@hotmail.com`,
                domain: 'instagram.com'
              };
            case 'twitter':
              return {
                username: 'Ana Martínez',
                email: `ana.martinez${timestamp}@yahoo.com`,
                domain: 'twitter.com'
              };
            default:
              return {
                username: `Usuario ${providerName}`,
                email: `usuario${timestamp}@${providerName}.com`,
                domain: `${providerName}.com`
              };
          }
        };

        const providerData = getProviderData(provider);
        const mockUser = {
          username: providerData.username,
          email: providerData.email,
          provider: provider,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(providerData.username)}&background=4CAF50&color=fff`
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