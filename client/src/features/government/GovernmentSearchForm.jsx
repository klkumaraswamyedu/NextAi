import React, { useState } from 'react';
import { Search, Building2, MapPin, GraduationCap, IndianRupee } from 'lucide-react';

export const GovernmentSearchForm = ({ onSearch, isLoading }) => {
  const [educationLevel, setEducationLevel] = useState('UNDERGRADUATE');
  const [state, setState] = useState('All India');
  const [category, setCategory] = useState('MERIT_CUM_MEANS');
  const [familyIncome, setFamilyIncome] = useState('250000');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      educationLevel,
      state,
      category,
      familyIncome: familyIncome ? Number(familyIncome) : undefined
    });
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-6 sm:p-8 mb-8 shadow-xl">
      <div className="flex items-center gap-2 mb-6 text-sm font-semibold text-emerald-400">
        <Building2 className="w-4 h-4" />
        <span>Configure Government Scheme Discovery & Eligibility Criteria</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Education Tier */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
            <span>Target Education Tier</span>
          </label>
          <select
            value={educationLevel}
            onChange={(e) => setEducationLevel(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
          >
            <option value="UNDERGRADUATE">Undergraduate / College</option>
            <option value="POSTGRADUATE">Postgraduate / Masters</option>
            <option value="DOCTORAL">Doctoral / Ph.D.</option>
            <option value="SCHOOL">Higher Secondary / Class XI-XII</option>
            <option value="ALL">All Levels</option>
          </select>
        </div>

        {/* State */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>Geographic / State Applicability</span>
          </label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
          >
            <option value="All India">All India / Central Ministry</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Delhi">Delhi (NCT)</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
          </select>
        </div>

        {/* Scheme Category */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Scheme Beneficiary Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
          >
            <option value="MERIT_CUM_MEANS">Merit-cum-Means Scholarships</option>
            <option value="POST_MATRIC">Post-Matric Higher Education</option>
            <option value="CENTRAL_SECTOR">Central Sector Higher Education</option>
            <option value="GIRL_CHILD">STEM & Girl Child Incentives</option>
          </select>
        </div>

        {/* Family Income */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <IndianRupee className="w-3.5 h-3.5 text-slate-400" />
            <span>Annual Family Income (INR)</span>
          </label>
          <input
            type="number"
            placeholder="e.g. 250000"
            value={familyIncome}
            onChange={(e) => setFamilyIncome(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 disabled:opacity-60 transition-all"
        >
          <Search className="w-4 h-4" />
          <span>{isLoading ? 'Scanning Official Portals...' : 'Discover & Assess Government Schemes'}</span>
        </button>
      </div>
    </form>
  );
};
