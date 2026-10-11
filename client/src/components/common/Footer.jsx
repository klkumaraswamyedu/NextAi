import React from 'react';
import { ShieldCheck, Cpu, Terminal } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 mt-20 py-10 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-semibold text-slate-300">NextStep AI — Web Intelligence & Evidence Validation</p>
          <p className="mt-1 text-slate-500 text-[11px]">
            HackIIITD 2026 Engineering Architecture | TinyFish + LLM + Deterministic Validation
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Deterministic Verification Engine</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-indigo-400" />
            <span>Modular Monolith Pipeline</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Phase 1 Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
