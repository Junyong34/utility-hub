'use client';

import React from 'react';

interface FormSectionGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function FormSectionGroup({
  children,
  className = '',
}: FormSectionGroupProps) {
  return (
    <div
      className={`rounded-lg border border-input/50 bg-gradient-to-br from-primary/2 to-transparent p-4 space-y-4 ${className}`}
    >
      {children}
    </div>
  );
}

interface FormFieldGroupProps {
  label: string;
  children: React.ReactNode;
  description?: string;
  icon?: React.ReactNode;
}

export function FormFieldGroup({
  label,
  children,
  description,
  icon,
}: FormFieldGroupProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {icon && <span className="text-primary">{icon}</span>}
        <label className="text-sm font-semibold text-foreground">{label}</label>
      </div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      {children}
    </div>
  );
}
