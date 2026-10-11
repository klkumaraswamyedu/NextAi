import React, { useState } from 'react';
import { StudentSearchForm } from '../features/student/StudentSearchForm';
import { OpportunityCard } from '../features/student/OpportunityCard';
import { EvidenceDrawer } from '../components/evidence/EvidenceDrawer';
import { JobProgressBanner } from '../components/jobs/JobProgressBanner';
import { api } from '../services/api';
import { GraduationCap, AlertCircle, ArrowLeft } from 'lucide-react';

export const StudentOpportunitiesPage = ({ onBackToHome }) => {
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobState, setJobState] = useState(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (filters) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      // 1. Submit search request
      const startRes = await api.searchOpportunities(filters);
      const jobId = startRes.data.jobId;

      setJobState({
        jobId,
        status: 'RUNNING',
        progress: 40,
        currentStage: 'SEARCHING_CAREER_PORTALS',
        isDevelopmentMode: true
      });

      // 2. Poll/Retrieve job results
      const resultsRes = await api.getStudentResults(jobId);
      const jobData = resultsRes.data;

      setJobState({
        jobId,
        status: jobData.status,
        progress: jobData.progress || 100,
        currentStage: jobData.currentStage || 'COMPLETED',
        isDevelopmentMode: true
      });

      setOpportunities(jobData.opportunities || []);
    } catch (err) {
      console.error('Opportunity search error:', err);
      setError(err.message || 'Failed to complete opportunity search');
      setJobState((prev) => (prev ? { ...prev, status: 'FAILED', progress: 100 } : null));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-indigo-400 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Service Selection</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-bold text-white">Student Opportunities Intelligence</h1>
          </div>
        </div>

        <span className="text-xs font-medium px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 self-start sm:self-auto">
          Phase 1: Development Fixtures & Schemas
        </span>
      </div>

      {/* Search Filter Form */}
      <StudentSearchForm onSearch={handleSearch} isLoading={isLoading} />

      {/* Job Progress Banner */}
      {jobState && (
        <JobProgressBanner
          status={jobState.status}
          progress={jobState.progress}
          currentStage={jobState.currentStage}
          isDevelopmentMode={jobState.isDevelopmentMode}
        />
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2 mb-6">
          <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Results Grid */}
      {opportunities.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-200">
              Discovered Opportunities ({opportunities.length})
            </h2>
            <span className="text-xs text-slate-400">
              Ranked by Multi-Factor Relevance
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                onInspectEvidence={(item) => setSelectedOpportunity(item)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State after search */}
      {hasSearched && !isLoading && opportunities.length === 0 && !error && (
        <div className="text-center py-16 p-8 rounded-2xl bg-slate-900/40 border border-slate-800">
          <GraduationCap className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-300">No opportunities matched your exact criteria</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try broadening your skills or choosing "All Categories" to see available opportunities.
          </p>
        </div>
      )}

      {/* Evidence Inspection Drawer */}
      <EvidenceDrawer
        isOpen={!!selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
        item={selectedOpportunity}
        type="opportunity"
      />
    </div>
  );
};
