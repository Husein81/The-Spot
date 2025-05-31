// Global imports
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

// Local imports
import type { User } from "../types";

interface DecodedToken {
  exp: number; // UNIX timestamp
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isReady: boolean;
  setAuth: (data: { user: User; token: string }) => void;
  clearAuth: () => Promise<void>;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isReady: false,
  setIsReady: (isReady: boolean) => set({ isReady }),
  setAuth: (data) => {
    if (data.token) {
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("authUser", JSON.stringify(data.user));
      set({ user: data.user, token: data.token });
    }
  },

  clearAuth: async () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
  },

  loadUser: async () => {
    const token = localStorage.getItem("authToken");
    try {
      if (token) {
        const decoded = jwtDecode<DecodedToken>(token);
        const now = Date.now() / 1000;

        if (decoded.exp && decoded.exp < now) {
          // Token expired
          localStorage.removeItem("authToken");
          localStorage.removeItem("authUser");
          set({ user: null, token: null });
        }

        const userJson = localStorage.getItem("authUser");
        if (userJson) {
          set({ user: JSON.parse(userJson), token });
        }
      }
      set({ isReady: true });
    } catch {
      // Malformed token
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      set({ user: null, token: null });
    }
  },
}));
