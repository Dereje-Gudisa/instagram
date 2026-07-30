import React, { useState } from 'react';
import { Heart, MessageCircle, UserPlus, Sparkles, Check } from 'lucide-react';

export type NotificationType = 'like' | 'comment' | 'follow' | 'mention';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  user: {
    username: string;
    avatarUrl: string;
  };
  timeAgo: string;
  postMediaUrl?: string;
  commentText?: string;
  isFollowing?: boolean;
  timeframe: 'today' | 'this_week' | 'this_month';
}

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    type: 'like',
    user: {
      username: 'sarah_codes',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
    timeAgo: '15m',
    postMediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150',
    timeframe: 'today',
  },
  {
    id: 'n2',
    type: 'follow',
    user: {
      username: 'dev_guru',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
    timeAgo: '2h',
    isFollowing: false,
    timeframe: 'today',
  },
  {
    id: 'n3',
    type: 'comment',
    user: {
      username: 'alex_dev',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    },
    commentText: 'Awesome setup! Which editor font are you using? 🔥',
    timeAgo: '4h',
    postMediaUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=150',
    timeframe: 'today',
  },
  {
    id: 'n4',
    type: 'follow',
    user: {
      username: 'design_daily',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    },
    timeAgo: '2d',
    isFollowing: true,
    timeframe: 'this_week',
  },
  {
    id: 'n5',
    type: 'like',
    user: {
      username: 'jessica_t',
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    },
    timeAgo: '3d',
    postMediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150',
    timeframe: 'this_week',
  },
  {
    id: 'n6',
    type: 'mention',
    user: {
      username: 'tech_insider',
      avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
    },
    commentText: 'mentioned you in a comment: "@my_user check this out!"',
    timeAgo: '2w',
    postMediaUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=150',
    timeframe: 'this_month',
  },
];

export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'follows' | 'comments'>('all');

  // Follow/Unfollow toggle
  const toggleFollow = (id: string) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFollowing: !item.isFollowing } : item
      )
    );
  };

  // Filter items based on active tab button
  const filteredNotifications = notifications.filter((item) => {
    if (filter === 'follows') return item.type === 'follow';
    if (filter === 'comments') return item.type === 'comment' || item.type === 'mention';
    return true;
  });

  const todayItems = filteredNotifications.filter((i) => i.timeframe === 'today');
  const weekItems = filteredNotifications.filter((i) => i.timeframe === 'this_week');
  const monthItems = filteredNotifications.filter((i) => i.timeframe === 'this_month');

  const renderSection = (title: string, items: NotificationItem[]) => {
    if (items.length === 0) return null;

    return (
      <div className="mb-6">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
          {title}
        </h2>
        <div className="space-y-1">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-100/80 transition-colors"
            >
              {/* User Avatar & Badge */}
              <div className="flex items-center gap-3.5 min-w-0 pr-2">
                <div className="relative flex-shrink-0">
                  <img
                    src={item.user.avatarUrl}
                    alt={item.user.username}
                    className="w-11 h-11 rounded-full object-cover border border-gray-200"
                  />
                  <span className="absolute -bottom-1 -right-1 p-1 rounded-full text-white bg-white shadow-xs">
                    {item.type === 'like' && (
                      <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center block">
                        <Heart size={9} className="fill-white" />
                      </span>
                    )}
                    {item.type === 'comment' && (
                      <span className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center block">
                        <MessageCircle size={9} className="fill-white" />
                      </span>
                    )}
                    {item.type === 'follow' && (
                      <span className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center block">
                        <UserPlus size={9} className="fill-white" />
                      </span>
                    )}
                    {item.type === 'mention' && (
                      <span className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center block">
                        <Sparkles size={9} className="fill-white" />
                      </span>
                    )}
                  </span>
                </div>

                {/* Text Content */}
                <div className="text-sm min-w-0">
                  <p className="text-gray-900 leading-snug">
                    <span className="font-bold hover:underline cursor-pointer mr-1">
                      {item.user.username}
                    </span>
                    {item.type === 'like' && 'liked your post.'}
                    {item.type === 'follow' && 'started following you.'}
                    {item.type === 'comment' && (
                      <>
                        commented: <span className="text-gray-600">"{item.commentText}"</span>
                      </>
                    )}
                    {item.type === 'mention' && (
                      <span className="text-gray-600">{item.commentText}</span>
                    )}
                    <span className="text-xs text-gray-400 ml-1.5 whitespace-nowrap">
                      {item.timeAgo}
                    </span>
                  </p>
                </div>
              </div>

              {/* Action Button OR Media Thumbnail */}
              <div className="flex-shrink-0 ml-2">
                {item.type === 'follow' ? (
                  <button
                    onClick={() => toggleFollow(item.id)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      item.isFollowing
                        ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    {item.isFollowing ? (
                      <span className="flex items-center gap-1">
                        <Check size={12} /> Following
                      </span>
                    ) : (
                      'Follow Back'
                    )}
                  </button>
                ) : (
                  item.postMediaUrl && (
                    <img
                      src={item.postMediaUrl}
                      alt="post thumbnail"
                      className="w-11 h-11 rounded-lg object-cover border border-gray-200 cursor-pointer hover:opacity-90"
                    />
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto w-full py-4 px-3 md:px-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
        <h1 className="text-xl font-bold text-gray-900">Notifications</h1>

        {/* Filter Pills */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          {(['all', 'follows', 'comments'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 rounded-md text-xs font-semibold capitalize transition-all cursor-pointer ${
                filter === tab
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Lists */}
      {filteredNotifications.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-sm font-medium">No notifications yet.</p>
        </div>
      ) : (
        <div>
          {renderSection('Today', todayItems)}
          {renderSection('This Week', weekItems)}
          {renderSection('This Month', monthItems)}
        </div>
      )}
    </div>
  );
};