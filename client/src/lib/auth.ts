import { LoginData, SignupData, User } from "@shared/schema";
import { apiRequest } from "./queryClient";

const TOKEN_KEY = "auth_token";

export const authApi = {
  login: async (data: LoginData) => {
    const response = await apiRequest("POST", "/api/v1/auth/login", data);
    const result = await response.json();
    if (result.success) {
      localStorage.setItem(TOKEN_KEY, result.token);
    }
    return result;
  },

  signup: async (data: SignupData) => {
    const response = await apiRequest("POST", "/api/v1/auth/signup", data);
    const result = await response.json();
    if (result.success) {
      localStorage.setItem(TOKEN_KEY, result.token);
    }
    return result;
  },

  googleLogin: async (googleData: { googleId: string; email: string; name: string }) => {
    const response = await apiRequest("POST", "/api/v1/auth/loginGoogle", googleData);
    const result = await response.json();
    if (result.success) {
      localStorage.setItem(TOKEN_KEY, result.token);
    }
    return result;
  },

  logout: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      try {
        await apiRequest("POST", "/api/v1/auth/logout", {});
      } catch (error) {
        // Continue with logout even if API call fails
      }
    }
    localStorage.removeItem(TOKEN_KEY);
  },

  getCurrentUser: async (): Promise<{ user: User } | null> => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;

    try {
      const response = await fetch("/api/v1/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        localStorage.removeItem(TOKEN_KEY);
        return null;
      }

      const result = await response.json();
      return result.success ? result : null;
    } catch (error) {
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }
  },

  getToken: () => localStorage.getItem(TOKEN_KEY),

  isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY),
};
