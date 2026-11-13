import { Sparkles, Terminal } from "lucide-react";
import { exploringTopics } from "@/data/exploring";

export function LearningTicker() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-surface/50 border border-border-subtle backdrop-blur-md overflow-x-auto text-xs font-mono text-gray-400">
        <span className="flex items-center gap-1.5 text-accent-blue font-bold shrink-0">
          <Terminal className="w-3.5 h-3.5" />
          ACTIVE FOCUS:
        </span>
        <div className="flex items-center gap-4 shrink-0">
          {exploringTopics.map((topic, i) => (
            <span key={topic.title} className="flex items-center gap-1.5 text-gray-300">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-violet inline-block" />
              <span>{topic.title}</span>
              {i < exploringTopics.length - 1 && <span className="text-gray-600">/</span>}
            </span>
          ))}
        </div>
        <span className="ml-auto text-[10px] text-gray-500 hidden md:flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-cyan-400" /> Continuous Learning
        </span>
      </div>
    </div>
  );
}
