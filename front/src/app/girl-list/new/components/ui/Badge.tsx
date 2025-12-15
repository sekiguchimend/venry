'use client';

import React from 'react';

type BadgeVariant = 'required' | 'recommended';

const styles: Record<BadgeVariant, string> = {
  required: 'bg-red-100 text-red-500',
  recommended: 'bg-orange-100 text-orange-500',
};

export function Badge({ variant, children }: { variant: BadgeVariant; children: React.ReactNode }) {
  return (
    <span className={`px-2 py-0.5 text-xs rounded ${styles[variant]} flex-shrink-0`}>
      {children}
    </span>
  );
}


