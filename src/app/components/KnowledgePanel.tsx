import { useState } from "react";
import { FileText, List, Play } from "lucide-react";

interface KnowledgePanelProps {
  onTimeSeek?: (time: number) => void;
}

export function KnowledgePanel({ onTimeSeek }: KnowledgePanelProps) {
  const [activeTab, setActiveTab] = useState<"transcript" | "chapters">("transcript");
  const [activeTranscriptIndex, setActiveTranscriptIndex] = useState(5);
  const [activeChapterIndex, setActiveChapterIndex] = useState(2);

  // Convert timestamp string (e.g., "5:00") to seconds
  const parseTimestamp = (timestamp: string): number => {
    const parts = timestamp.split(":").map(Number);
    if (parts.length === 2) {
      return parts[0] * 60 + parts[1]; // MM:SS
    } else if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2]; // HH:MM:SS
    }
    return 0;
  };

  const chapters = [
    { time: "0:00", title: "Introduction", thumbnail: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
    { time: "2:15", title: "Modern JavaScript Frameworks", thumbnail: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
    { time: "5:00", title: "State Management Solutions", thumbnail: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
    { time: "9:18", title: "Performance Optimization", thumbnail: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" },
    { time: "13:05", title: "Build Tools and Bundlers", thumbnail: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" },
    { time: "16:30", title: "Testing Strategies", thumbnail: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)" },
    { time: "19:45", title: "Deployment and CI/CD", thumbnail: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)" },
    { time: "22:10", title: "Future Trends", thumbnail: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)" },
  ];

  const transcriptSegments = [
    { time: "0:00", text: "Welcome back to Tech Insights. Today we're diving into the future of web development and exploring the modern tools and techniques that are revolutionizing how we build for the web." },
    { time: "0:15", text: "The web development landscape has changed dramatically over the past few years. We've seen the rise of new frameworks, better tooling, and a renewed focus on performance and user experience." },
    { time: "0:30", text: "In this video, we'll cover everything from the latest JavaScript frameworks to cutting-edge build tools, testing strategies, and deployment practices that will help you stay ahead of the curve." },
    { time: "0:48", text: "Let's start by looking at what's new in the JavaScript ecosystem. React, Vue, and Angular continue to dominate, but new players like Svelte and Solid are gaining significant traction." },
    { time: "2:15", text: "Modern frameworks have evolved to solve specific problems. React excels at building complex UIs with its component model, Vue offers simplicity and flexibility, while Angular provides a complete solution for enterprise applications." },
    { time: "5:00", text: "When it comes to state management, the ecosystem has matured significantly. Redux remains popular, but newer solutions like Zustand, Jotai, and Recoil offer simpler APIs and better performance characteristics." },
    { time: "5:22", text: "State management is crucial for scaling applications. The key is choosing the right tool for your needs - not every app needs Redux's complexity, and sometimes React's built-in state is sufficient." },
    { time: "5:45", text: "We're also seeing a shift toward server-side state management with tools like React Query and SWR, which handle data fetching, caching, and synchronization automatically." },
    { time: "9:18", text: "Performance optimization has become a critical focus. Users expect fast, responsive applications, and frameworks are responding with features like automatic code splitting and lazy loading." },
    { time: "13:05", text: "Build tools have revolutionized the development experience. Vite and esbuild offer lightning-fast builds, while tools like Turbopack promise even better performance for large applications." },
  ];

  return (
    <div className="bg-zinc-900 rounded-lg overflow-hidden">
      {/* Tabs Header */}
      <div className="flex border-b border-zinc-800">
        <button
          onClick={() => setActiveTab("transcript")}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors relative ${
            activeTab === "transcript"
              ? "text-white"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <FileText size={16} />
          Transcript
          {activeTab === "transcript" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab("chapters")}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors relative ${
            activeTab === "chapters"
              ? "text-white"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <List size={16} />
          Chapters
          {activeTab === "chapters" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
          )}
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4 max-h-80 overflow-y-auto custom-scrollbar">
        {activeTab === "transcript" ? (
          <div className="space-y-4">
            {transcriptSegments.map((segment, index) => (
              <div
                key={index}
                onClick={() => {
                  setActiveTranscriptIndex(index);
                  if (onTimeSeek) {
                    onTimeSeek(parseTimestamp(segment.time));
                  }
                }}
                className={`group p-2 rounded-lg transition-colors cursor-pointer ${
                  activeTranscriptIndex === index
                    ? "bg-blue-900/20 border border-blue-800/30"
                    : "hover:bg-zinc-800"
                }`}
              >
                <div className="flex gap-3">
                  <span className={`text-xs font-mono mt-0.5 flex-shrink-0 ${
                    activeTranscriptIndex === index ? "text-blue-400" : "text-zinc-500"
                  }`}>
                    {segment.time}
                  </span>
                  <p className={`text-sm leading-relaxed ${
                    activeTranscriptIndex === index ? "text-white" : "text-zinc-300"
                  }`}>
                    {segment.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {chapters.map((chapter, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveChapterIndex(index);
                  if (onTimeSeek) {
                    onTimeSeek(parseTimestamp(chapter.time));
                  }
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left group ${
                  activeChapterIndex === index
                    ? "bg-blue-900/20 border border-blue-800/30 shadow-[0_0_12px_rgba(59,130,246,0.3)]"
                    : "hover:bg-zinc-800"
                }`}
              >
                {/* Thumbnail */}
                <div className="relative w-28 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <div
                    className="w-full h-full"
                    style={{ background: chapter.thumbnail }}
                  ></div>
                  {activeChapterIndex === index && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                        <Play size={16} className="text-black ml-0.5" fill="black" />
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                    {chapter.time}
                  </div>
                </div>

                {/* Chapter Info */}
                <div className="flex-1 min-w-0">
                  <span className={`text-sm font-medium ${
                    activeChapterIndex === index ? "text-white" : "text-zinc-300 group-hover:text-white"
                  }`}>
                    {chapter.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
