'use client';

import React from 'react';
import { Badge } from './Badge';

export function Section({
  badge,
  title,
  right,
  children,
}: {
  badge?: { variant: 'required' | 'recommended'; label: string };
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white">
      <div className="flex items-center gap-3 border-b border-gray-200 py-3">
        {badge && <Badge variant={badge.variant}>{badge.label}</Badge>}
        <div className="text-sm font-medium text-gray-800">{title}</div>
        <div className="flex-1" />
        {right}
      </div>
      <div className="py-6">{children}</div>
    </div>
  );
}


