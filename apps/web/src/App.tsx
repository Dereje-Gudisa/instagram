import { useState } from 'react'
import { type NavTab } from './types';
import { Sidebar } from './components/layout/Sidebar';
import './App.css'
import { PostCard } from './components/feed/PostCard';
import type { Post } from './types';
import { SuggestionsBar } from './components/feed/SuggestionsBar';
import { StoriesTray } from './components/feed/StoriesTray';
import { MessagesPage } from './components/pages/MessagesPage';
import { SearchPage } from './components/pages/SearchPage';
import { ReelsPage } from './components/pages/ReelsPage';
import { NotificationsPage } from './components/pages/NotificationsPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { CreatePostModal } from './components/modals/CreatePostModal';

// Mock post data for testing UI rendering
const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    caption: 'Building an Instagram clone with React 19, Tailwind v4, and TypeScript! 🚀',
    mediaUrls: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    ],
    author: {
      id: 'u1',
      username: 'alex_dev',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    },
    _count: { likes: 142, comments: 12 },
    isLikedByMe: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p2',
    caption: 'Late night coding sessions & fresh coffee ☕💻',
    mediaUrls: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    ],
    author: {
      id: 'u2',
      username: 'sarah_codes',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
    _count: { likes: 89, comments: 4 },
    isLikedByMe: true,
    createdAt: new Date().toISOString(),
  },
];

const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    caption: 'Building an Instagram clone with React 19, Tailwind v4, and TypeScript! 🚀',
    mediaUrls: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    ],
    author: {
      id: 'u1',
      username: 'alex_dev',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    },
    _count: { likes: 142, comments: 12 },
    isLikedByMe: false,
    createdAt: new Date().toISOString(),
  },
];

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);

  const handlePostCreated = (newPost: Post) => {
    setPosts([newPost, ...posts]);
    setActiveTab('home'); // Redirect back to Home feed
  };
  
  // 1. Create a tab change handler
  const handleTabChange = (tab: NavTab) => {
    if (tab === 'create') {
      setIsCreateModalOpen(true);
    } else {
      setActiveTab(tab);
    }
  };
  
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex">
      {/* Responsive Navigation Shell */}
      <Sidebar activeTab={activeTab} setActiveTab={handleTabChange}/>

      {/* Main Content Area (Offset for Desktop Sidebar & Mobile Bottom Bar) */}

      <main className="flex-1 md:ml-16 xl:ml-64 pb-16 md:pb-0 flex justify-center p-4">
        {activeTab === 'home' && (
        <>
          <div className="max-w-[650px] w-full pt-4 border border-gray-300 ">
              {/*<StoriesTray />*/}
            <StoriesTray />
            <div className="p-8 ml-[80px] border border-dashed border-gray-300 rounded bg-white text-center text-gray-500 max-w-[470px] ">
              <div>
              {MOCK_POSTS.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
              </div>
            </div>
          </div>
          <SuggestionsBar />
          </>

          )}

          {/* Search TAB */}
          {activeTab === 'search' && <SearchPage />}

          {/* reels TAB */}
          {activeTab === 'reels' && <ReelsPage />}

          {/* MESSAGES TAB */}
          {activeTab === 'messages' && <MessagesPage />}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && <NotificationsPage />}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && <ProfilePage />}
        </main>
        
        {/* CREATE POST MODAL */}
        <CreatePostModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onPostCreated={handlePostCreated}
        />
        
      </div>
    </>
  )
}

export default App
