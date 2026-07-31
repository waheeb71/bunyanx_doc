'use client';

import React from 'react';
import { Info, AlertTriangle, AlertOctagon, CheckCircle2 } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'danger' | 'success';
  title?: string;
  children: React.ReactNode;
}

export const Callout: React.FC<CalloutProps> = ({ type = 'info', title, children }) => {
  const styles = {
    info: {
      border: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-200',
      icon: Info,
      iconColor: 'text-cyan-400',
    },
    warning: {
      border: 'border-amber-500/40 bg-amber-950/20 text-amber-200',
      icon: AlertTriangle,
      iconColor: 'text-amber-400',
    },
    danger: {
      border: 'border-rose-500/40 bg-rose-950/20 text-rose-200',
      icon: AlertOctagon,
      iconColor: 'text-rose-400',
    },
    success: {
      border: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-200',
      icon: CheckCircle2,
      iconColor: 'text-emerald-400',
    },
  }[type];

  const Icon = styles.icon;

  return (
    <div className={`my-6 p-4 rounded-xl border ${styles.border} backdrop-blur-md space-y-2`}>
      <div className="flex items-center gap-2 font-bold text-sm">
        <Icon className={`w-4 h-4 ${styles.iconColor}`} />
        {title && <span>{title}</span>}
      </div>
      <div className="text-xs leading-relaxed opacity-90">{children}</div>
    </div>
  );
};
