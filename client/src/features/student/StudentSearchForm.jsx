import React, { useState } from 'react';
import { Search, Sparkles, MapPin, Tag, GraduationCap, Laptop } from 'lucide-react';

export const StudentSearchForm = ({ onSearch, isLoading }) => {
  const [category, setCategory] = useState('INTERNSHIP');
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState(['Node.js', 'React', 'MongoDB']);
  const [academicYear, setAcademicYear] = useState(3);
  const [location, setLocation] = useState('Bengaluru');
  const [isRemote, setIsRemote] = useState(false);

  const handleAddSkill = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && skillInput.trim()) {
      e.preventDefault();
      const trimmed = skillInput.trim().replace(/^,+|,+$/g, '');
      if (trimmed && !skills.includes(trimmed)) {
        setSkills([...skills, trimmed]);
      }
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      category,
      skills,
      academicYear: Number(academicYear),
      location,
      isRemote
    });
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-6 sm:p-8 mb-8 shadow-xl">
      <div className="flex items-center gap-2 mb-6 text-sm font-semibold text-indigo-400">
        <Sparkles className="w-4 h-4" />
        <span>Configure Opportunity Discovery Criteria</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {/* Category */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Opportunity Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
          >
            <option value="INTERNSHIP">Software & Tech Internships</option>
            <option value="HACKATHON">National & Global Hackathons</option>
            <option value="RESEARCH">Research Fellowships</option>
            <option value="SCHOLARSHIP">Merit Scholarships</option>
            <option value="ALL">All Categories</option>
          </select>
        </div>

        {/* Academic Year */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
            <span>Academic Year</span>
          </label>
          <select
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
          >
            <option value={1}>1st Year Undergraduate</option>
            <option value={2}>2nd Year Undergraduate</option>
            <option value={3}>3rd Year Undergraduate</option>
            <option value={4}>4th Year Undergraduate / Final</option>
            <option value={5}>Postgraduate / Masters</option>
          </select>
        </div>

        {/* Preferred Location */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>Preferred Location</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Bengaluru, Delhi, Mumbai"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Remote Preference */}
        <div className="flex flex-col justify-end">
          <label className="flex items-center gap-2.5 cursor-pointer p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 hover:border-slate-600 transition-colors">
            <input
              type="checkbox"
              checked={isRemote}
              onChange={(e) => setIsRemote(e.target.checked)}
              className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
            />
            <span className="flex items-center gap-1.5">
              <Laptop className="w-3.5 h-3.5 text-slate-400" />
              <span>Remote Only</span>
            </span>
          </label>
        </div>
      </div>

      {/* Skills Input & Tags */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-slate-400" />
          <span>Technical Skills & Stacks (Press Enter or Comma to add)</span>
        </label>
        <div className="p-2.5 bg-slate-900 border border-slate-700 rounded-xl flex flex-wrap items-center gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-500/15 text-indigo-300 border border-indigo-500/30"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="text-indigo-400 hover:text-white text-xs leading-none"
              >
                ×
              </button>
            </span>
          ))}
          <input
            type="text"
            placeholder="Type skill and press enter..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleAddSkill}
            className="flex-1 bg-transparent border-none text-xs text-slate-100 placeholder-slate-500 focus:outline-none min-w-[160px] px-1 py-0.5"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/20 disabled:opacity-60 transition-all"
        >
          <Search className="w-4 h-4" />
          <span>{isLoading ? 'Running Intelligence Pipeline...' : 'Discover & Validate Opportunities'}</span>
        </button>
      </div>
    </form>
  );
};
