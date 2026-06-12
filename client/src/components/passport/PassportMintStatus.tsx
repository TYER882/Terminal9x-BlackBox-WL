import { ClassifiedPanel } from "../ui/ClassifiedPanel";
import type { AgentPassport } from "../../types/passport";

export function PassportMintStatus({ passport }: { passport: AgentPassport | null }) {
  if (!passport) return null;

  return (
    <ClassifiedPanel title="Mint Status">
      <div className="space-y-3 text-sm">
        <div className="flex justify-between border-b border-white/10 pb-2">
          <span className="text-slate-400">Free mint</span>
          <span className={passport.freeMintEligible ? "text-blackbox-green" : "text-slate-400"}>
            {passport.freeMintEligible ? "Reserved" : "Used"}
          </span>
        </div>
        <div className="flex justify-between border-b border-white/10 pb-2">
          <span className="text-slate-400">Passport</span>
          <span className={passport.passportMinted ? "text-blackbox-green" : "text-blackbox-cyan"}>
            {passport.passportMinted ? "Minted" : "Coming Soon"}
          </span>
        </div>
        {passport.passportMinted ? (
          <div className="rounded border border-blackbox-cyan/20 bg-black/30 p-3 text-xs text-slate-300">
            <p>Token ID: {passport.passportTokenId}</p>
            <p className="break-all">TX: {passport.passportTxHash}</p>
          </div>
        ) : (
          <p className="rounded border border-blackbox-cyan/20 bg-black/30 p-3 text-xs text-slate-400">
            Free Mint Reserved. Wallet mint module will be activated in the next clearance phase.
          </p>
        )}
      </div>
    </ClassifiedPanel>
  );
}
