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