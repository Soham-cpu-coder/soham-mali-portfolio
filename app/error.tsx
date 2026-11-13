"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected errors
    console.error("Runtime exception:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 text-center">
      <div className="max-w-md space-y-6 glass-panel rounded-2xl p-8 border border-rose-500/30 shadow-2xl">
        <div className="h-16 w-16 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-rose-400 uppercase tracking-widest">
            System Interrupted
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            An Unexpected Exception Occurred
          </h1>
          <p className="text-xs text-gray-400 leading-relaxed">
            The application encountered a runtime anomaly. You can attempt to reset the component
            state.
          </p>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface border border-border-subtle text-white text-xs font-mono font-medium hover:bg-white/5 hover:border-accent-blue/40 transition-colors"
          >
            <RotateCcw className="w-4 h-4 text-accent-blue" />
            <span>Attempt System Recovery</span>
          </button>
        </div>
      </div>
    </main>
  );
}
