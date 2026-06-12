// src/api/auth.ts
import { api } from "./client";
import type { AuthResponse } from "../types/auth";
import type { Division } from "../types/passport";

export type RegisterAgentPayload = {
  username: string;
  email: string;
  password: string;
  division?: Division;
  referralCode?: string;
};

export type LoginAgentPayload = {
  email: string;
  password: string;
};

export async function registerAgent(payload: RegisterAgentPayload) {
  const { data } = await api.post<AuthResponse>("/auth/register", payload);
  return data;
}

export async function loginAgent(payload: LoginAgentPayload) {
  const { data } = await api.post<AuthResponse>("/auth/login", payload);
  return data;
}

export async function fetchMe() {
  const { data } = await api.get<Omit<AuthResponse, "token">>("/auth/me");
  return data;
}