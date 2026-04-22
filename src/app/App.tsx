import { Menu, Search, Mic, Video, Bell, User, Keyboard } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { VideoPlayer } from "./components/VideoPlayer";
import { VideoInfo } from "./components/VideoInfo";
import { KnowledgePanel } from "./components/KnowledgePanel";
import { RecommendedVideos } from "./components/RecommendedVideos";
import { Comments } from "./components/Comments";
import { Toaster } from "sonner";

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const videoPlayerRef = useRef<{ togglePlay: () => void; skip: (seconds: number) => void }>();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case " ":
        case "k":
          e.preventDefault();
          setIsPlaying((prev) => !prev);
          break;
        case "j":
          e.preventDefault();
          setCurrentTime((prev) => Math.max(0, prev - 10));
          break;
        case "l":
          e.preventDefault();
          setCurrentTime((prev) => prev + 10);
          break;
        case "arrowleft":
          e.preventDefault();
          setCurrentTime((prev) => Math.max(0, prev - 5));
          break;
        case "arrowright":
          e.preventDefault();
          setCurrentTime((prev) => prev + 5);
          break;
        case "f":
          e.preventDefault();
          document.documentElement.requestFullscreen();
          break;
        case "m":
          e.preventDefault();
          // Mute toggle would be handled by video player
          break;
        case "?":
          e.preventDefault();
          setShowShortcuts((prev) => !prev);
          break;
        case "escape":
          if (showShortcuts) {
            setShowShortcuts(false);
          }
          break;
        default:
          // Number keys for seeking (0-9)
          if (e.key >= "0" && e.key <= "9") {
            e.preventDefault();
            const percent = parseInt(e.key) * 10;
            // Would seek to that percentage
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [showShortcuts]);

  const shortcuts = [
    { key: "Space / K", action: "Play/Pause" },
    { key: "J", action: "Rewind 10 seconds" },
    { key: "L", action: "Forward 10 seconds" },
    { key: "←", action: "Rewind 5 seconds" },
    { key: "→", action: "Forward 5 seconds" },
    { key: "0-9", action: "Seek to 0%-90% of video" },
    { key: "F", action: "Fullscreen" },
    { key: "M", action: "Mute/Unmute" },
    { key: "?", action: "Show keyboard shortcuts" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 dark">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950 border-b border-zinc-900">
        <div className="flex items-center justify-between px-4 h-14">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-zinc-900 rounded-lg transition-colors">
              <Menu size={20} className="text-white" />
            </button>
            <div className="flex items-center gap-1">
              <svg
                width="28"
                height="20"
                viewBox="0 0 28 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.5 3.5C27.5 3.5 27.25 1.75 26.5 1C25.5 0 24.375 0 23.875 0C20 0 14 0 14 0C14 0 8 0 4.125 0C3.625 0 2.5 0 1.5 1C0.75 1.75 0.5 3.5 0.5 3.5C0.5 3.5 0 5.5 0 7.5V9.5C0 11.5 0.5 13.5 0.5 13.5C0.5 13.5 0.75 15.25 1.5 16C2.5 17 3.625 17 4.125 17C6 17.125 14 17.25 14 17.25C14 17.25 20 17.25 23.875 17.25C24.375 17.25 25.5 17.25 26.5 16.25C27.25 15.5 27.5 13.75 27.5 13.75C27.5 13.75 28 11.75 28 9.75V7.75C28 5.5 27.5 3.5 27.5 3.5Z"
                  fill="#FF0000"
                />
                <path d="M11 12.5V5L18.5 8.75L11 12.5Z" fill="white" />
              </svg>
              <span className="text-white text-lg font-semibold ml-1">YouTube</span>
            </div>
          </div>

          {/* Center Section - Search */}
          <div className="flex items-center gap-2 flex-1 max-w-2xl mx-4">
            <div className="flex items-center flex-1">
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm px-4 py-2 rounded-l-full focus:outline-none focus:border-blue-600 transition-colors"
              />
              <button className="px-6 py-2 bg-zinc-800 border border-zinc-800 border-l-0 rounded-r-full hover:bg-zinc-700 transition-colors">
                <Search size={18} className="text-white" />
              </button>
            </div>
            <button className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors">
              <Mic size={18} className="text-white" />
            </button>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowShortcuts(true)}
              className="p-2 hover:bg-zinc-900 rounded-lg transition-colors"
              title="Keyboard shortcuts (?)"
            >
              <Keyboard size={20} className="text-white" />
            </button>
            <button className="p-2 hover:bg-zinc-900 rounded-lg transition-colors">
              <Video size={20} className="text-white" />
            </button>
            <button className="p-2 hover:bg-zinc-900 rounded-lg transition-colors relative">
              <Bell size={20} className="text-white" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full"></div>
            </button>
            <button className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity">
              <User size={16} className="text-white" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-14">
        <div className="grid grid-cols-12 gap-6 p-6 max-w-[2000px] mx-auto">
          {/* Left Column - Video and Info (8 columns on desktop) */}
          <div className="col-span-12 lg:col-span-8 space-y-4">
            {/* Video Player */}
            <VideoPlayer
              onPlayPause={setIsPlaying}
              onSeek={setCurrentTime}
              externalTime={currentTime}
            />

            {/* Knowledge Panel */}
            <div>
              <h2 className="text-white text-lg font-medium mb-3">Knowledge Panel</h2>
              <KnowledgePanel onTimeSeek={setCurrentTime} />
            </div>

            {/* Video Info */}
            <VideoInfo />

            {/* Comments */}
            <div className="mt-6">
              <Comments />
            </div>
          </div>

          {/* Right Column - Recommended Videos (4 columns on desktop) */}
          <div className="col-span-12 lg:col-span-4">
            <RecommendedVideos />
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Modal */}
      {showShortcuts && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setShowShortcuts(false)}
        >
          <div
            className="bg-zinc-900 rounded-lg max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-white font-medium">
                Keyboard Shortcuts
              </h2>
              <button
                onClick={() => setShowShortcuts(false)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              {shortcuts.map((shortcut, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0"
                >
                  <span className="text-sm text-zinc-300">
                    {shortcut.action}
                  </span>
                  <kbd className="px-3 py-1.5 bg-zinc-800 text-white text-xs rounded border border-zinc-700 font-mono">
                    {shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800">
              <p className="text-xs text-zinc-500 text-center">
                Press <kbd className="px-2 py-0.5 bg-zinc-800 rounded text-zinc-300">?</kbd> anytime to toggle this menu
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#27272a',
            color: '#fff',
            border: '1px solid #3f3f46',
          },
        }}
      />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3f3f46;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #52525b;
        }
      `}</style>
    </div>
  );
}