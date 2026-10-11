import React, { useState } from 'react';
import { Calendar, MapPin, ExternalLink, Bookmark, Check, Shield, Info, ArrowUpRight } from 'lucide-react';
import { VerificationBadge } from '../../components/common/VerificationBadge';
import { api } from '../../services/api';

export const OpportunityCard = ({ opportunity, onInspectEvidence }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (isSaved) return;
    setIsSaving(true);
    try {
      await api.saveOpportunity(opportunity.id, opportunity);
      setIsSaved(true);
    } catch (err) {
      console.error('Failed to save opportunity:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const score = opportunity.relevanceScore || 0;
  const getScoreColor = (sc) => {
    if (sc >= 85) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (sc >= 70) return 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10';
    return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
  };

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-6 relative flex flex-col justify-between border border-slate-800">
      <div>
        {/* Top Meta: Category + Score + Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {opportunity.category}
            </span>
            <VerificationBadge status={opportunity.verificationStatus} />
          </div>

          {/* Relevance Score Badge */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${getScoreColor(score)}`}
            title="Composite score based on Eligibility, Skills, Relevance, Location & Deadline"
          >
            <span>Match:</span>
            <span className="font-mono text-sm">{score}%</span>
          </div>
        </div>

        {/* Title & Organization */}
        <h3 className="text-base font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">
          {opportunity.title}
        </h3>
        <p className="text-xs font-semibold text-slate-400 mt-0.5 mb-4">{opportunity.organization}</p>

        {/* Location & Deadline Pill Row */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-4">
          <span className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{opportunity.location}</span>
          </span>

          <span className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
            <span>Deadline: {opportunity.deadlineRaw || 'Rolling / Unspecified'}</span>
          </span>
        </div>

        {/* Eligibility Criteria Highlight */}
        {opportunity.eligibility && opportunity.eligibility.length > 0 && (
          <div className="mb-4 bg-slate-950/50 rounded-xl p-3 border border-slate-850">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block mb-1.5">
              Verified Eligibility Requirement
            </span>
            <ul className="space-y-1">
              {opportunity.eligibility.slice(0, 2).map((el, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  <span>{el.criteria}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {opportunity.skills?.map((sk, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
            >
              {sk}
            </span>
          ))}
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => onInspectEvidence(opportunity)}
          className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 py-1"
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
            title={isSaved ? 'Saved in bookmarks' : 'Bookmark this opportunity'}
          >
            {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>

          <a
            href={opportunity.applicationUrl || opportunity.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all"
          >
            <span>Apply Now</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
