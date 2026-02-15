import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

/* =======================
   Types
======================= */

interface User {
  id: string;
  name: string;
  email: string;
}

/* =======================
   Context Type
======================= */

interface AuthContextType {
  user: User;
  isAuthenticated: boolean;
}

/* =======================
   Context
======================= */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* =======================
   Provider
======================= */

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>({
    id: 'guest',
    name: 'Guest User',
    email: 'guest@chatbot.ai'
  });

  useEffect(() => {
    // Optional token for backend compatibility
    localStorage.setItem('token', 'guest-token');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: true
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* =======================
   Hook
======================= */

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
