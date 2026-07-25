// apps/web/src/components/feed/StoriesTray.tsx
import React from 'react';
import type { Story } from '../../types';

const MOCK_STORIES: Story[] = [
  {
    id: 's1',
    mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
    hasUnseen: false,
    createdAt: new Date().toISOString(),
    user: {
      id: 'u1',
      username: 'alex_dev',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    },
  },
  {
    id: 's2',
    mediaUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    hasUnseen: true,
    createdAt: new Date().toISOString(),
    user: {
      id: 'u2',
      username: 'tech_insider',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
  },
  {
    id: 's3',
    mediaUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800',
    hasUnseen: true,
    createdAt: new Date().toISOString(),
    user: {
      id: 'u3',
      username: 'design_daily',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
  },
  {
    id: 's4',
    mediaUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
    hasUnseen: true,
    createdAt: new Date().toISOString(),
    user: {
      id: 'u4',
      username: 'coder_life',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    },
  },
  {
    id: 's5',
    mediaUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    hasUnseen: false,
    createdAt: new Date().toISOString(),
    user: {
      id: 'u5',
      username: 'react_devs',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    },
  },
  {
    id: 's5',
    mediaUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    hasUnseen: false,
    createdAt: new Date().toISOString(),
    user: {
      id: 'u5',
      username: 'react_devs',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    },
  },
  {
    id: 's5',
    mediaUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    hasUnseen: false,
    createdAt: new Date().toISOString(),
    user: {
      id: 'u5',
      username: 'react_devs',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    },
  },
  {
    id: 's5',
    mediaUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    hasUnseen: false,
    createdAt: new Date().toISOString(),
    user: {
      id: 'u5',
      username: 'react_devs',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    },
  },
];

export function StoriesTray() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 overflow-x-auto flex gap-4">
      {MOCK_STORIES.map((story) => {
        const isCurrentUser = story.user.id === 'u1';

        return (
          <button
            key={story.id}
            className="relative flex flex-col items-center min-w-[66px] focus:outline-none group cursor-pointer"
          >
            {/* Gradient / Gray Ring */}
            <div
              className={`p-[2px] rounded-full transition-transform group-hover:scale-105 ${
                story.hasUnseen
                  ? 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600'
                  : 'bg-gray-200'
              }`}
            >
              {/* Avatar Container */}
              <div className="p-[2px] bg-white rounded-full">
                <img
                  src={story.user.avatarUrl ?? 'https://via.placeholder.com/150'}
                  alt={story.user.username}
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
            </div>

            {/* Plus Icon Overlay for Current User */}
            {isCurrentUser && (
              <div className="absolute bottom-6 right-1 bg-blue-500 text-white rounded-full w-4 h-4 border-2 border-white flex items-center justify-center text-[10px] font-bold">
                +
              </div>
            )}

            {/* Username Label */}
            <span className="text-xs text-gray-700 mt-1.5 truncate max-w-[64px]">
              {isCurrentUser ? 'Your story' : story.user.username}
            </span>
          </button>
        );
      })}
    </div>
  );
}