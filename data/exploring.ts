export interface ExploringTopic {
  title: string;
  tag: string;
  description: string;
  iconName: "Brain" | "Cpu" | "Layers" | "Terminal";
}

export const exploringTopics: ExploringTopic[] = [
  {
    title: "AI / ML & Deep Learning",
    tag: "Intelligence",
    description:
      "Deepening practical understanding of neural network architectures, computer vision, and predictive modeling using modern frameworks.",
    iconName: "Brain",
  },
  {
    title: "LLMs & RAG Architectures",
    tag: "Generative AI",
    description:
      "Exploring Retrieval-Augmented Generation, vector embeddings, chunking strategies, and orchestration patterns for context-grounded AI apps.",
    iconName: "Terminal",
  },
  {
    title: "System Design & Distributed Architectures",
    tag: "Engineering",
    description:
      "Studying high-throughput distributed systems, caching layers, database indexing, message queues, and horizontal scalability patterns.",
    iconName: "Layers",
  },
];
