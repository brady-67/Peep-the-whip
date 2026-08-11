import { ReactNode } from 'react';

export default function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium text-ink/60 block mb-1">{label}</label>
      {children}
    </div>
  );
}
