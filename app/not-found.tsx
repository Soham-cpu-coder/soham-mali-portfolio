import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 text-center">
      <div className="max-w-md space-y-6 glass-panel rounded-2xl p-8 border border-border-subtle shadow-2xl">
        <div className="h-16 w-16 mx-auto rounded-2xl bg-surface-light border border-border-subtle flex items-center justify-center text-accent-blue">
          <Terminal className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-accent-violet uppercase tracking-widest">
            Error 404 // Page Missing
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Destination Not Found
          </h1>
          <p className="text-xs text-gray-400 leading-relaxed">
            The coordinates you requested do not exist in this sector. You may have mistyped the URL
            or the endpoint has moved.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-blue to-accent-violet text-white text-xs font-mono font-medium hover:opacity-90 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Base Orbit</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
