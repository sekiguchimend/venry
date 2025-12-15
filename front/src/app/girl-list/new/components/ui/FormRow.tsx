'use client';

import React from 'react';

export function FormRow({
  label,
  hint,
  children,
}: {
  label: React.ReactNode;
  hint?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[240px_1fr] gap-6 items-start py-3">
      <div className="text-sm text-gray-700 leading-6">
        <div>{label}</div>
        {hint && <div className="text-xs text-gray-500 mt-1">{hint}</div>}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}


