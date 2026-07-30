import React, { useState } from 'react';
import { Search, Heart, MessageCircle, X, Sparkles, TrendingUp } from 'lucide-react';
import { type ExplorePost } from '../../types';


const MOCK_EXPLORE_POSTS: ExplorePost[] = [
  {
    id: 'e1',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    likes: 1240,
    comments: 89,
    caption: 'Exploring abstract digital architecture 🏙️',
    username: 'arch_design',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    isLarge: true,
  },
  {
    id: 'e2',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    likes: 850,
    comments: 42,
    caption: 'Late night workspace setup ☕',
    username: 'dev_spaces',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  },
  {
    id: 'e3',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    likes: 3420,
    comments: 156,
    caption: 'Sunset reflecting over Yosemite Valley 🌄',
    username: 'nature_lens',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  },
  {
    id: 'e4',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80',
    likes: 920,
    comments: 31,
    caption: 'Fresh Mediterranean salad bowl 🥗',
    username: 'foodie_craze',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
  },
  {
    id: 'e5',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
    likes: 2150,
    comments: 112,
    caption: 'Northern lights over Iceland skies 🌌',
    username: 'astro_daily',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
  },
  {
    id: 'e6',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80',
    likes: 1890,
    comments: 74,
    caption: 'Minimalist summer outfit drops 🧵',
    username: 'style_vibe',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    isLarge: true,
  },
  {
    id: 'e7',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    likes: 4120,
    comments: 201,
    caption: 'Cyberpunk street views in Tokyo 🏮',
    username: 'tokyo_nights',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  },
  {
    id: 'e8',
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80',
    likes: 670,
    comments: 28,
    caption: 'Handcrafted iced matcha latte 🍵',
    username: 'cafe_vibes',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  },
];

const SEARCH_TAGS = ['For You', 'Architecture', 'Coding', 'Travel', 'Food', 'Style', 'Nature'];

export const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState('For You');
  const [selectedPost, setSelectedPost] = useState<ExplorePost | null>(null);

  // Filter posts based on search input or active filter tag
  const filteredPosts = MOCK_EXPLORE_POSTS.filter((post) => {
    const matchesSearch =
      post.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.username.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag =
      activeTag === 'For You' ||
      post.caption.toLowerCase().includes(activeTag.toLowerCase());

    return matchesSearch && matchesTag;
  });

  return (
    <div className="max-w-5xl mx-auto w-full py-4 px-2 md:px-6">
      
      {/* ================= SEARCH BAR & TAGS ================= */}
      <div className="mb-6 space-y-4">
        {/* Search Input */}
        <div className="relative max-w-md mx-auto">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search accounts, tags, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 hover:bg-gray-200/70 focus:bg-white text-sm pl-10 pr-10 py-2.5 rounded-xl border border-transparent focus:border-gray-300 focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
          {SEARCH_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTag === tag
                  ? 'bg-gray-900 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag === 'For You' && <Sparkles size={12} className="inline mr-1 -mt-0.5" />}
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ================= EXPLORE GRID ================= */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <TrendingUp size={40} className="mx-auto mb-2 opacity-40" />
          <p className="text-sm font-medium">No posts found matching "{searchQuery || activeTag}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-1 md:gap-4 auto-rows-[120px] sm:auto-rows-[180px] md:auto-rows-[240px]">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className={`group relative overflow-hidden bg-gray-100 cursor-pointer rounded-sm md:rounded-md ${
                post.isLarge ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
              }`}
            >
              {/* Post Thumbnail */}
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Hover Overlay with Likes & Comments */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold text-sm md:text-base">
                <div className="flex items-center gap-1.5">
                  <Heart size={20} className="fill-white" />
                  <span>{post.likes >= 1000 ? `${(post.likes / 1000).toFixed(1)}k` : post.likes}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageCircle size={20} className="fill-white" />
                  <span>{post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= POST PREVIEW MODAL ================= */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedPost(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none cursor-pointer"
          >
            <X size={28} />
          </button>

          <div className="bg-white rounded-xl overflow-hidden max-w-3xl w-full max-h-[85vh] flex flex-col md:flex-row shadow-2xl">
            {/* Modal Image */}
            <div className="bg-black md:w-3/5 flex items-center justify-center max-h-[50vh] md:max-h-none">
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.caption}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Modal Right Sidebar */}
            <div className="md:w-2/5 p-4 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-200">
              {/* Author Header */}
              <div>
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <img
                    src={selectedPost.avatarUrl}
                    alt={selectedPost.username}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-sm text-gray-900">{selectedPost.username}</p>
                    <p className="text-xs text-blue-500 font-semibold cursor-pointer">Follow</p>
                  </div>
                </div>

                {/* Caption */}
                <div className="py-4 text-sm text-gray-800">
                  <span className="font-bold mr-2">{selectedPost.username}</span>
                  {selectedPost.caption}
                </div>
              </div>

              {/* Like / Comment Stats Footer */}
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <div className="flex items-center gap-4 text-gray-700">
                  <button className="hover:text-red-500 transition-colors cursor-pointer">
                    <Heart size={22} />
                  </button>
                  <button className="hover:text-blue-500 transition-colors cursor-pointer">
                    <MessageCircle size={22} />
                  </button>
                </div>
                <p className="font-bold text-sm text-gray-900">{selectedPost.likes.toLocaleString()} likes</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};