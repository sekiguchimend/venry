'use client';

import React from 'react';

export function TextInput({
  value,
  onChange,
  placeholder,
  maxLength,
  showCount,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
  showCount?: boolean;
}) {
  return (
    <div className="relative w-full max-w-[520px]">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500"
      />
      {showCount && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
          {value.length}/{maxLength ?? '∞'}
        </span>
      )}
    </div>
  );
}

export function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 bg-white"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

export function Textarea({
  value,
  onChange,
  placeholder,
  maxLength,
  heightClassName = 'h-48',
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
  heightClassName?: string;
}) {
  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full ${heightClassName} px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 resize-none bg-white`}
      />
      <span className="absolute right-3 bottom-3 text-xs text-gray-400">
        {value.length}/{maxLength ?? '∞'}
      </span>
    </div>
  );
}


