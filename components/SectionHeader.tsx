import { Sparkles } from "lucide-react";

interface SectionHeaderProps {
  number: string;
  label: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  number,
  label,
  title,
  subtitle,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={`space-y-2.5 ${
        align === "center" ? "text-center mx-auto max-w-3xl" : "text-left"
      }`}
    >
      <div className="inline-flex items-center gap-2 text-xs font-mono text-accent-blue uppercase tracking-widest px-2.5 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20">
        <Sparkles className="w-3.5 h-3.5" />
        <span>
          {number} &bull; {label}
        </span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-gray-400 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
