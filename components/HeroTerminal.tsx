"use client";

import React, { useState, useEffect, useRef } from "react";
import { profile } from "@/data/profile";
import { projectsData } from "@/data/projects";
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles } from "lucide-react";

interface TerminalLine {
  id: string;
  type: "command" | "output" | "system" | "error";
  text: string;
}

export function HeroTerminal() {
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isTypingIntro, setIsTypingIntro] = useState(true);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-type introductory command on initial load
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const introCommand = "cat intro.txt";
    let charIndex = 0;

    setHistory([{ id: "sys-0", type: "system", text: "Portfolio CLI v2.4 (x86_64-pc-none)" }]);

    const interval = setInterval(() => {
      if (charIndex < introCommand.length) {
        setInputVal((prev) => prev + introCommand.charAt(charIndex));
        charIndex++;
      } else {
        clearInterval(interval);
        timeoutId = setTimeout(() => {
          executeCommand(introCommand, true);
          setInputVal("");
          setIsTypingIntro(false);
        }, 300);
      }
    }, 45);

    return () => {
      clearInterval(interval);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const executeCommand = (cmdStr: string, isAuto = false) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    if (!isAuto) {
      setCommandHistory((prev) => [trimmed, ...prev]);
      setHistoryIndex(-1);
    }

    const commandId = Date.now().toString();
    const newLines: TerminalLine[] = [
      { id: `cmd-${commandId}`, type: "command", text: trimmed },
    ];

    const args = trimmed.toLowerCase().split(" ");
    const mainCommand = args[0];

    switch (mainCommand) {
      case "cat":
        if (args[1] === "intro.txt" || !args[1]) {
          newLines.push({
            id: `out-${commandId}-1`,
            type: "output",
            text: `👋 Hey, I'm ${profile.name} — ${profile.role}.\n📍 Based in ${profile.location}. Aiming for full-stack & AI/ML internships.\nType 'help' to explore my background, skills, and projects.`,
          });
        } else {
          newLines.push({
            id: `out-${commandId}-err`,
            type: "error",
            text: `cat: ${args[1]}: No such file or directory`,
          });
        }
        break;

      case "help":
        newLines.push({
          id: `out-${commandId}-help`,
          type: "output",
          text: `Available commands:
  • about     - Read short bio & engineering focus
  • skills    - View languages, frameworks & ML toolchain
  • projects  - List featured software & AI projects
  • contact   - Get direct email, LinkedIn & WhatsApp
  • resume    - Check resume availability & status
  • whoami    - Display developer identity
  • clear     - Clear the terminal screen`,
        });
        break;

      case "whoami":
        newLines.push({
          id: `out-${commandId}-whoami`,
          type: "output",
          text: `${profile.name} — ${profile.role}\nStatus: ${profile.openToInternships ? "Open to Internship Opportunities" : "Busy with coursework"}`,
        });
        break;

      case "about":
        newLines.push({
          id: `out-${commandId}-about`,
          type: "output",
          text: `BIO:\n${profile.about.shortBio}\n\nFOCUS:\n${profile.about.currentFocus}\n\nGOAL:\n${profile.about.goals}`,
        });
        break;

      case "skills":
        const formattedSkills = profile.skills
          .map((s) => `[${s.category}]: ${s.items.join(", ")}`)
          .join("\n");
        newLines.push({
          id: `out-${commandId}-skills`,
          type: "output",
          text: `TECHNICAL STACK:\n${formattedSkills}`,
        });
        break;

      case "projects":
        const projList = projectsData
          .map((p, i) => `${i + 1}. ${p.title} (${p.tech.join(", ")})\n   → ${p.summary}`)
          .join("\n\n");
        newLines.push({
          id: `out-${commandId}-projects`,
          type: "output",
          text: `FEATURED PROJECTS:\n${projList}\n\nScroll down to view detailed case studies.`,
        });
        break;

      case "contact":
        newLines.push({
          id: `out-${commandId}-contact`,
          type: "output",
          text: `GET IN TOUCH:\n• Email:    ${profile.email}\n• LinkedIn: ${profile.linkedin}\n• WhatsApp: ${profile.whatsapp.enabled ? profile.whatsapp.number : "Disabled"}\n\nFeel free to write via the contact form below.`,
        });
        break;

      case "resume":
        newLines.push({
          id: `out-${commandId}-resume`,
          type: "output",
          text: profile.resume.isAvailable
            ? `Resume available at: ${profile.resume.url}`
            : `Resume file is currently pending update. You can reach out directly via ${profile.email} to request the latest copy.`,
        });
        break;

      case "clear":
      case "cls":
        setHistory([]);
        return;

      default:
        newLines.push({
          id: `out-${commandId}-unknown`,
          type: "error",
          text: `Command not found: "${trimmed}". Type 'help' to see valid commands.`,
        });
        break;
    }

    setHistory((prev) => [...prev, ...newLines]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      executeCommand(inputVal);
      setInputVal("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="w-full rounded-2xl bg-[#090C14] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden font-mono text-xs sm:text-sm text-slate-300 transition-all hover:border-white/20"
    >
      {/* Window Titlebar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#121624] border-b border-white/5 select-none">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          <span className="ml-2 text-[11px] text-slate-400 font-sans font-medium flex items-center gap-1.5">
            <TerminalIcon className="w-3 h-3 text-blue-400" />
            soham@portfolio:~ (interactive shell)
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <Sparkles className="w-3 h-3 text-violet-400 animate-subtle-pulse" />
          <span className="hidden sm:inline">Try: &apos;skills&apos; or &apos;projects&apos;</span>
        </div>
      </div>

      {/* Terminal Viewport */}
      <div className="p-4 sm:p-5 h-[280px] sm:h-[320px] overflow-y-auto space-y-3 leading-relaxed">
        {history.map((line) => {
          if (line.type === "command") {
            return (
              <div key={line.id} className="flex items-start gap-2 text-slate-200">
                <span className="text-blue-400 font-semibold select-none">$</span>
                <span>{line.text}</span>
              </div>
            );
          }
          if (line.type === "error") {
            return (
              <div key={line.id} className="text-rose-400 whitespace-pre-wrap pl-4 border-l border-rose-500/30">
                {line.text}
              </div>
            );
          }
          if (line.type === "system") {
            return (
              <div key={line.id} className="text-slate-500 italic text-[11px]">
                {line.text}
              </div>
            );
          }
          return (
            <div key={line.id} className="text-slate-300 whitespace-pre-wrap pl-3 border-l-2 border-blue-500/30 py-0.5">
              {line.text}
            </div>
          );
        })}

        {/* Live Input Prompt */}
        <div className="flex items-center gap-2 text-slate-200 pt-1">
          <span className="text-blue-400 font-semibold select-none">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTypingIntro}
            placeholder={isTypingIntro ? "" : "type 'help' or any command..."}
            className="flex-1 bg-transparent text-slate-100 placeholder:text-slate-600 focus:outline-none caret-blue-400 font-mono text-xs sm:text-sm"
            aria-label="Interactive Terminal Command Input"
            autoComplete="off"
            spellCheck="false"
          />
          {!isTypingIntro && (
            <button
              type="button"
              onClick={() => {
                executeCommand(inputVal);
                setInputVal("");
              }}
              className="text-slate-500 hover:text-slate-300 sm:hidden"
              aria-label="Run command"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}
