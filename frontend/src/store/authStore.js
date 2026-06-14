// Frontend store for authentication state
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../api/axios';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Initialize auth from localStorage
      initializeAuth: async () => {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            set({ isLoading: true });
            const response = await api.get('/auth/me');
            set({
              user: response.data.user,
              token,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch (error) {
            localStorage.removeItem('token');
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
              error: error.message,
            });
          }
        }
      },

      // Login
      login: async (email, password) => {
        try {
          set({ isLoading: true, error: null });
          const response = await api.post('/auth/login', { email, password });
          const { token, user } = response.data;
          localStorage.setItem('token', token);
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
          return { success: true };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Login failed';
          set({
            isLoading: false,
            error: errorMessage,
          });
          return { success: false, error: errorMessage };
        }
      },

      // Logout
      logout: () => {
        localStorage.removeItem('token');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      // Register
      register: async (email, password, name) => {
        try {
          set({ isLoading: true, error: null });
          const response = await api.post('/auth/register', {
            email,
            password,
            name,
          });
          const { token, user } = response.data;
          localStorage.setItem('token', token);
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
          return { success: true };
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Registration failed';
          set({
            isLoading: false,
            error: errorMessage,
          });
          return { success: false, error: errorMessage };
        }
      },

      // Update user
      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export default useAuthStore;
