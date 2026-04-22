import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  ListPlus,
  Download,
  MoreHorizontal,
  Check,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Playlist {
  id: number;
  name: string;
  videoCount: number;
  category: string;
  hasSavedCurrentVideo: boolean;
}

export function VideoInfo() {
  const videoTitle = "The Future of Web Development: Modern Tools and Techniques";
  const videoCategory = "Web Development";
  
  const [playlists, setPlaylists] = useState<Playlist[]>([
    { id: 1, name: "Study", videoCount: 24, category: "education", hasSavedCurrentVideo: false },
    { id: 2, name: "Watch Later", videoCount: 152, category: "general", hasSavedCurrentVideo: false },
    { id: 3, name: "Favorites", videoCount: 89, category: "general", hasSavedCurrentVideo: false },
    { id: 4, name: "Web Development", videoCount: 67, category: "web development", hasSavedCurrentVideo: false },
    { id: 5, name: "Tutorials", videoCount: 45, category: "tutorial", hasSavedCurrentVideo: false },
    { id: 6, name: "Music", videoCount: 203, category: "music", hasSavedCurrentVideo: false },
  ]);

  const savedPlaylistsCount = playlists.filter(p => p.hasSavedCurrentVideo).length;

  const handleSaveClick = () => {
    const videoLower = videoTitle.toLowerCase();
    const categoryLower = videoCategory.toLowerCase();
    
    // If already saved, allow unsaving
    if (savedPlaylistsCount > 0) {
      const savedPlaylists = playlists.filter(p => p.hasSavedCurrentVideo);
      
      setPlaylists(prev =>
        prev.map(playlist => {
          if (playlist.hasSavedCurrentVideo) {
            const newCount = Math.max(0, playlist.videoCount - 1);
            
            toast.info(
              <div className="flex flex-col gap-1">
                <div className="font-medium">Removed from {playlist.name}</div>
                <div className="text-sm text-zinc-400">{newCount} video{newCount !== 1 ? 's' : ''}</div>
              </div>
            );
            
            return { ...playlist, hasSavedCurrentVideo: false, videoCount: newCount };
          }
          return playlist;
        })
      );
      return;
    }
    
    // Find relevant playlists based on matching
    let relevantPlaylists = playlists.filter(playlist => {
      if (playlist.hasSavedCurrentVideo) return false; // Skip already saved
      
      const playlistLower = playlist.name.toLowerCase();
      const playlistCategory = playlist.category.toLowerCase();
      
      return (
        playlistLower.includes(categoryLower) ||
        playlistCategory.includes(categoryLower) ||
        (videoLower.includes("tutorial") && playlistLower.includes("tutorial")) ||
        (videoLower.includes("web") && (playlistLower.includes("web") || playlistCategory.includes("web"))) ||
        (videoLower.includes("development") && (playlistLower.includes("development") || playlistCategory.includes("development")))
      );
    });

    // If no relevant playlists found, create a new one based on video category
    if (relevantPlaylists.length === 0 && savedPlaylistsCount === 0) {
      const newPlaylist: Playlist = {
        id: Date.now(),
        name: videoCategory,
        videoCount: 1,
        category: categoryLower,
        hasSavedCurrentVideo: true,
      };
      
      setPlaylists(prev => [newPlaylist, ...prev]);
      
      toast.success(
        <div className="flex flex-col gap-1">
          <div className="font-medium">Created and saved to {newPlaylist.name}</div>
          <div className="text-sm text-zinc-400">1 video</div>
        </div>
      );
      return;
    }

    // Save to all relevant playlists
    if (relevantPlaylists.length > 0) {
      setPlaylists(prev =>
        prev.map(playlist => {
          if (relevantPlaylists.some(rp => rp.id === playlist.id)) {
            const newCount = playlist.videoCount + 1;
            
            toast.success(
              <div className="flex flex-col gap-1">
                <div className="font-medium">Saved to {playlist.name}</div>
                <div className="text-sm text-zinc-400">{newCount} video{newCount !== 1 ? 's' : ''}</div>
              </div>
            );
            
            return { ...playlist, hasSavedCurrentVideo: true, videoCount: newCount };
          }
          return playlist;
        })
      );
    }
  };

  return (
    <div className="space-y-4">
      {/* Video Title */}
      <h1 className="text-xl text-white">
        The Future of Web Development: Modern Tools and Techniques
      </h1>

      {/* Channel Info and Action Buttons */}
      <div className="flex items-center justify-between gap-4">
        {/* Channel Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0"></div>
          <div className="flex flex-col">
            <span className="text-white text-sm font-medium">Tech Insights</span>
            <span className="text-zinc-400 text-xs">2.4M subscribers</span>
          </div>
          <button className="ml-4 px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors">
            Subscribe
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Like/Dislike */}
          <div className="flex items-center bg-zinc-800 rounded-full overflow-hidden">
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-700 transition-colors">
              <ThumbsUp size={18} className="text-white" />
              <span className="text-white text-sm">24K</span>
            </button>
            <div className="w-px h-6 bg-zinc-700"></div>
            <button className="px-4 py-2 hover:bg-zinc-700 transition-colors">
              <ThumbsDown size={18} className="text-white" />
            </button>
          </div>

          {/* Share */}
          <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors">
            <Share2 size={18} className="text-white" />
            <span className="text-white text-sm">Share</span>
          </button>

          {/* Save to Playlist */}
          <button
            onClick={handleSaveClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors relative ${
              savedPlaylistsCount > 0 
                ? "bg-blue-600 hover:bg-blue-700" 
                : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
            {savedPlaylistsCount > 0 ? (
              <Check size={18} className="text-white" />
            ) : (
              <ListPlus size={18} className="text-white" />
            )}
            <span className="text-white text-sm">
              {savedPlaylistsCount > 0 ? `Saved (${savedPlaylistsCount})` : "Save"}
            </span>
          </button>

          {/* Download */}
          <button className="flex flex-col items-center gap-1 px-3 py-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors">
            <Download size={18} className="text-white" />
            <span className="text-white text-xs">Download</span>
          </button>

          {/* More */}
          <button className="flex flex-col items-center gap-1 px-3 py-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors">
            <MoreHorizontal size={18} className="text-white" />
            <span className="text-white text-xs">More</span>
          </button>
        </div>
      </div>

      {/* Video Description */}
      <div className="bg-zinc-900 rounded-lg p-4">
        <div className="flex items-center gap-4 text-xs text-zinc-400 mb-2">
          <span>1,245,678 views</span>
          <span>Apr 5, 2026</span>
        </div>
        <p className="text-sm text-zinc-300 leading-relaxed">
          Explore the latest trends in web development, including modern frameworks, 
          tools, and best practices that are shaping the future of the web. Learn 
          about performance optimization, accessibility, and creating delightful user 
          experiences.
          <button className="text-zinc-400 hover:text-white ml-2">...more</button>
        </p>
      </div>
    </div>
  );
}