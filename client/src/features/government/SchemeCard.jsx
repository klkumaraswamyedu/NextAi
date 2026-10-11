import React, { useState } from 'react';
import { Building2, Calendar, FileText, CheckCircle2, HelpCircle, XCircle, ExternalLink, Bookmark, Check, Shield, ArrowUpRight } from 'lucide-react';
import { VerificationBadge } from '../../components/common/VerificationBadge';
import { api } from '../../services/api';

export const SchemeCard = ({ scheme, onInspectEvidence }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (isSaved) return;
    setIsSaving(true);
    try {
      await api.saveScheme(scheme.id, scheme);
      setIsSaved(true);
    } catch (err) {
      console.error('Failed to save scheme:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const renderRuleStatus = (status) => {
    switch (status) {
      case 'SATISFIED':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" />
            <span>Satisfied</span>
          </span>
        );
      case 'NOT_SATISFIED':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
            <XCircle className="w-3 h-3" />
            <span>Not Satisfied</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            <HelpCircle className="w-3 h-3" />
            <span>Confirmation Required</span>
          </span>
        );
    }
  };

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-6 relative flex flex-col justify-between border border-slate-800">
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {scheme.state}
            </span>
            <VerificationBadge status={scheme.verificationStatus} />
          </div>

          <span className="text-xs text-slate-400 flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>Deadline: {scheme.deadlineRaw || 'Rolling Scheme'}</span>
          </span>
        </div>

        {/* Scheme Name & Department */}
        <h3 className="text-base font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
          {scheme.name}
        </h3>
        <p className="text-xs font-semibold text-slate-400 mt-0.5 mb-4 flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-slate-500" />
          <span>{scheme.department}</span>
        </p>

        {/* 3-State Eligibility Rules Breakdown */}
        <div className="mb-5 bg-slate-950/60 rounded-xl p-4 border border-slate-850">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] uppercase tracking-wider font-bold text-slate-300">
              Rule-Based Eligibility Evaluation
            </span>
            <span className="text-[10px] text-slate-400 italic">
              Deterministic 3-State Assessment
            </span>
          </div>

          <div className="space-y-2">
            {scheme.eligibilityRules?.map((rule, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800"
              >
                <span className="text-xs text-slate-300">{rule.description}</span>
                <div className="flex-shrink-0">{renderRuleStatus(rule.status)}</div>
              </div>
            ))}
          </div>

          {scheme.assessmentSummary && (
            <p className="mt-3 text-[11px] text-slate-400 italic border-t border-slate-800/80 pt-2">
              Note: {scheme.assessmentSummary}
            </p>
          )}
        </div>

        {/* Required Documents Checklist */}
        {scheme.requiredDocuments && scheme.requiredDocuments.length > 0 && (
          <div className="mb-5">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1.5 mb-2">
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Mandatory Documentation Checklist</span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {scheme.requiredDocuments.map((doc, idx) => (
                <div
                  key={idx}
                  className="text-xs text-slate-300 bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-800 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span className="truncate">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Application Instructions */}
        {scheme.applicationInstructions && (
          <div className="mb-5 p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 leading-relaxed">
            <span className="font-semibold text-slate-300 block mb-0.5">Application Procedure:</span>
            {scheme.applicationInstructions}
          </div>
        )}
      </div>

      {/* Card Action Buttons */}
      <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => onInspectEvidence(scheme)}
          className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 py-1"
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Inspect Provenance & Evidence</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={isSaving || isSaved}
            className={`p-2 rounded-xl border text-xs flex items-center gap-1 transition-all ${
              isSaved
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white'
            }`}
            title={isSaved ? 'Saved in bookmarks' : 'Bookmark this scheme'}
          >
            {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>

          <a
            href={scheme.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
          >
            <span>Official Portal</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
