import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User } from "@shared/schema";
import { authApi } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  googleLogin: (googleData: { googleId: string; email: string; name: string }) => Promise<void>;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const result = await authApi.getCurrentUser();
      setUser(result?.user || null);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await authApi.login({ email, password });
      if (result.success) {
        setUser(result.user);
      } else {
        throw new Error(result.message || "Login failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await authApi.signup({ name, email, password });
      if (result.success) {
        setUser(result.user);
      } else {
        throw new Error(result.message || "Signup failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = async (googleData: { googleId: string; email: string; name: string }) => {
    setIsLoading(true);
    try {
      const result = await authApi.googleLogin(googleData);
      if (result.success) {
        setUser(result.user);
      } else {
        throw new Error(result.message || "Google login failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authApi.logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const refetchUser = async () => {
    await fetchUser();
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    googleLogin,
    logout,
    refetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
