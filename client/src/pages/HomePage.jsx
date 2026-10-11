import React from 'react';
import { GraduationCap, Building2, ArrowRight, ShieldCheck, Search, Cpu, CheckCircle2, Terminal } from 'lucide-react';

export const HomePage = ({ onSelectService }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-5">
          <Terminal className="w-3.5 h-3.5" />
          <span>HackIIITD 2026 — Architecture & Phase 1 Implementation</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          Discover opportunities.<br />
          <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Verify every detail.
          </span><br />
          Take your next step.
        </h1>

        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          NextStep AI is an evidence-grounded web intelligence platform. We combine live-web retrieval via TinyFish, structured LLM interpretation, and non-LLM deterministic validation to protect you from outdated links and fabricated claims.
        </p>
      </div>

      {/* Dual Service Portal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Service 1: Student Opportunities */}
        <div className="glass-panel glass-panel-hover rounded-3xl p-8 flex flex-col justify-between border border-slate-800 relative group overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10 group-hover:bg-indigo-500/20 transition-all" />

          <div>
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6 shadow-inner">
              <GraduationCap className="w-7 h-7" />
            </div>

            <span className="text-[11px] font-bold tracking-wider uppercase text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
              Service 01 • Available in MVP
            </span>

            <h2 className="text-2xl font-bold text-white mt-4 mb-2">Student Opportunities</h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
              Discover engineering internships, hackathons, research fellowships, and academic scholarships tailored to your branch, graduation year, and technical skills.
            </p>

            <ul className="space-y-2 mb-8 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Verified application deadlines & direct career links</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Multi-factor transparent matching algorithm (0–100%)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Exact verbatim evidence excerpts from company portals</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onSelectService('student')}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all"
          >
            <span>Launch Student Opportunities Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Service 2: Government Schemes */}
        <div className="glass-panel glass-panel-hover rounded-3xl p-8 flex flex-col justify-between border border-slate-800 relative group overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10 group-hover:bg-emerald-500/20 transition-all" />

          <div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-inner">
              <Building2 className="w-7 h-7" />
            </div>

            <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              Service 02 • Available in MVP
            </span>

            <h2 className="text-2xl font-bold text-white mt-4 mb-2">Government Schemes</h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
              Discover official education and scholarship initiatives from Central and State ministries, evaluated against your published eligibility criteria.
            </p>

            <ul className="space-y-2 mb-8 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Deterministic 3-state evaluation (Satisfied, Unsatisfied, Unknown)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Mandatory documentation checklist for official submissions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Zero hallucinated income thresholds or dates</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onSelectService('government')}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all"
          >
            <span>Launch Government Schemes Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grounded Architecture Breakdown */}
      <div className="glass-panel rounded-3xl p-8 border border-slate-800">
        <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
          <span>The NextStep AI Evidence-Grounded Pipeline</span>
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Unlike generic chatbots that guess deadlines or scrapers that return messy unparsed text, NextStep AI combines three distinct layers:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-xs font-bold text-indigo-400 mb-1 flex items-center gap-1.5">
              <Search className="w-4 h-4" />
              <span>1. TinyFish Live Retrieval</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Navigates and scrapes live, high-authority web pages in real-time, bypassing bot blockers and rendering dynamic client-side DOMs.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-xs font-bold text-cyan-400 mb-1 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              <span>2. Structured LLM Extraction</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Interprets complex eligibility language into rigid JSON schemas, linking every single claim to an exact source quote.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-xs font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>3. Deterministic Validation</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Non-LLM code checks that quotes exist verbatim, dates are valid in ISO 8601, URLs are safe, and conflicts are explicitly flagged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
