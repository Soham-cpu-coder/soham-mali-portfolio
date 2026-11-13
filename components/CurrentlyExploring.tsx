import { Brain, Cpu, Layers, Terminal } from "lucide-react";
import { exploringTopics, ExploringTopic } from "@/data/exploring";
import { SectionHeader } from "@/components/SectionHeader";
import { SpotlightCard } from "@/components/SpotlightCard";

const topicIcons: Record<ExploringTopic["iconName"], React.ReactNode> = {
  Brain: <Brain className="w-5 h-5 text-accent-violet" />,
  Cpu: <Cpu className="w-5 h-5 text-accent-blue" />,
  Layers: <Layers className="w-5 h-5 text-cyan-400" />,
  Terminal: <Terminal className="w-5 h-5 text-emerald-400" />,
};

const topicSpotlights: Record<ExploringTopic["iconName"], string> = {
  Brain: "rgba(139, 92, 246, 0.16)",
  Cpu: "rgba(59, 130, 246, 0.16)",
  Layers: "rgba(6, 182, 212, 0.16)",
  Terminal: "rgba(16, 185, 129, 0.16)",
};

export function CurrentlyExploring() {
  return (
    <section id="exploring" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-12">
        {/* Unified Section Header */}
        <SectionHeader
          number="06"
          label="Active Research"
          title="Currently Exploring & Deep Diving"
          subtitle="Emerging technologies, research topics, and architectural paradigms I am actively studying and prototyping."
        />

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {exploringTopics.map((topic, index) => (
            <SpotlightCard
              key={topic.title}
              spotlightColor={topicSpotlights[topic.iconName] || "rgba(59, 130, 246, 0.16)"}
              className="p-6 sm:p-7 text-left space-y-4 flex flex-col justify-between hover:scale-[1.015]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-surface-light border border-border-subtle shadow-inner">
                    {topicIcons[topic.iconName] || <Brain className="w-5 h-5 text-accent-violet" />}
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-white/5 border border-border-subtle text-accent-blue">
                    {topic.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight">{topic.title}</h3>

                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {topic.description}
                </p>
              </div>

              <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-[11px] font-mono text-gray-500">
                <span>Domain Focus</span>
                <span className="text-accent-violet">0{index + 1}</span>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
