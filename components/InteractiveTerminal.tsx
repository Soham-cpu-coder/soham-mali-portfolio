"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft } from "lucide-react";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";
import { projects } from "@/data/projects";
import { timelineData } from "@/data/education";

interface CommandOutput {
  id: string;
  command: string;
  output: React.ReactNode;
}

const validCommands = [
  "help",
  "whoami",
  "skills",
  "projects",
  "contact",
  "experience",
  "education",
  "resume",
  "github",
  "theme",
  "ls",
  "cat about.txt",
  "open",
  "quote",
  "matrix",
  "clear",
];

const engineeringQuotes = [
  "\"Simplicity is prerequisite for reliability.\" — Edsger W. Dijkstra",
  "\"Make it work, make it right, make it fast.\" — Kent Beck",
  "\"The best code is no code at all.\" — Jeff Atwood",
  "\"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.\" — Martin Fowler",
];

function findClosestCommand(input: string): string | null {
  const lower = input.toLowerCase().trim();
  let bestMatch: string | null = null;
  let minDiff = Infinity;

  for (const cmd of validCommands) {
    if (cmd.startsWith(lower)) return cmd;
    // Simple character difference check
    let diff = Math.abs(cmd.length - lower.length);
    for (let i = 0; i < Math.min(cmd.length, lower.length); i++) {
      if (cmd[i] !== lower[i]) diff += 1;
    }
    if (diff < minDiff && diff <= 3) {
      minDiff = diff;
      bestMatch = cmd;
    }
  }

  return bestMatch;
}

export function InteractiveTerminal() {
  const [inputVal, setInputVal] = useState("");
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [outputs, setOutputs] = useState<CommandOutput[]>([
    {
      id: "initial-1",
      command: "welcome",
      output: (
        <div className="space-y-1 text-gray-300">
          <p className="text-accent-blue font-semibold">
            &gt; Welcome to Soham Mali&apos;s interactive developer shell.
          </p>
          <p className="text-xs text-gray-400">
            Type <span className="text-accent-violet font-mono font-bold">help</span>, press{" "}
            <kbd className="px-1 py-0.5 rounded bg-white/10 text-[10px] text-gray-300">Tab</kbd> to
            autocomplete, or click shortcuts below.
          </p>
        </div>
      ),
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [outputs]);

  const scrollToSection = (id: string): boolean => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      return true;
    }
    return false;
  };

  const cycleTheme = () => {
    const root = document.documentElement;
    const current = root.style.getPropertyValue("--accent-primary");
    let next = "#8B5CF6";
    if (current === "#8B5CF6") next = "#06B6D4";
    else if (current === "#06B6D4") next = "#3B82F6";
    else next = "#8B5CF6";

    root.style.setProperty("--accent-primary", next);
  };

  const executeCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const cmd = trimmed.toLowerCase();
    let result: React.ReactNode;

    if (cmd === "help") {
      result = (
        <div className="space-y-1.5 text-xs">
          <p className="text-gray-400 font-semibold">Available commands:</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-1 font-mono">
            <div>
              <span className="text-accent-blue font-bold">whoami</span>
              <span className="text-gray-400"> - Bio & profile</span>
            </div>
            <div>
              <span className="text-accent-blue font-bold">skills</span>
              <span className="text-gray-400"> - Tech competencies</span>
            </div>
            <div>
              <span className="text-accent-blue font-bold">projects</span>
              <span className="text-gray-400"> - Featured projects</span>
            </div>
            <div>
              <span className="text-accent-blue font-bold">experience</span>
              <span className="text-gray-400"> - Work & internships</span>
            </div>
            <div>
              <span className="text-accent-blue font-bold">education</span>
              <span className="text-gray-400"> - Degree & university</span>
            </div>
            <div>
              <span className="text-accent-blue font-bold">contact</span>
              <span className="text-gray-400"> - Email & WhatsApp</span>
            </div>
            <div>
              <span className="text-accent-blue font-bold">resume</span>
              <span className="text-gray-400"> - Download PDF resume</span>
            </div>
            <div>
              <span className="text-accent-blue font-bold">github</span>
              <span className="text-gray-400"> - Open GitHub profile</span>
            </div>
            <div>
              <span className="text-accent-blue font-bold">theme</span>
              <span className="text-gray-400"> - Cycle neon theme</span>
            </div>
            <div>
              <span className="text-accent-blue font-bold">ls</span>
              <span className="text-gray-400"> - List directory</span>
            </div>
            <div>
              <span className="text-accent-blue font-bold">open &lt;sec&gt;</span>
              <span className="text-gray-400"> - Scroll to section</span>
            </div>
            <div>
              <span className="text-accent-blue font-bold">quote / matrix</span>
              <span className="text-gray-400"> - Fun extras</span>
            </div>
          </div>
        </div>
      );
    } else if (cmd === "whoami") {
      result = (
        <div className="space-y-1.5 text-xs">
          <p className="font-semibold text-white">
            {profile.name} <span className="text-accent-violet">({profile.role})</span>
          </p>
          <p className="text-gray-300">{profile.tagline}</p>
          <p className="text-gray-400">
            📍 Location: <span className="text-gray-200">{profile.location}</span>
          </p>
          <p className="text-gray-400">
            🎓 Pillai University (B.Tech Computer Engineering, 2023–2027)
          </p>
        </div>
      );
    } else if (cmd === "skills") {
      result = (
        <div className="space-y-2 text-xs">
          {skillGroups.map((group) => (
            <div key={group.category} className="space-y-0.5">
              <span className="text-accent-blue font-semibold">{group.category}: </span>
              <span className="text-gray-300">
                {group.skills.map((s) => s.name).join(", ")}
              </span>
            </div>
          ))}
        </div>
      );
    } else if (cmd === "projects") {
      result = (
        <div className="space-y-2 text-xs">
          {projects.map((p, idx) => (
            <div key={p.id} className="border-l-2 border-accent-blue/40 pl-2">
              <p className="font-semibold text-white">
                {idx + 1}. {p.title}{" "}
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-accent-violet">
                  {p.category}
                </span>
              </p>
              <p className="text-gray-300">{p.shortDescription}</p>
              <p className="text-gray-400 text-[11px]">Stack: {p.stack.join(" • ")}</p>
            </div>
          ))}
        </div>
      );
    } else if (cmd === "experience") {
      const exp = timelineData.filter((t) => t.type === "experience");
      result = (
        <div className="space-y-2 text-xs">
          {exp.map((item) => (
            <div key={item.id} className="border-l-2 border-emerald-400/40 pl-2 space-y-0.5">
              <p className="font-bold text-white">
                {item.title} &bull; <span className="text-gray-300">{item.institution}</span>
              </p>
              <p className="text-gray-400 text-[11px]">
                {item.startYear} &ndash; {item.endYear} | {item.location}
              </p>
              {item.description && <p className="text-gray-300 text-xs">{item.description}</p>}
            </div>
          ))}
        </div>
      );
    } else if (cmd === "education") {
      const edu = timelineData.find((t) => t.type === "education");
      result = (
        <div className="space-y-1 text-xs">
          <p className="font-bold text-white">{edu?.title}</p>
          <p className="text-gray-300">
            {edu?.institution} &bull; {edu?.location}
          </p>
          <p className="text-gray-400 text-[11px]">
            Expected Graduation: {edu?.endYear} | Coursework: {edu?.skills?.join(", ")}
          </p>
        </div>
      );
    } else if (cmd === "resume") {
      window.open(profile.resumePath, "_blank");
      result = <p className="text-xs text-emerald-400">&gt; Opening resume PDF in new tab...</p>;
    } else if (cmd === "github") {
      window.open(profile.socials.github, "_blank");
      result = <p className="text-xs text-accent-blue">&gt; Navigating to github.com/{profile.githubUsername}...</p>;
    } else if (cmd === "theme") {
      cycleTheme();
      result = <p className="text-xs text-accent-violet">&gt; Theme accent toggled.</p>;
    } else if (cmd === "ls") {
      result = (
        <p className="text-xs text-gray-300 font-mono">
          <span className="text-accent-blue">about.txt</span> &nbsp;
          <span className="text-accent-violet">skills.ts</span> &nbsp;
          <span className="text-cyan-400">projects/</span> &nbsp;
          <span className="text-emerald-400">resume.pdf</span> &nbsp;
          <span className="text-amber-400">experience.json</span>
        </p>
      );
    } else if (cmd === "cat about.txt") {
      result = (
        <p className="text-xs text-gray-300 leading-relaxed">
          {profile.name} - {profile.role}. {profile.tagline} Based in {profile.location}.
        </p>
      );
    } else if (cmd.startsWith("open ")) {
      const target = cmd.replace("open ", "").trim();
      const success = scrollToSection(target);
      if (success) {
        result = <p className="text-xs text-emerald-400">&gt; Scrolled to #{target}</p>;
      } else {
        result = (
          <p className="text-xs text-rose-400">
            &gt; Section &quot;{target}&quot; not found. Available: about, skills, projects, github, journey, exploring, contact.
          </p>
        );
      }
    } else if (cmd === "contact") {
      result = (
        <div className="space-y-1 text-xs">
          <p className="text-gray-300">
            ✉️ Email: <span className="text-accent-blue">{profile.email}</span>
          </p>
          <p className="text-gray-300">
            💬 WhatsApp: <span className="text-emerald-400">{profile.whatsapp.display}</span>
          </p>
          <p className="text-gray-300">
            🔗 LinkedIn: <span className="text-blue-400">{profile.socials.linkedin}</span>
          </p>
          <p className="text-gray-300">
            🐙 GitHub: <span className="text-gray-400">{profile.socials.github}</span>
          </p>
        </div>
      );
    } else if (cmd === "quote") {
      result = (
        <p className="text-xs text-cyan-300 italic">
          {engineeringQuotes[Math.floor(Math.random() * engineeringQuotes.length)]}
        </p>
      );
    } else if (cmd === "matrix") {
      result = (
        <div className="text-xs text-emerald-400 font-mono space-y-0.5 leading-tight">
          <p>&gt; WAKE UP, NEO...</p>
          <p>&gt; THE MATRIX HAS YOU.</p>
          <p className="text-emerald-500/70 text-[10px]">01010011 01101111 01101000 01100001 01101101</p>
        </div>
      );
    } else if (cmd === "clear") {
      setOutputs([]);
      setInputVal("");
      return;
    } else {
      const suggestion = findClosestCommand(cmd);
      result = (
        <p className="text-xs text-rose-400">
          zsh: command not found: {trimmed}.{" "}
          {suggestion ? (
            <span>
              Did you mean <span className="text-accent-blue font-bold underline">{suggestion}</span>?
            </span>
          ) : (
            <span>Type &quot;help&quot; for available commands.</span>
          )}
        </p>
      );
    }

    setOutputs((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}-${Math.random()}`,
        command: trimmed,
        output: result,
      },
    ]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const lower = inputVal.toLowerCase().trim();
      if (!lower) return;
      const match = validCommands.find((c) => c.startsWith(lower));
      if (match) {
        setInputVal(match);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx =
          historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setInputVal(commandHistory[nextIdx]);
        } else {
          setHistoryIndex(-1);
          setInputVal("");
        }
      }
    }
  };

  return (
    <div
      className="w-full rounded-2xl bg-[#0B0D13]/90 backdrop-blur-xl border border-border-subtle shadow-2xl overflow-hidden font-mono text-left cursor-text transition-all duration-300 hover:border-accent-blue/30"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0F1117]/90 border-b border-border-subtle select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block shadow-sm shadow-rose-500/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block shadow-sm shadow-amber-500/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block shadow-sm shadow-emerald-500/50" />
          </div>
          <span className="text-[11px] text-gray-400 flex items-center gap-1.5 font-mono ml-2">
            <TerminalIcon className="w-3.5 h-3.5 text-accent-blue" />
            soham@terminal: ~
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setOutputs([]);
          }}
          className="text-[10px] text-gray-400 hover:text-white px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 transition-colors"
        >
          clear
        </button>
      </div>

      {/* Terminal Body */}
      <div className="p-4 space-y-3 max-h-72 overflow-y-auto terminal-scroll text-sm">
        {outputs.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-accent-blue font-bold">visitor@soham</span>
              <span className="text-gray-500">:</span>
              <span className="text-accent-violet">~</span>
              <span className="text-gray-500">$</span>
              <span className="text-white font-semibold">{item.command}</span>
            </div>
            <div className="pl-3 py-0.5">{item.output}</div>
          </div>
        ))}

        {/* Live Input Line */}
        <div className="flex items-center gap-2 text-xs pt-1">
          <span className="text-accent-blue font-bold">visitor@soham</span>
          <span className="text-gray-500">:</span>
          <span className="text-accent-violet">~</span>
          <span className="text-gray-500">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white focus:outline-none caret-accent-blue text-xs font-mono"
            placeholder="Type 'help' (Tab to autocomplete)..."
            aria-label="Terminal command prompt"
            autoComplete="off"
            spellCheck="false"
          />
          <CornerDownLeft className="w-3 h-3 text-gray-600" />
        </div>
        <div ref={terminalEndRef} />
      </div>

      {/* Quick Interactive Command Buttons */}
      <div className="px-3.5 py-2.5 bg-[#090A0F] border-t border-border-subtle flex items-center gap-2 overflow-x-auto text-[11px]">
        <span className="text-gray-500 text-[10px] flex items-center gap-1 shrink-0">
          <Sparkles className="w-3 h-3 text-accent-violet" /> Quick:
        </span>
        {["whoami", "skills", "projects", "experience", "resume", "theme"].map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              executeCommand(cmd);
            }}
            className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-accent-blue/20 hover:text-accent-blue text-gray-300 border border-border-subtle transition-all duration-150 active:scale-95 text-[11px]"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
