"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// TODO: replace with real API credentials when backend is ready
const STATIC_CREDENTIALS = {
  email: "admin@dooinngs.com",
  password: "Admin@123",
  name: "Super Admin",
};

type User = {
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("auth_user");
    if (stored) setUser(JSON.parse(stored));
    setIsLoading(false);
  }, []);

  async function login(email: string, password: string): Promise<string | null> {
    // TODO: replace with real API call
    if (email === STATIC_CREDENTIALS.email && password === STATIC_CREDENTIALS.password) {
      const u = { email: STATIC_CREDENTIALS.email, name: STATIC_CREDENTIALS.name };
      setUser(u);
      localStorage.setItem("auth_user", JSON.stringify(u));
      return null; // no error
    }
    return "Invalid email or password.";
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("auth_user");
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
