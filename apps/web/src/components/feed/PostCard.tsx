import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import type { Post } from '../../types';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  // Local state to handle optimistic like toggling before backend integration
  // const [isLiked, setIsLiked] = useState(post.isLikedByMe);
  // const [likesCount, setLikesCount] = useState(post._count.likes);

  // const handleLikeToggle = () => {
  //   setIsLiked((prev) => !prev);
  //   setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  // };
  

  return (
    <article className="bg-white border border-gray-200 rounded-lg mb-4 overflow-hidden">
      {/* Post header content */}
      
      {/* 1. POST HEADER */}
      <div className="flex items-center justify-between p-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
            <img
              src={post.author.avatarUrl ?? 'https://via.placeholder.com/150'}
              alt={post.author.username}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-semibold text-sm">{post.author.username}</span>
        </div>

        <button className="text-gray-500 hover:text-black focus:outline-none">
          <MoreHorizontal size={20} />
        </button>
      </div>
      {/* 2. MEDIA / IMAGE DISPLAY */}

      <div className='aspect-square w-full bg-black flex items-center justify-center overflow-hidden'>
        <img src={post.mediaUrls[0]} alt="Post media" className="w-full h-full object-cover" />
      </div>
      
    </article>
  );

}