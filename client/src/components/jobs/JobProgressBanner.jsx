import React from 'react';
import { Loader2, CheckCircle2, AlertTriangle, AlertOctagon, Terminal } from 'lucide-react';

export const JobProgressBanner = ({ status, progress, currentStage, isDevelopmentMode = true }) => {
  if (!status) return null;

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6 shadow-lg shadow-black/20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          {status === 'RUNNING' && <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />}
          {status === 'COMPLETED' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          {status === 'PARTIAL' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
          {status === 'FAILED' && <AlertOctagon className="w-4 h-4 text-rose-400" />}

          <span className="text-xs font-semibold text-slate-200">
            Search Pipeline State: <span className="text-indigo-400">{status}</span>
          </span>

          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            Stage: {currentStage || 'PROCESSING'}
          </span>
        </div>

        {isDevelopmentMode && (
          <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
            <Terminal className="w-3 h-3" />
            <span>Development Fixtures Mode</span>
          </span>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ease-out ${
            status === 'FAILED'
              ? 'bg-rose-500'
              : status === 'COMPLETED'
              ? 'bg-emerald-500'
              : 'bg-gradient-to-r from-indigo-500 to-cyan-400'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
