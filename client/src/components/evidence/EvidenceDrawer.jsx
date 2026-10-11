import React from 'react';
import { X, ExternalLink, ShieldCheck, Quote, AlertCircle } from 'lucide-react';
import { VerificationBadge } from '../common/VerificationBadge';

export const EvidenceDrawer = ({ isOpen, onClose, item, type = 'opportunity' }) => {
  if (!isOpen || !item) return null;

  const isOpportunity = type === 'opportunity';
  const title = isOpportunity ? item.title : item.name;
  const organization = isOpportunity ? item.organization : item.department;
  const sourceUrl = isOpportunity ? item.sourceUrl : item.officialUrl;
  const evidenceList = item.evidence || [];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm flex justify-end transition-opacity">
      <div className="w-full max-w-xl bg-slate-900 border-l border-slate-800 h-full overflow-y-auto p-6 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  Evidence & Provenance
                </span>
                <VerificationBadge status={item.verificationStatus} />
              </div>
              <h2 className="text-lg font-bold text-slate-100">{title}</h2>
              <p className="text-sm text-slate-400 mt-0.5">{organization}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Primary Source URL */}
          <div className="mt-4 p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
            <div className="truncate mr-3">
              <span className="text-xs text-slate-400 block mb-0.5">Primary Retrieved Source URL</span>
              <span className="text-xs font-mono text-indigo-300 truncate block">{sourceUrl}</span>
            </div>
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded flex items-center gap-1 flex-shrink-0 transition-colors"
            >
              <span>Visit</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Development Fixture Warning Notice */}
          {item.isDevelopmentFixture && (
            <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-start gap-2 text-xs text-amber-300">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">Development Mode Fixture:</span>
                This opportunity is rendered from development test fixtures conforming to the Zod schema. Live TinyFish web crawling and LLM extraction will replace this in future phases.
              </div>
            </div>
          )}

          {/* Verbatim Excerpts */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-1.5 mb-3">
              <Quote className="w-4 h-4 text-indigo-400" />
              <span>Verbatim Source Evidence Excerpts</span>
            </h3>

            {evidenceList.length === 0 ? (
              <p className="text-xs text-slate-500 italic p-4 bg-slate-950/40 rounded border border-slate-800">
                No granular claim excerpts captured for this record.
              </p>
            ) : (
              <div className="space-y-3">
                {evidenceList.map((ev, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-indigo-300 uppercase tracking-wider text-[11px]">
                        Field: {ev.field}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium ${
                          ev.isVerified
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        <ShieldCheck className="w-3 h-3" />
                        {ev.isVerified ? 'Substring Match Confirmed' : 'Extrapolated / Unverified'}
                      </span>
                    </div>
                    <blockquote className="text-xs text-slate-300 italic border-l-2 border-indigo-500/50 pl-2.5 py-0.5 font-serif leading-relaxed">
                      "{ev.excerpt}"
                    </blockquote>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Matching Rationale */}
          {item.explanation && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-200 mb-2">Recommendation Rationale</h3>
              <div className="p-3 bg-indigo-950/30 border border-indigo-900/40 rounded-lg text-xs text-slate-300 leading-relaxed">
                {item.explanation}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between mt-6">
          <span>Deterministic Audit ID: {item.id}</span>
          <span>NextStep AI v1.0.0</span>
        </div>
      </div>
    </div>
  );
};
