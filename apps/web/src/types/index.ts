export interface User {
  id: string;
  username: string;
  avatarUrl: string | null;
  bio?: string | null;
}

export interface Post {
  id: string;
  caption: string | null;
  mediaUrls: string[];
  author: User;
  _count: {
    likes: number;
    comments: number;
  };
  isLikedByMe: boolean;
  createdAt: string;
}

export interface Story {
  id: string;
  mediaUrl: string;
  user: User;
  hasUnseen: boolean;
  createdAt: string;
}

export interface Friends {
  id: string;
  username: string;
  name: string;
  avatarUrl: string;
}

export type NavTab = 'home' | 'search' | 'reels' | 'messages' | 'notifications' | 'create' | 'profile';
export interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}
export interface NavItem {
  id: NavTab;
  label: string;
  icon: React.ElementType;
  path: string;
}

//SearchPage
export interface ExplorePost {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
  caption: string;
  username: string;
  avatarUrl: string;
  isLarge?: boolean; // Controls 2x2 grid feature tile
}