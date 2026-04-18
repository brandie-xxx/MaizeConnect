/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User as AppUser, MOCK_USER } from '../services';

interface AuthContextType {
  user: AppUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, handle: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking session
    const savedUser = localStorage.getItem('exxcrypt_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Force Obsidian tier for the developer
    const newUser: AppUser = { 
      ...MOCK_USER, 
      email,
      tier: 'Obsidian',
      streak: 26 
    };
    setUser(newUser);
    localStorage.setItem('exxcrypt_user', JSON.stringify(newUser));
  };

  const register = async (email: string, _password: string, handle: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Force Obsidian tier for the developer
    const newUser: AppUser = { 
      ...MOCK_USER, 
      email, 
      handle, 
      tier: 'Obsidian',
      streak: 26
    };
    setUser(newUser);
    localStorage.setItem('exxcrypt_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('exxcrypt_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
