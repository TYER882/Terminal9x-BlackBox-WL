//src/types/auth.ts
import type { AgentPassport } from "./passport";

export type User = {
  _id: string;
  email: string;
  username: string;
  walletAddress?: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthResponse = {
  token: string;
  user: User;
  passport: AgentPassport;
};
