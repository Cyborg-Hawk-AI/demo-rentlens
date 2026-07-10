"use client";

import { useState, useRef, useEffect } from "react";
import { Info } from "lucide-react";

interface DevNoteProps {
  title: string;
  children: React.ReactNode;
}

export function DevNote({ title, children }: DevNoteProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="relative inline-flex" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-500/20 text-brand-400 transition hover:bg-brand-500/30"
        aria-label={`DEV NOTE: ${title}`}
        title="DEV NOTE"
      >
        <Info className="h-3 w-3" />
      </button>
      {open && (
        <div className="absolute left-0 top-7 z-50 w-72 rounded-lg border border-brand-500/30 bg-surface-800 p-3 text-xs shadow-card">
          <p className="mb-1 font-semibold text-brand-400">DEV NOTE — {title}</p>
          <p className="leading-relaxed text-slate-300">{children}</p>
        </div>
      )}
    </div>
  );
}
