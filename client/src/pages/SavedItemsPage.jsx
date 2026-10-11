import React, { useEffect, useState } from 'react';
import { Bookmark, GraduationCap, Building2, Trash2, ArrowLeft, ExternalLink, Shield } from 'lucide-react';
import { api } from '../services/api';
import { VerificationBadge } from '../components/common/VerificationBadge';
import { EvidenceDrawer } from '../components/evidence/EvidenceDrawer';

export const SavedItemsPage = ({ onBackToHome }) => {
  const [savedOpportunities, setSavedOpportunities] = useState([]);
  const [savedSchemes, setSavedSchemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemType, setItemType] = useState('opportunity');

  useEffect(() => {
    let isMounted = true;
    Promise.all([api.getSavedOpportunities(), api.getSavedSchemes()])
      .then(([oppsRes, schemesRes]) => {
        if (!isMounted) return;
        setSavedOpportunities(oppsRes?.data?.savedOpportunities || []);
        setSavedSchemes(schemesRes?.data?.savedSchemes || []);
      })
      .catch((err) => {
        console.error('Error fetching saved items:', err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => { isMounted = false; };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
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
              <Bookmark className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-bold text-white">Saved Opportunities & Schemes</h1>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="py-20 text-center text-xs text-slate-500">Loading your saved items...</div>
      ) : savedOpportunities.length === 0 && savedSchemes.length === 0 ? (
        <div className="text-center py-20 p-8 rounded-2xl bg-slate-900/40 border border-slate-800">
          <Bookmark className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-300">No saved items found</h3>
          <p className="text-xs text-slate-500 mt-1">
            Bookmark opportunities or government schemes during your search to access them here anytime.
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Saved Opportunities Section */}
          {savedOpportunities.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                <span>Saved Student Opportunities ({savedOpportunities.length})</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedOpportunities.map((item) => {
                  const opp = item.itemSnapshot;
                  return (
                    <div key={item._id || item.itemId} className="glass-panel rounded-2xl p-5 border border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          {opp.category}
                        </span>
                        <VerificationBadge status={opp.verificationStatus} size="xs" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-100">{opp.title}</h3>
                      <p className="text-xs text-slate-400 mb-3">{opp.organization}</p>
                      <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                        <button
                          onClick={() => {
                            setSelectedItem(opp);
                            setItemType('opportunity');
                          }}
                          className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 text-[11px] font-medium"
                        >
                          <Shield className="w-3 h-3" />
                          <span>View Evidence</span>
                        </button>
                        <a
                          href={opp.applicationUrl || opp.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-300 hover:text-white flex items-center gap-1 text-[11px]"
                        >
                          <span>Apply</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Saved Schemes Section */}
          {savedSchemes.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-400" />
                <span>Saved Government Schemes ({savedSchemes.length})</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedSchemes.map((item) => {
                  const scheme = item.itemSnapshot;
                  return (
                    <div key={item._id || item.itemId} className="glass-panel rounded-2xl p-5 border border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {scheme.state}
                        </span>
                        <VerificationBadge status={scheme.verificationStatus} size="xs" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-100">{scheme.name}</h3>
                      <p className="text-xs text-slate-400 mb-3">{scheme.department}</p>
                      <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                        <button
                          onClick={() => {
                            setSelectedItem(scheme);
                            setItemType('scheme');
                          }}
                          className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 text-[11px] font-medium"
                        >
                          <Shield className="w-3 h-3" />
                          <span>View Evidence</span>
                        </button>
                        <a
                          href={scheme.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-300 hover:text-white flex items-center gap-1 text-[11px]"
                        >
                          <span>Portal</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Evidence Drawer */}
      <EvidenceDrawer
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        item={selectedItem}
        type={itemType}
      />
    </div>
  );
};
