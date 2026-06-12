// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClassifiedPanel } from "../components/ui/ClassifiedPanel";
import { TerminalButton } from "../components/ui/TerminalButton";
import { useAuthStore } from "../store/authStore";

type LoginFormState = {
  email: string;
  password: string;
};

function getErrorMessage(err: unknown) {
  if (
    typeof err === "object" &&
    err !== null &&
    "response" in err &&
    typeof (err as any).response?.data?.message === "string"
  ) {
    return (err as any).response.data.message;
  }

  if (err instanceof Error) {
    return err.message;
  }

  return "Login failed.";
}

export function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const [form, setForm] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    setError("");
    setLoading(true);

    try {
      await login({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      navigate("/dashboard", { replace: true });
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <ClassifiedPanel title="Access Node">
        <h1 className="text-2xl font-black uppercase tracking-[0.16em] text-white">
          Agent Login
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          Resume your encrypted identity session.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-xs uppercase tracking-[0.2em] text-blackbox-cyan/70">
              Email
            </span>

            <input
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
              className="mt-2 w-full border border-blackbox-cyan/25 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-blackbox-cyan"
              autoComplete="email"
              required
            />
          </label>

          <label className="block">
            <span className="text-xs uppercase tracking-[0.2em] text-blackbox-cyan/70">
              Password
            </span>

            <input
              type="password"
              value={form.password}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  password: event.target.value,
                }))
              }
              className="mt-2 w-full border border-blackbox-cyan/25 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-blackbox-cyan"
              autoComplete="current-password"
              required
            />
          </label>

          {error ? <p className="text-sm text-blackbox-red">{error}</p> : null}

          <TerminalButton disabled={loading} className="w-full">
            {loading ? "Authenticating..." : "Open Session"}
          </TerminalButton>
        </form>

        <p className="mt-4 text-center text-xs text-slate-500">
          No identity yet?{" "}
          <Link className="text-blackbox-cyan" to="/register">
            Register Agent
          </Link>
        </p>
      </ClassifiedPanel>
    </div>
  );
}