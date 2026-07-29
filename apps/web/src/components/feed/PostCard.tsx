import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, X, Search, Check } from 'lucide-react';
import type { Post } from '../../types';
import type { Friends } from '../../types';
interface PostCardProps {
  post: Post;
}



const MOCK_FRIENDS: Friends[] = [
  { id: 'f1', username: 'alex_dev', name: 'Alex Rivera', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
  { id: 'f2', username: 'tech_insider', name: 'Sarah Chen', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
  { id: 'f3', username: 'design_daily', name: 'Jessica Taylor', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
  { id: 'f4', username: 'coder_life', name: 'Marcus Vance', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
];

export function PostCard({ post }: PostCardProps) {
  // Local state to handle optimistic like toggling before backend integration
   const [isLiked, setIsLiked] = useState(post.isLikedByMe);
   const [likesCount, setLikesCount] = useState(post._count.likes);
   const [messagesCount, setMessagesCount] = useState(post._count.comments);

   // Share modal state
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFriendIds, setSelectedFriendIds] = useState<string[]>([]);
  const [isSent, setIsSent] = useState(false);

   // Filter friends list based on search query
  const filteredFriends = MOCK_FRIENDS.filter(
    (friend) =>
      friend.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle selection for a friend
  const toggleSelectFriend = (id: string) => {
    setSelectedFriendIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Send handler
  const handleSend = () => {
    if (selectedFriendIds.length === 0) return;

    // Simulate sending message
    setIsSent(true);

    setTimeout(() => {
      // Reset state and close modal after 1.5s
      setIsSent(false);
      setIsShareOpen(false);
      setSelectedFriendIds([]);
      setSearchQuery('');
    }, 1200);
  };


  const handleLikeToggle = () => {
    setIsLiked((prev) => !prev);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };
    // Add state for comment input
  const [showCommentInput, setShowCommentInput] = useState(false);


  const [commentText, setCommentText] = useState('');

  const commentInputRef = useRef<HTMLInputElement>(null);
  const handleCommentClick = () => {
    commentInputRef.current?.focus();
    setShowCommentInput((prev) => !prev)
  };

  useEffect(() => {
    if (showCommentInput) {
      commentInputRef.current?.focus();
    }
  }, [showCommentInput]);


  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    // Optimistically increment comment count
    setMessagesCount((prev) => prev + 1);
    setCommentText('');
  };
 

  // Toggle handler
  const initialIsSaved: boolean = false;
  const [isSaved, setIsSaved] = useState(initialIsSaved);

  const handleSaveToggle = () => {
    setIsSaved((prev) => !prev);
  };

  return (
    <article className="bg-white border border-gray-200 rounded-lg mb-4 overflow-hidden">
      {/* Post header content */}
      
      {/* POST HEADER */}

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
          <div className="text-[13px] text-gray-400 tracking-wide">
            <span className='text-[15px]'>● 3h</span>
          </div>
        </div>

        <button className="text-gray-500 hover:text-black focus:outline-none">
          <MoreHorizontal size={20} />
        </button>
      </div>
      {/* MEDIA / IMAGE DISPLAY */}

      <div className='aspect-square w-full bg-black flex items-center justify-center overflow-hidden'>
        <img src={post.mediaUrls[0]} alt="Post media" className="w-full h-full object-cover " 
        onDoubleClick={ () => !isLiked && handleLikeToggle()}/>
      </div>
      
      {/* ACTION BAR */}
      <div className="p-3 ">
        <div className="flex justify-between items-center ">
          {/* Left action icons */}
          <div className="flex items-center gap-4">
            {/* Like Button */}
            <button
              className="flex focus:outline-none transition-transform active:scale-125"
              aria-label="Like post"
              onClick={handleLikeToggle}
            >
              <Heart
                size={24}
                className={
                  isLiked
                    ? 'fill-red-500 stroke-red-500 mr-2'
                    : 'text-black hover:opacity-60 mr-2'
                }
              />

              {likesCount > 0 && (
                <div className="font-semibold text-l black">
                  {likesCount.toLocaleString()}
                  </div>
                )}
              
            </button>

            {/* Comment Button */}
            <button
              className="flex text-black hover:opacity-60 focus:outline-none"
              aria-label="Comment" onClick={handleCommentSubmit}
            >
              <MessageCircle size={24} className='mr-2' onClick={handleCommentClick}/>

              {messagesCount > 0 && (
                <div className="font-semibold text-l">
                  {messagesCount.toLocaleString()}
                  </div>
                )}
            </button>
            

            {/* Share / Direct Message Button */}
            <button
              className="text-black hover:opacity-60 focus:outline-none"
              aria-label="Share"
              onClick={() => setIsShareOpen(true)}
            >
              <Send size={24} />
            </button>
          </div>

          {/* Right action icon (Bookmark) */}
          <button
            className="text-black hover:opacity-60 focus:outline-none"
            aria-label="Save post"
            onClick={handleSaveToggle}
          >
            <Bookmark size={24} className={`transition-colors duration-200 ${
              isSaved ? 'fill-gray-900 text-gray-900' : 'text-gray-900'
            }`} />
          </button>
        </div>

        {/* 4. CAPTION SECTION */}

        {post.caption && (
          <div className="text-sm text-gray-900 mb-1 mt-3 text-start">
            <span className="font-semibold mr-2">{post.author.username}</span>
            <span>{post.caption}</span>
          </div>
        )}

      </div>
      {/* comment section */}
        <form
        onSubmit={handleCommentSubmit}
        className={`${showCommentInput ? 'flex' : 'hidden'} items-center justify-between border-t border-gray-100 px-4 py-3 transition-all` }
      >
        <span className='text-2xl p-0 m-0'>😊</span>
        <input
          ref={commentInputRef}
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="w-full text-sm placeholder-gray-400 focus:outline-none bg-transparent pl-5 pr-2"
        />
        
        <button
          type="submit"
          disabled={!commentText.trim()}
          className={`text-sm font-semibold transition-opacity ${
            commentText.trim()
              ? 'text-blue-500 hover:text-blue-700 cursor-pointer'
              : 'text-blue-300 cursor-not-allowed opacity-60'
          }`}
        >
          Post
        </button>
      </form>

      {/* --- SHARE WITH FRIENDS MODAL --- */}

      {isShareOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white w-full max-w-sm rounded-xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[80vh]">
            
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900 text-base">Share to Direct</h3>
              <button
                onClick={() => setIsShareOpen(false)}
                className="text-gray-500 hover:text-gray-800 focus:outline-none cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                <Search size={16} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search friends..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Friends List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredFriends.length === 0 ? (
                <p className="text-center text-gray-400 text-sm py-6">No friends found</p>
              ) : (
                filteredFriends.map((friend) => {
                  const isSelected = selectedFriendIds.includes(friend.id);

                  return (
                    <div
                      key={friend.id}
                      onClick={() => toggleSelectFriend(friend.id)}
                      className="flex items-center justify-between p-2.5 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={friend.avatarUrl}
                          alt={friend.username}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-semibold text-gray-900 leading-none">
                            {friend.username}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{friend.name}</p>
                        </div>
                      </div>

                      {/* Custom Radio / Checkbox Circle */}
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-blue-500 border-blue-500 text-white'
                            : 'border-gray-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Send Action Footer */}
            <div className="p-3 border-t border-gray-100 bg-gray-50">
              <button
                onClick={handleSend}
                disabled={selectedFriendIds.length === 0 || isSent}
                className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                  isSent
                    ? 'bg-green-500 text-white'
                    : selectedFriendIds.length > 0
                    ? 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer shadow-md'
                    : 'bg-blue-200 text-white cursor-not-allowed'
                }`}
              >
                {isSent ? 'Sent!' : `Send ${selectedFriendIds.length ? `(${selectedFriendIds.length})` : ''}`}
              </button>
            </div>

          </div>
        </div>
      )}

    </article>
    
  );

}