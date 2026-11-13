export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <span className="absolute inset-0 rounded-full border-2 border-accent-blue/20" />
          <span className="absolute inset-0 rounded-full border-2 border-t-accent-blue border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        </div>
        <span className="text-xs font-mono text-gray-400 tracking-widest uppercase">
          Initializing Portfolio Core...
        </span>
      </div>
    </div>
  );
}
