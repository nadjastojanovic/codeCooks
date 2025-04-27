import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          setUser(null);
          setIsAuthenticated(false);
          return;
        }
        const data = await res.json();
        setUser(data); // ✅ data itself is the user object
        setIsAuthenticated(!!data.id); // ✅ check if user has an id
      } catch (err) {
        console.error("Auth check failed", err);
        setUser(null);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
