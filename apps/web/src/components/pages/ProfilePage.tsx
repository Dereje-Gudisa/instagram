import React, { useState } from 'react';
import {
  Grid,
  Clapperboard,
  Bookmark,
  UserCheck,
  Settings,
  Plus,
  Heart,
  MessageCircle,
  Link as LinkIcon,
  X,
} from 'lucide-react';

export interface UserProfile {
  id: string;
  username: string;
  fullName: string;
  avatarUrl: string;
  bio: string;
  websiteUrl: string;
  stats: {
    postsCount: number;
    followersCount: number;
    followingCount: number;
  };
  highlights: Array<{
    id: string;
    title: string;
    coverUrl: string;
  }>;
}

export interface ProfilePost {
  id: string;
  type: 'post' | 'reel';
  imageUrl: string;
  likes: number;
  comments: number;
  caption: string;
}

const MOCK_PROFILE: UserProfile = {
  id: 'u_me',
  username: 'alex_dev',
  fullName: 'Alex River | Fullstack Developer',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
  bio: '💻 Building web apps with React, TS & Tailwind v4\n🚀 Passionate about clean code & UX\n📍 San Francisco, CA',
  websiteUrl: 'https://github.com',
  stats: {
    postsCount: 24,
    followersCount: 1420,
    followingCount: 380,
  },
  highlights: [
    {
      id: 'h1',
      title: 'Setups ☕',
      coverUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=150',
    },
    {
      id: 'h2',
      title: 'Projects 🚀',
      coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150',
    },
    {
      id: 'h3',
      title: 'Travels ✈️',
      coverUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=150',
    },
  ],
};

const MOCK_PROFILE_POSTS: ProfilePost[] = [
  {
    id: 'pp1',
    type: 'post',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    likes: 142,
    comments: 12,
    caption: 'Building an Instagram clone with React 19, Tailwind v4, and TypeScript! 🚀',
  },
  {
    id: 'pp2',
    type: 'post',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    likes: 89,
    comments: 4,
    caption: 'Late night coding sessions & fresh coffee ☕💻',
  },
  {
    id: 'pp3',
    type: 'reel',
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80',
    likes: 2310,
    comments: 45,
    caption: 'Morning coffee routine pour technique 🍵',
  },
  {
    id: 'pp4',
    type: 'post',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    likes: 310,
    comments: 18,
    caption: 'Exploring Matrix terminal aesthetics in Neovim 🟢',
  },
  {
    id: 'pp5',
    type: 'reel',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    likes: 1840,
    comments: 92,
    caption: 'Sunset drone flights over the coast 🌅',
  },
  {
    id: 'pp6',
    type: 'post',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80',
    likes: 95,
    comments: 7,
    caption: 'Minimalist developer workspace aesthetics 🖥️',
  },
];

export const ProfilePage = () => {
  const [activeGridTab, setActiveGridTab] = useState<'posts' | 'reels' | 'saved'>('posts');
  const [selectedPost, setSelectedPost] = useState<ProfilePost | null>(null);

  const displayedPosts = MOCK_PROFILE_POSTS.filter((post) => {
    if (activeGridTab === 'reels') return post.type === 'reel';
    return true; // For posts and saved mock views
  });

  return (
    <div className="max-w-4xl mx-auto w-full py-6 px-4 md:px-8">
      
      {/* ================= HEADER SECTION ================= */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-12 pb-8 border-b border-gray-200">
        
        {/* Avatar with Gradient Ring */}
        <div className="relative flex-shrink-0">
          <div className="p-1 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
            <img
              src={MOCK_PROFILE.avatarUrl}
              alt={MOCK_PROFILE.username}
              className="w-24 h-24 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-white"
            />
          </div>
        </div>

        {/* Profile Info Details */}
        <div className="flex-1 text-center sm:text-left space-y-4">
          
          {/* Username & Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <h1 className="text-xl font-normal text-gray-900">{MOCK_PROFILE.username}</h1>
            <div className="flex items-center gap-2">
              <button className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold text-sm rounded-lg transition-colors cursor-pointer">
                Edit profile
              </button>
              <button className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold text-sm rounded-lg transition-colors cursor-pointer">
                View archive
              </button>
              <button className="p-2 text-gray-700 hover:text-gray-900 cursor-pointer">
                <Settings size={20} />
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex justify-center sm:justify-start gap-8 text-sm">
            <div>
              <span className="font-bold text-gray-900">{MOCK_PROFILE.stats.postsCount}</span>{' '}
              <span className="text-gray-600">posts</span>
            </div>
            <div className="cursor-pointer">
              <span className="font-bold text-gray-900">
                {MOCK_PROFILE.stats.followersCount.toLocaleString()}
              </span>{' '}
              <span className="text-gray-600">followers</span>
            </div>
            <div className="cursor-pointer">
              <span className="font-bold text-gray-900">{MOCK_PROFILE.stats.followingCount}</span>{' '}
              <span className="text-gray-600">following</span>
            </div>
          </div>

          {/* Full Name & Bio */}
          <div className="text-sm space-y-1">
            <p className="font-bold text-gray-900">{MOCK_PROFILE.fullName}</p>
            <p className="whitespace-pre-line text-gray-800 leading-relaxed">
              {MOCK_PROFILE.bio}
            </p>
            {MOCK_PROFILE.websiteUrl && (
              <a
                href={MOCK_PROFILE.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center sm:justify-start gap-1 text-blue-900 font-semibold hover:underline pt-1"
              >
                <LinkIcon size={13} />
                {MOCK_PROFILE.websiteUrl.replace('https://', '')}
              </a>
            )}
          </div>

        </div>
      </div>

      {/* ================= STORY HIGHLIGHTS ================= */}
      <div className="flex items-center gap-6 py-6 overflow-x-auto scrollbar-none border-b border-gray-200">
        {MOCK_PROFILE.highlights.map((h) => (
          <div key={h.id} className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer group">
            <div className="p-0.5 rounded-full border border-gray-300 group-hover:border-gray-400 transition-colors">
              <img
                src={h.coverUrl}
                alt={h.title}
                className="w-16 h-16 rounded-full object-cover p-0.5 bg-white"
              />
            </div>
            <span className="text-xs font-medium text-gray-800">{h.title}</span>
          </div>
        ))}

        {/* Add New Highlight */}
        <div className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer">
          <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
            <Plus size={24} className="text-gray-400" />
          </div>
          <span className="text-xs font-medium text-gray-800">New</span>
        </div>
      </div>

      {/* ================= CONTENT TABS ================= */}
      <div className="flex justify-center gap-12 border-b border-gray-200 text-xs font-semibold tracking-wider text-gray-400 uppercase">
        <button
          onClick={() => setActiveGridTab('posts')}
          className={`flex items-center gap-2 py-3 border-t-2 transition-all cursor-pointer ${
            activeGridTab === 'posts'
              ? 'border-gray-900 text-gray-900'
              : 'border-transparent hover:text-gray-600'
          }`}
        >
          <Grid size={14} /> POSTS
        </button>
        <button
          onClick={() => setActiveGridTab('reels')}
          className={`flex items-center gap-2 py-3 border-t-2 transition-all cursor-pointer ${
            activeGridTab === 'reels'
              ? 'border-gray-900 text-gray-900'
              : 'border-transparent hover:text-gray-600'
          }`}
        >
          <Clapperboard size={14} /> REELS
        </button>
        <button
          onClick={() => setActiveGridTab('saved')}
          className={`flex items-center gap-2 py-3 border-t-2 transition-all cursor-pointer ${
            activeGridTab === 'saved'
              ? 'border-gray-900 text-gray-900'
              : 'border-transparent hover:text-gray-600'
          }`}
        >
          <Bookmark size={14} /> SAVED
        </button>
      </div>

      {/* ================= POSTS GRID ================= */}
      <div className="grid grid-cols-3 gap-1 sm:gap-4 py-4">
        {displayedPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="group relative aspect-square bg-gray-100 overflow-hidden cursor-pointer rounded-xs sm:rounded-md"
          >
            <img
              src={post.imageUrl}
              alt={post.caption}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Reel Badge Icon */}
            {post.type === 'reel' && (
              <div className="absolute top-2 right-2 text-white drop-shadow-md">
                <Clapperboard size={18} />
              </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold text-sm sm:text-base">
              <div className="flex items-center gap-1.5">
                <Heart size={20} className="fill-white" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageCircle size={20} className="fill-white" />
                <span>{post.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= POST PREVIEW MODAL ================= */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedPost(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 cursor-pointer"
          >
            <X size={28} />
          </button>

          <div className="bg-white rounded-xl overflow-hidden max-w-3xl w-full max-h-[85vh] flex flex-col md:flex-row shadow-2xl">
            <div className="bg-black md:w-3/5 flex items-center justify-center max-h-[50vh] md:max-h-none">
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.caption}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="md:w-2/5 p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <img
                    src={MOCK_PROFILE.avatarUrl}
                    alt={MOCK_PROFILE.username}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <p className="font-bold text-sm text-gray-900">{MOCK_PROFILE.username}</p>
                </div>
                <div className="py-4 text-sm text-gray-800">
                  <span className="font-bold mr-2">{MOCK_PROFILE.username}</span>
                  {selectedPost.caption}
                </div>
              </div>
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <p className="font-bold text-sm text-gray-900">{selectedPost.likes} likes</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};