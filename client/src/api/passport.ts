import { api } from "./client";
import type { User } from "../types/auth";
import type { AgentPassport, Division } from "../types/passport";

export async function getPassport() {
  const { data } = await api.get<{ passport: AgentPassport }>("/passport/me");
  return data.passport;
}

export async function updatePassport(payload: {
  codename?: string;
  division?: Division;
  avatarUrl?: string;
  avatarId?: string;
  walletAddress?: string;
}) {
  const { data } = await api.put<{ user: User; passport: AgentPassport }>("/passport/me", payload);
  return data;
}

export async function markPassportMinted(payload: { tokenId: string; txHash: string; walletAddress: string }) {
  const { data } = await api.post<{ passport: AgentPassport }>("/passport/mark-minted", payload);
  return data.passport;
}
