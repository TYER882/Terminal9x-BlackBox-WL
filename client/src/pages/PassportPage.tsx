import { FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { updatePassport } from "../api/passport";
import { AgentPassportCard } from "../components/passport/AgentPassportCard";
import { PassportMintStatus } from "../components/passport/PassportMintStatus";
import { ClassifiedPanel } from "../components/ui/ClassifiedPanel";
import { TerminalButton } from "../components/ui/TerminalButton";
import { useAuthStore } from "../store/authStore";
import type { Division } from "../types/passport";

const divisions: Division[] = ["Cipher Analyst", "Field Observer", "Interrogation Specialist", "Blackbox Intern", "Protocol Director"];

export function PassportPage() {
  const { token, passport, setPassport } = useAuthStore();
  const [codename, setCodename] = useState(passport?.codename ?? "");
  const [division, setDivision] = useState<Division>(passport?.division ?? "Cipher Analyst");
  const [avatarUrl, setAvatarUrl] = useState(passport?.avatarUrl ?? "");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  if (!token) return <Navigate to="/login" replace />;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const data = await updatePassport({ codename, division, avatarUrl });
      setPassport(data.passport);
      setMessage("Passport profile updated.");
    } catch (err: any) {
      setMessage(err?.response?.data?.message ?? "Update failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <AgentPassportCard passport={passport} />
      <div className="space-y-5">
        <ClassifiedPanel title="Identity Controls">
          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-blackbox-cyan/70">Codename</span>
              <input value={codename} onChange={(e) => setCodename(e.target.value)} className="mt-2 w-full border border-blackbox-cyan/25 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-blackbox-cyan" />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-blackbox-cyan/70">Division</span>
              <select value={division} onChange={(e) => setDivision(e.target.value as Division)} className="mt-2 w-full border border-blackbox-cyan/25 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-blackbox-cyan">
                {divisions.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-blackbox-cyan/70">Avatar URL</span>
              <input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://..." className="mt-2 w-full border border-blackbox-cyan/25 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-blackbox-cyan" />
            </label>
            {message ? <p className="text-xs text-blackbox-green">{message}</p> : null}
            <TerminalButton disabled={saving}>{saving ? "Saving..." : "Save Identity"}</TerminalButton>
          </form>
        </ClassifiedPanel>
        <PassportMintStatus passport={passport} />
      </div>
    </div>
  );
}
