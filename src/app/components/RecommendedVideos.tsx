import { useState } from "react";
import { Focus, Tag } from "lucide-react";

interface Video {
  id: number;
  title: string;
  channel: string;
  views: string;
  timestamp: string;
  duration: string;
  thumbnail: string;
  categories: string[];
}

export function RecommendedVideos() {
  const [focusMode, setFocusMode] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const videos: Video[] = [
    {
      id: 1,
      title: "Advanced TypeScript Patterns for React",
      channel: "Code Masters",
      views: "890K views",
      timestamp: "1 day ago",
      duration: "18:24",
      thumbnail: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      categories: ["Programming", "Web Development", "TypeScript"],
    },
    {
      id: 2,
      title: "Building Scalable APIs with Node.js",
      channel: "Backend Guru",
      views: "520K views",
      timestamp: "3 days ago",
      duration: "22:15",
      thumbnail: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      categories: ["Programming", "Backend", "Node.js"],
    },
    {
      id: 3,
      title: "Top 10 Funny Cat Videos",
      channel: "Pet Paradise",
      views: "2.1M views",
      timestamp: "5 days ago",
      duration: "10:42",
      thumbnail: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      categories: ["Entertainment", "Pets"],
    },
    {
      id: 4,
      title: "CSS Grid vs Flexbox: Complete Guide",
      channel: "Design Dev",
      views: "1.2M views",
      timestamp: "1 week ago",
      duration: "16:30",
      thumbnail: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      categories: ["Programming", "Web Development", "CSS"],
    },
    {
      id: 5,
      title: "Amazing Food Recipes You Must Try",
      channel: "Cooking Channel",
      views: "3.5M views",
      timestamp: "2 weeks ago",
      duration: "14:20",
      thumbnail: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      categories: ["Food", "Lifestyle"],
    },
    {
      id: 6,
      title: "React Server Components Explained",
      channel: "Tech Insights",
      views: "650K views",
      timestamp: "3 days ago",
      duration: "20:18",
      thumbnail: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
      categories: ["Programming", "Web Development", "React"],
    },
    {
      id: 7,
      title: "Web Performance Optimization Tips",
      channel: "Performance Pro",
      views: "420K views",
      timestamp: "5 days ago",
      duration: "15:45",
      thumbnail: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      categories: ["Programming", "Web Development", "Performance"],
    },
    {
      id: 8,
      title: "Travel Vlog: Best Destinations 2026",
      channel: "World Traveler",
      views: "1.8M views",
      timestamp: "1 week ago",
      duration: "25:30",
      thumbnail: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      categories: ["Travel", "Lifestyle"],
    },
    {
      id: 9,
      title: "JavaScript Design Patterns",
      channel: "Code Masters",
      views: "380K views",
      timestamp: "2 days ago",
      duration: "19:12",
      thumbnail: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      categories: ["Programming", "JavaScript", "Web Development"],
    },
    {
      id: 10,
      title: "Music Production Tutorial 2026",
      channel: "Beat Makers",
      views: "920K views",
      timestamp: "4 days ago",
      duration: "28:45",
      thumbnail: "linear-gradient(135deg, #fa8bff 0%, #2bd2ff 90%, #2bff88 100%)",
      categories: ["Music", "Tutorial"],
    },
  ];

  // Current video categories (simulated as web development related)
  const currentVideoCategories = ["Programming", "Web Development", "JavaScript"];

  // Get all unique categories
  const allCategories = Array.from(
    new Set(videos.flatMap((video) => video.categories))
  ).sort();

  // Filter videos based on focus mode and selected categories
  const getFilteredVideos = () => {
    let filtered = videos;

    if (focusMode) {
      // In focus mode, show videos that share at least one category with current video
      filtered = videos.filter((video) =>
        video.categories.some((cat) => currentVideoCategories.includes(cat))
      );
    }

    // Apply category filters if any are selected
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((video) =>
        selectedCategories.every((cat) => video.categories.includes(cat))
      );
    }

    return filtered;
  };

  const displayedVideos = getFilteredVideos();

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const relevantCategories = allCategories.filter(
    (cat) => currentVideoCategories.includes(cat) || !focusMode
  );

  return (
    <div className="space-y-4">
      {/* Focus Mode Toggle */}
      <div className={`bg-zinc-900 rounded-lg p-4 transition-shadow ${
        focusMode ? "shadow-[0_0_20px_rgba(59,130,246,0.5)]" : ""
      }`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 bg-zinc-800 rounded-lg transition-all ${
              focusMode ? "bg-blue-600/20 shadow-[0_0_12px_rgba(59,130,246,0.4)]" : ""
            }`}>
              <Focus size={18} className={`transition-colors ${focusMode ? "text-blue-400" : "text-white"}`} />
            </div>
            <div>
              <h3 className="text-sm text-white font-medium">Focus Mode</h3>
              <p className="text-xs text-zinc-400">
                {focusMode
                  ? `Showing ${displayedVideos.length} relevant videos`
                  : "Show only relevant videos"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setFocusMode(!focusMode)}
            className={`relative w-11 h-6 rounded-full transition-all ${
              focusMode ? "bg-blue-600 shadow-[0_0_16px_rgba(59,130,246,0.6)]" : "bg-zinc-700"
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                focusMode ? "translate-x-5 shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "translate-x-0"
              }`}
            ></div>
          </button>
        </div>

        {/* Category Filters */}
        {focusMode && (
          <div className="border-t border-zinc-800 pt-3 mt-3">
            <div className="flex items-center gap-2 mb-2">
              <Tag size={14} className="text-zinc-400" />
              <span className="text-xs text-zinc-400">Filter by category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {relevantCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedCategories.includes(category)
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            {selectedCategories.length > 0 && (
              <button
                onClick={() => setSelectedCategories([])}
                className="text-xs text-blue-400 hover:text-blue-300 mt-2"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Video List */}
      <div className="space-y-2">
        {displayedVideos.length === 0 ? (
          <div className="bg-zinc-900 rounded-lg p-8 text-center">
            <p className="text-zinc-400 text-sm">
              No videos match your current filters
            </p>
            <button
              onClick={() => setSelectedCategories([])}
              className="mt-3 text-sm text-blue-400 hover:text-blue-300"
            >
              Clear filters
            </button>
          </div>
        ) : (
          displayedVideos.map((video) => (
            <div
              key={video.id}
              className="flex gap-2 p-2 hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer group"
            >
              {/* Thumbnail */}
              <div className="relative w-40 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <div
                  className="w-full h-full"
                  style={{ background: video.thumbnail }}
                ></div>
                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                  {video.duration}
                </div>
              </div>

              {/* Video Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm text-white group-hover:text-zinc-200 line-clamp-2 mb-1">
                  {video.title}
                </h4>
                <p className="text-xs text-zinc-400 mb-1">{video.channel}</p>
                <div className="flex items-center gap-1 text-xs text-zinc-500 mb-1.5">
                  <span>{video.views}</span>
                  <span>•</span>
                  <span>{video.timestamp}</span>
                </div>
                {/* Category Tags */}
                {focusMode && (
                  <div className="flex flex-wrap gap-1">
                    {video.categories.slice(0, 2).map((category) => (
                      <span
                        key={category}
                        className={`text-xs px-1.5 py-0.5 rounded ${
                          currentVideoCategories.includes(category)
                            ? "bg-blue-900/30 text-blue-300"
                            : "bg-zinc-800 text-zinc-500"
                        }`}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
