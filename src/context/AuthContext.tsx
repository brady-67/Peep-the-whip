import { createContext, useContext, useState, ReactNode } from 'react';

const SESSION_KEY = 'ptw_admin_authed';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

interface AuthContextValue {
  isAuthenticated: boolean;
  login: (password: string) => { error: string | null };
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === 'true'
  );

  function login(password: string) {
    if (!ADMIN_PASSWORD) {
      return { error: 'Admin password is not configured. Set VITE_ADMIN_PASSWORD in .env.' };
    }
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setIsAuthenticated(true);
      return { error: null };
    }
    return { error: 'Incorrect password.' };
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
