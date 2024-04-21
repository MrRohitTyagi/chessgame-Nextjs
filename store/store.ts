import { create } from "zustand";

export type userType = {
  userName?: string;
  displayName?: string;
  password?: string;
  pk?: string;
  isSearching?: boolean;
  picture?: string;
};

type Store = {
  isLoading: boolean;
  isAuthenticated: boolean;
  user?: userType;
  setUser: (userData: userType) => void;
  tokenNotfound: () => void;
};

const useAuthStore = create<Store>()((set) => ({
  isAuthenticated: false,
  isLoading: true,
  user: {} as userType,

  tokenNotfound: () => {
    set((state) => ({
      user: {},
      isAuthenticated: false,
      isLoading: false,
    }));
  },
  setUser: (userData) => {
    set((state) => ({
      user: userData,
      isAuthenticated: true,
      isLoading: false,
    }));
  },
}));

export { useAuthStore };
