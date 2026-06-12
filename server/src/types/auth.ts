export type AuthUser = {
  id: string;
  email?: string;
  agentId?: string;
  role?: "agent" | "master";
};

export type AuthRequest = {
  user?: AuthUser;
  body: any;
  headers: {
    authorization?: string;
    [key: string]: string | string[] | undefined;
  };
  params?: Record<string, string>;
  query?: Record<string, unknown>;
  [key: string]: any;
};

export type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (body?: unknown) => ApiResponse;
  send?: (body?: unknown) => ApiResponse;
  [key: string]: any;
};

export type ApiNext = (error?: unknown) => void;