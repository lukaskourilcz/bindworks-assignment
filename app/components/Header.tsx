"use client";

import { Sparkles } from "lucide-react";

interface HeaderProps {
  onSignOut: () => void;
}

export function Header({ onSignOut }: HeaderProps) {
  return (
    <header className="mb-6 space-y-2 text-center">
      <div className="flex justify-end">
        <button
          onClick={onSignOut}
          className="text-xs text-muted-foreground hover:text-white transition-colors"
        >
          Sign Out
        </button>
      </div>
      <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-white/5 mb-4 border border-white/5 ring-1 ring-white/10 shadow-lg">
        <Sparkles className="w-6 h-6 text-violet-400" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/60">
          TaskMaster
        </span>
      </h1>
      <p className="text-sm text-muted-foreground font-medium">
        Productivity reimagined.
      </p>
    </header>
  );
}