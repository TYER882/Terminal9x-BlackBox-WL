import { create } from "zustand";
import type { User } from "../types/auth";
import type { AgentPassport } from "../types/passport";
import { fetchMe, loginAgent, registerAgent } from "../api/auth";

const TOKEN_KEY = "cold-inbox-token";

type AuthState = {
  token: string | null;
  user: User | null;
  passport: AgentPassport | null;
  loading: boolean;
  setSession: (token: string, user: User, passport: AgentPassport) => void;
  setPassport: (passport: AgentPassport) => void;
  bootstrap: () => Promise<void>;
  register: (payload: { username: string; email: string; password: string; division?: any; referralCode?: string }) => Promise<void>;
  login: (payload: { email: string; password: string }) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem(TOKEN_KEY),
  user: null,
  passport: null,
  loading: false,
  setSession: (token, user, passport) => {
    localStorage.setItem(TOKEN_KEY, token);
    set({ token, user, passport });
  },
  setPassport: (passport) => set({ passport }),
  bootstrap: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return;
    set({ loading: true });
    try {
      const data = await fetchMe();
      set({ token, user: data.user, passport: data.passport });
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      set({ token: null, user: null, passport: null });
    } finally {
      set({ loading: false });
    }
  },
  register: async (payload) => {
    const data = await registerAgent(payload);
    localStorage.setItem(TOKEN_KEY, data.token);
    set({ token: data.token, user: data.user, passport: data.passport });
  },
  login: async (payload) => {
    const data = await loginAgent(payload);
    localStorage.setItem(TOKEN_KEY, data.token);
    set({ token: data.token, user: data.user, passport: data.passport });
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    set({ token: null, user: null, passport: null });
  },
}));
