import React from 'react';
import { CheckCircle2, AlertCircle, HelpCircle, AlertTriangle, Clock } from 'lucide-react';

export const VerificationBadge = ({ status, size = 'sm' }) => {
  const configs = {
    VERIFIED: {
      label: 'Verified by Source',
      bgColor: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
      icon: CheckCircle2
    },
    UNVERIFIED: {
      label: 'Unverified Claim',
      bgColor: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
      icon: AlertCircle
    },
    CONFLICTING: {
      label: 'Conflicting Sources',
      bgColor: 'bg-rose-500/15 border-rose-500/30 text-rose-400',
      icon: AlertTriangle
    },
    UNKNOWN: {
      label: 'Not Published / Unknown',
      bgColor: 'bg-slate-500/15 border-slate-500/30 text-slate-400',
      icon: HelpCircle
    },
    STALE: {
      label: 'Potentially Stale',
      bgColor: 'bg-orange-500/15 border-orange-500/30 text-orange-400',
      icon: Clock
    }
  };

  const config = configs[status] || configs.UNKNOWN;
  const Icon = config.icon;
  const sizeClasses = size === 'xs' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${config.bgColor} ${sizeClasses}`}
      title={`Deterministic State: ${status}`}
    >
      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
      <span>{config.label}</span>
    </span>
  );
};
