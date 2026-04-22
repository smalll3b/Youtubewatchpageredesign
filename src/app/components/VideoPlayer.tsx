import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  Maximize,
  SkipBack,
  SkipForward,
} from "lucide-react";

interface VideoPlayerProps {
  onPlayPause?: (isPlaying: boolean) => void;
  onSeek?: (time: number) => void;
  externalTime?: number;
}

export function VideoPlayer({ onPlayPause, onSeek, externalTime }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Sync with external time changes (from transcript/chapter clicks)
  useEffect(() => {
    if (externalTime !== undefined && externalTime !== currentTime) {
      setCurrentTime(externalTime);
    }
  }, [externalTime]);
  const [duration] = useState(1245); // 20:45 in seconds
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState("1080p");
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();
  const volumeTimeoutRef = useRef<NodeJS.Timeout>();

  // Simulate video playback
  useEffect(() => {
    if (isPlaying && currentTime < duration) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => Math.min(prev + 1, duration));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentTime, duration]);

  const togglePlay = () => {
    const newState = !isPlaying;
    setIsPlaying(newState);
    onPlayPause?.(newState);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    onSeek?.(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = Number(e.target.value);
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const skip = (seconds: number) => {
    setCurrentTime((prev) => Math.max(0, Math.min(prev + seconds, duration)));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const handleVolumeHover = () => {
    setShowVolumeSlider(true);
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current);
    }
  };

  const handleVolumeLeave = () => {
    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolumeSlider(false);
    }, 500);
  };

  const qualities = ["2160p", "1440p", "1080p", "720p", "480p", "360p"];
  const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  return (
    <div
      className="w-full aspect-video bg-black rounded-lg overflow-hidden relative group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video Content */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-800 flex items-center justify-center">
        <div className="text-zinc-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="96"
            height="96"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" opacity="0.3" />
          </svg>
        </div>
      </div>

      {/* Center Play Button */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center z-10 group/play"
        >
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover/play:bg-white/30 transition-colors">
            <Play size={32} className="text-white ml-1" fill="white" />
          </div>
        </button>
      )}

      {/* Video Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-20 pb-2 px-4 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Progress Bar */}
        <div className="mb-2">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer progress-bar"
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          {/* Left Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isPlaying ? (
                <Pause size={20} className="text-white" fill="white" />
              ) : (
                <Play size={20} className="text-white" fill="white" />
              )}
            </button>

            <button
              onClick={() => skip(-10)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <SkipBack size={18} className="text-white" />
            </button>

            <button
              onClick={() => skip(10)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <SkipForward size={18} className="text-white" />
            </button>

            {/* Volume Control */}
            <div
              className="flex items-center gap-2 relative"
              onMouseEnter={handleVolumeHover}
              onMouseLeave={handleVolumeLeave}
            >
              <button
                onClick={toggleMute}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX size={18} className="text-white" />
                ) : (
                  <Volume2 size={18} className="text-white" />
                )}
              </button>

              {/* Volume Slider */}
              <div
                className={`absolute left-full ml-2 bottom-0 transition-all duration-200 ${
                  showVolumeSlider
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2 pointer-events-none"
                }`}
              >
                <div className="bg-zinc-900 rounded-lg p-2 flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer volume-slider"
                  />
                  <span className="text-white text-xs w-8">{isMuted ? 0 : volume}%</span>
                </div>
              </div>
            </div>

            <span className="text-white text-sm ml-2">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Playback Speed */}
            <div className="relative">
              <button
                onClick={() => setShowQualityMenu(!showQualityMenu)}
                className="px-3 py-1.5 hover:bg-white/10 rounded-lg transition-colors text-white text-sm"
              >
                {playbackSpeed}x
              </button>

              {showQualityMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-zinc-900 rounded-lg overflow-hidden shadow-xl min-w-[160px]">
                  <div className="p-2 border-b border-zinc-800">
                    <div className="text-white text-xs font-medium mb-2">Playback Speed</div>
                    {speeds.map((speed) => (
                      <button
                        key={speed}
                        onClick={() => {
                          setPlaybackSpeed(speed);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                          playbackSpeed === speed
                            ? "bg-zinc-800 text-white"
                            : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                        }`}
                      >
                        {speed === 1 ? "Normal" : `${speed}x`}
                      </button>
                    ))}
                  </div>
                  <div className="p-2">
                    <div className="text-white text-xs font-medium mb-2">Quality</div>
                    {qualities.map((quality) => (
                      <button
                        key={quality}
                        onClick={() => {
                          setSelectedQuality(quality);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                          selectedQuality === quality
                            ? "bg-zinc-800 text-white"
                            : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                        }`}
                      >
                        {quality}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Settings size={18} className="text-white" />
            </button>

            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Maximize size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .progress-bar::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .progress-bar:hover::-webkit-slider-thumb {
          opacity: 1;
        }

        .progress-bar::-webkit-slider-runnable-track {
          height: 4px;
          background: linear-gradient(
            to right,
            #ef4444 0%,
            #ef4444 ${(currentTime / duration) * 100}%,
            #3f3f46 ${(currentTime / duration) * 100}%,
            #3f3f46 100%
          );
          border-radius: 2px;
        }

        .volume-slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
        }

        .volume-slider::-webkit-slider-runnable-track {
          height: 4px;
          background: linear-gradient(
            to right,
            white 0%,
            white ${isMuted ? 0 : volume}%,
            #3f3f46 ${isMuted ? 0 : volume}%,
            #3f3f46 100%
          );
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
