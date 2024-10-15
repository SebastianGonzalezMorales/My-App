import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) setUserToken(token);
      } catch (error) {
        console.error('Error loading token:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadToken();
  }, []);

  const login = async (token) => {
    try {
      await AsyncStorage.setItem('token', token);
      setUserToken(token);
    } catch (error) {
      console.log("hola")
      console.error('Error during login:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setUserToken(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
