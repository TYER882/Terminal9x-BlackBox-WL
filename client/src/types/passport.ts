export type Division =
  | "Cipher Analyst"
  | "Field Observer"
  | "Interrogation Specialist"
  | "Blackbox Intern"
  | "Protocol Director";

export type AgentPassport = {
  _id: string;
  userId: string;
  codename: string;
  division: Division;
  rank: string;
  xp: number;
  casesClosed: number;
  badgesCollected: number;
  avatarUrl?: string;
  avatarId?: string;
  clearanceLevel: string;
  freeMintEligible: boolean;
  whitelistStatus?: "reserved" | "approved" | "waitlisted";
  whitelistCode?: string;
  whitelistJoinedAt?: string;
  waitlistPriority?: number;
  referralCode?: string;
  referredByCode?: string;
  referredByPassportId?: string;
  referralCount?: number;
  referralPoints?: number;
  inviteSource?: "none" | "agent" | "campaign" | "admin";
  passportMinted: boolean;
  passportTokenId?: string;
  passportTxHash?: string;
  mintedAt?: string;
  createdAt: string;
  updatedAt: string;
};
