import React, { useState, useRef } from 'react';
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Music2,
  Volume2,
  VolumeX,
  Play,
  MoreHorizontal,
  X,
} from 'lucide-react';

export interface Reel {
  id: string;
  videoUrl: string; // Or animated media / MP4
  posterUrl: string;
  user: {
    username: string;
    avatarUrl: string;
    isFollowing: boolean;
  };
  caption: string;
  audioTrack: string;
  likes: number;
  commentsCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
}

const MOCK_REELS: Reel[] = [
  {
    id: 'r1',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-vertical-shot-of-a-woman-coding-41527-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    user: {
      username: 'tech_vibes',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      isFollowing: false,
    },
    caption: 'Building React components at 2 AM hits different ☕💻 #developer #reactjs #coding',
    audioTrack: 'Original Audio - tech_vibes',
    likes: 24500,
    commentsCount: 312,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 'r2',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-drone-view-of-a-scenic-coastline-41611-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
    user: {
      username: 'drone_lens',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      isFollowing: true,
    },
    caption: 'Coastlines from above. Where should I fly next? 🌊🚁 #drone #travel #scenic',
    audioTrack: 'Chill Waves - Lofi Beats',
    likes: 89100,
    commentsCount: 1420,
    isLiked: true,
    isBookmarked: true,
  },
  {
    id: 'r3',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-latte-with-latte-art-41530-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800',
    user: {
      username: 'latte_artistry',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      isFollowing: false,
    },
    caption: 'Morning rosette pour ☕✨ Practice makes perfect! #barista #coffee',
    audioTrack: 'Morning Coffee - Instrumental',
    likes: 15300,
    commentsCount: 88,
    isLiked: false,
    isBookmarked: false,
  },
];

export const ReelsPage: React.FC = () => {
  const [reels, setReels] = useState<Reel[]>(MOCK_REELS);
  const [isMuted, setIsMuted] = useState(true);
  const [playingId, setPlayingId] = useState<string>('r1');
  const [activeCommentsReelId, setActiveCommentsReelId] = useState<string | null>(null);

  // Toggle Like
  const handleToggleLike = (reelId: string) => {
    setReels((prev) =>
      prev.map((reel) => {
        if (reel.id === reelId) {
          return {
            ...reel,
            isLiked: !reel.isLiked,
            likes: reel.isLiked ? reel.likes - 1 : reel.likes + 1,
          };
        }
        return reel;
      })
    );
  };

  // Toggle Bookmark
  const handleToggleBookmark = (reelId: string) => {
    setReels((prev) =>
      prev.map((reel) => (reel.id === reelId ? { ...reel, isBookmarked: !reel.isBookmarked } : reel))
    );
  };

  // Toggle Play/Pause
  const handleVideoClick = (reelId: string) => {
    setPlayingId((prev) => (prev === reelId ? '' : reelId));
  };

  return (
    <div className="w-full flex justify-center items-center h-[calc(100vh-1rem)] py-2">
      
      {/* Scrollable Container with Snapping */}
      <div className="w-full max-w-[420px] h-full overflow-y-scroll snap-y snap-mandatory scrollbar-none rounded-2xl shadow-2xl bg-black relative">
        
        {reels.map((reel) => {
          const isPlaying = playingId === reel.id;

          return (
            <div
              key={reel.id}
              className="relative w-full h-full snap-start snap-always flex-shrink-0 bg-gray-900 overflow-hidden flex items-center justify-center"
            >
              {/* Video Player */}
              <video
                src={reel.videoUrl}
                poster={reel.posterUrl}
                loop
                muted={isMuted}
                playsInline
                autoPlay={isPlaying}
                onClick={() => handleVideoClick(reel.id)}
                className="w-full h-full object-cover cursor-pointer"
              />

              {/* Play Pause Indicator Overlay */}
              {!isPlaying && (
                <div
                  onClick={() => handleVideoClick(reel.id)}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer pointer-events-auto"
                >
                  <div className="w-16 h-16 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                    <Play size={32} className="ml-1 fill-white" />
                  </div>
                </div>
              )}

              {/* Top Mute / Unmute Button */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              {/* RIGHT SIDEBAR: ACTION BUTTONS */}
              <div className="absolute right-3 bottom-12 flex flex-col items-center gap-5 z-20 text-white">
                
                {/* Like Button */}
                <button
                  onClick={() => handleToggleLike(reel.id)}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className="p-2.5 rounded-full bg-black/20 backdrop-blur-xs group-hover:bg-black/40 transition-colors">
                    <Heart
                      size={26}
                      className={`transition-transform duration-200 group-active:scale-125 ${
                        reel.isLiked ? 'fill-red-500 text-red-500' : 'text-white'
                      }`}
                    />
                  </div>
                  <span className="text-xs font-semibold mt-1">
                    {reel.likes >= 1000 ? `${(reel.likes / 1000).toFixed(1)}k` : reel.likes}
                  </span>
                </button>

                {/* Comment Button */}
                <button
                  onClick={() => setActiveCommentsReelId(reel.id)}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className="p-2.5 rounded-full bg-black/20 backdrop-blur-xs group-hover:bg-black/40 transition-colors">
                    <MessageCircle size={26} className="text-white" />
                  </div>
                  <span className="text-xs font-semibold mt-1">{reel.commentsCount}</span>
                </button>

                {/* Share Button */}
                <button className="flex flex-col items-center group cursor-pointer">
                  <div className="p-2.5 rounded-full bg-black/20 backdrop-blur-xs group-hover:bg-black/40 transition-colors">
                    <Send size={24} className="text-white -rotate-12" />
                  </div>
                </button>

                {/* Bookmark Button */}
                <button
                  onClick={() => handleToggleBookmark(reel.id)}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className="p-2.5 rounded-full bg-black/20 backdrop-blur-xs group-hover:bg-black/40 transition-colors">
                    <Bookmark
                      size={24}
                      className={reel.isBookmarked ? 'fill-white text-white' : 'text-white'}
                    />
                  </div>
                </button>

                {/* More Options */}
                <button className="p-2 rounded-full bg-black/20 backdrop-blur-xs hover:bg-black/40 transition-colors cursor-pointer">
                  <MoreHorizontal size={20} className="text-white" />
                </button>

                {/* Audio Disc Thumb */}
                <div className="w-8 h-8 rounded-lg overflow-hidden border-2 border-white/80 animate-spin-slow mt-2">
                  <img src={reel.user.avatarUrl} alt="audio" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* BOTTOM CREATOR DETAILS & CAPTION */}
              <div className="absolute bottom-0 left-0 right-14 p-4 z-20 text-white bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-12">
                
                {/* User Info Header */}
                <div className="flex items-center gap-3 mb-2.5">
                  <img
                    src={reel.user.avatarUrl}
                    alt={reel.user.username}
                    className="w-9 h-9 rounded-full border border-white/40 object-cover"
                  />
                  <span className="font-semibold text-sm drop-shadow-xs">{reel.user.username}</span>
                  <button className="text-xs font-semibold border border-white/60 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-xs cursor-pointer">
                    Follow
                  </button>
                </div>

                {/* Caption */}
                <p className="text-xs leading-relaxed text-gray-100 line-clamp-2 mb-3 drop-shadow-xs">
                  {reel.caption}
                </p>

                {/* Audio Track marquee indicator */}
                <div className="flex items-center gap-2 text-xs text-gray-200">
                  <Music2 size={13} className="animate-bounce" />
                  <span className="truncate max-w-[200px]">{reel.audioTrack}</span>
                </div>
              </div>

            </div>
          );
        })}

        {/* COMMENTS DRAWER OVERLAY */}
        {activeCommentsReelId && (
          <div className="absolute inset-x-0 bottom-0 top-1/3 bg-white text-gray-900 rounded-t-2xl z-30 flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="p-3 border-b border-gray-200 flex items-center justify-between">
              <span className="font-bold text-sm mx-auto">Comments</span>
              <button
                onClick={() => setActiveCommentsReelId(null)}
                className="absolute right-3 text-gray-500 hover:text-gray-800"
              >
                <X size={20} />
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              <div className="flex gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
                  alt="user"
                  className="w-7 h-7 rounded-full object-cover"
                />
                <div>
                  <p><span className="font-bold mr-1">alex_dev</span> Clean design! 🔥</p>
                  <span className="text-[10px] text-gray-400 mt-0.5 block">2h ago</span>
                </div>
              </div>
              <div className="flex gap-3">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
                  alt="user"
                  className="w-7 h-7 rounded-full object-cover"
                />
                <div>
                  <p><span className="font-bold mr-1">sarah_codes</span> Where did you record this?</p>
                  <span className="text-[10px] text-gray-400 mt-0.5 block">1h ago</span>
                </div>
              </div>
            </div>

            {/* Comment Input */}
            <div className="p-3 border-t border-gray-100 flex items-center gap-2">
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 text-xs bg-gray-100 rounded-full px-3 py-2 focus:outline-none"
              />
              <button className="text-blue-500 font-bold text-xs px-2">Post</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};