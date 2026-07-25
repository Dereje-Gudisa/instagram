// apps/web/src/components/feed/SuggestionsBar.tsx
import React from 'react';

// Mock suggested accounts
const SUGGESTED_USERS = [
  {
    id: 's1',
    username: 'react_community',
    subtitle: 'Followed by alex_dev + 3 more',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
  },
  {
    id: 's2',
    username: 'theMad_official',
    subtitle: 'Suggested for you',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
  },
  {
    id: 's3',
    username: 'mrBeast',
    subtitle: 'Popular',
    avatarUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150',
  },
  {
    id: 's4',
    username: 'The Late night show',
    subtitle: 'Popular',
    avatarUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150',
  },
  {
    id: 's5',
    username: 'Adam W.',
    subtitle: 'Popular',
    avatarUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150',
  }
];

export function SuggestionsBar() {
  return (
    <aside className="hidden lg:block w-[320px] pl-8 pt-4 ml-10 mr-50 mt-8">
      {/* Current User Header */}
      <div className="flex items-center justify-between mb-6">
        <div className='flex items-center gap-3'>
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                alt="Current user avatar" 
                className="w-11 h-11 rounded-full object-cover border border-gray-200"/>
          <div className='text-sm'>
            <span className="font-semibold block leading-tight">alex_dev</span>
            <span className="text-gray-500 text-xs">Alex Developer</span>
          </div>
        </div>
        <button className="text-xs font-semibold text-blue-500 hover:text-blue-700">
          Switch
        </button>
        
      </div>

      {/* Suggested Section Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-semibold text-gray-500">Suggested for you</span>
        <button className="text-xs font-semibold text-gray-900 hover:text-gray-500">
          See All
        </button>
      </div>

      {/* Suggested Users List */}
      <div className="space-y-3 mb-6">

        {SUGGESTED_USERS.map((user) => (
          <div key={user.id} className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <img
                src={user.avatarUrl}
                alt={user.username}
                className="w-10 h-10 rounded-full object-cover"
              />  
              <div className="text-xs">
                <span className="font-semibold block leading-tight mb-1">{user.username}</span>
                <span className="text-gray-400 text-[12px]">{user.subtitle}</span>
              </div>
            </div>
            <button className="text-xs font-semibold text-blue-500 hover:text-blue-700">
              Follow
            </button>
          </div>
        ))}
      </div>

      {/* Footer Links */}
      <footer className="text-[11px] text-gray-500 space-y-3">
        <p className="leading-normal">
          About • Help • Press • API • Jobs • Privacy • Terms • Locations • Language • Meta Verified
        </p>
        <p>© 2026 INSTAGRAM FROM META</p>
      </footer>
    </aside>
  );
}