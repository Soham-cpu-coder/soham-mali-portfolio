"use client";

import { useState } from "react";
import Image from "next/image";

interface ProfilePhotoProps {
  src?: string;
  name: string;
  className?: string;
  priority?: boolean;
}

export function ProfilePhoto({
  src,
  name,
  className = "",
  priority = false,
}: ProfilePhotoProps) {
  const [hasError, setHasError] = useState(false);

  // Generate initials (e.g. Soham Mali -> SM)
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase() || "SM";

  const renderFallback = () => (
    <div
      className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600/30 via-violet-600/20 to-surface border border-accent-blue/30 shadow-[0_0_40px_rgba(59,130,246,0.2)]"
      aria-label={`${name} avatar`}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <span className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
          {initials}
        </span>
        <span className="mt-1 text-xs uppercase tracking-widest text-blue-300/60 font-mono">
          Developer
        </span>
      </div>
    </div>
  );

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-surface border border-border-subtle p-1 transition-all duration-300 hover:border-accent-blue/50 ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-xl">
        {!hasError && src ? (
          <Image
            src={src}
            alt={name}
            fill
            sizes="(max-width: 768px) 240px, 320px"
            className="object-cover transition-transform duration-500 hover:scale-105"
            onError={() => setHasError(true)}
            priority={priority}
          />
        ) : (
          renderFallback()
        )}
      </div>
    </div>
  );
}
