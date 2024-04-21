import { create } from "zustand";

export type userType = {
  userName?: string;
  displayName?: string;
  password?: string;
  pk?: string;
};

type Store = {
  isLoading: boolean;
  isAuthenticated: boolean;
  user?: userType;
  setUser: (userData: userType) => void;
};

const useAuthStore = create<Store>()((set) => ({
  isLoading: true,
  isAuthenticated: false,
  user: {} as userType,
  setUser: (userData) => {
    set((state) => ({
      user: userData,
      isAuthenticated: true,
      isLoading: false,
    }));
  },
}));

export { useAuthStore };
