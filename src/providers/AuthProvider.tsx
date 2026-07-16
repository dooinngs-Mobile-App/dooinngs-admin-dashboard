"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import Cookies from "js-cookie";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  type AuthUser,
  type VerifyOtpResponse,
} from "@/api/client";

// TODO: replace with real API credentials when backend is ready
const STATIC_CREDENTIALS = {
  email: "admin@dooinngs.com",
  password: "simplepassword", // Updated password
  name: "Super Admin",
};

const USER_COOKIE = "auth_user";

type User = AuthUser | { email: string; name: string };

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  setSessionUser: (response: VerifyOtpResponse) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = Cookies.get(USER_COOKIE);
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading] = useState(false);

  async function login(
    email: string,
    password: string,
  ): Promise<string | null> {
    // TODO: replace with real API call
    if (
      email === STATIC_CREDENTIALS.email &&
      password === STATIC_CREDENTIALS.password
    ) {
      const u = {
        email: STATIC_CREDENTIALS.email,
        name: STATIC_CREDENTIALS.name,
      };
      setUser(u);
      Cookies.set(USER_COOKIE, JSON.stringify(u));
      return null; // no error
    }
    return "Invalid email or password.";
  }

  function setSessionUser(response: VerifyOtpResponse) {
    const { user: authUser, token_details } = response;
    setUser(authUser);
    Cookies.set(USER_COOKIE, JSON.stringify(authUser));
    Cookies.set(ACCESS_TOKEN_COOKIE, token_details.access, {
      expires: new Date(token_details.access_token_expiry),
    });
    Cookies.set(REFRESH_TOKEN_COOKIE, token_details.refresh);
  }

  function logout() {
    setUser(null);
    Cookies.remove(USER_COOKIE);
    Cookies.remove(ACCESS_TOKEN_COOKIE);
    Cookies.remove(REFRESH_TOKEN_COOKIE);
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, setSessionUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
