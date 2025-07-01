import api from '../utils/axios';
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isCheckingAuth: false,

  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await api.post("/auth/signup", credentials);
      if (response?.data?.user) {
        set({ user: response.data.user, isSigningUp: false });
        toast.success("Account created successfully");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Signup failed";
      toast.error(message);
      set({ isSigningUp: false, user: null });
    }
  },

  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await api.post("/auth/login", credentials);
      if (response?.data?.user) {
        set({ user: response.data.user, isLoggingIn: false });
        toast.success("Logged in successfully");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Login failed";
      set({ isLoggingIn: false, user: null });
      toast.error(message);
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await api.post("/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Logout failed";
      set({ isLoggingOut: false });
      toast.error(message);
    }
  },

  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await api.get("/auth/authCheck");
      if (response?.data?.user) {
        set({ user: response.data.user, isCheckingAuth: false });
      } else {
        set({ isCheckingAuth: false, user: null });
      }
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
      // Don't show error toast for auth check as it's a common operation
      console.error("Auth check failed:", error.message);
    }
  },
}));

export default useAuthStore;