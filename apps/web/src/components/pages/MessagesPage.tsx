import React, { useState } from 'react';
import { Search, Phone, Video, Info, Image, Heart, Send, CheckCheck } from 'lucide-react';

interface DirectMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  user: {
    id: string;
    username: string;
    name: string;
    avatarUrl: string;
    isOnline: boolean;
  };
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: DirectMessage[];
}

const CURRENT_USER_ID = 'my_user_id';

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    user: {
      id: 'u2',
      username: 'tech_insider',
      name: 'Sarah Chen',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      isOnline: true,
    },
    lastMessage: 'Check out this new React UI feature!',
    lastMessageTime: '12m',
    unreadCount: 2,
    messages: [
      { id: 'm1', senderId: 'u2', text: 'Hey! Are you working on the social app components today?', timestamp: '10:30 AM' },
      { id: 'm2', senderId: CURRENT_USER_ID, text: 'Yeah! Just finished the feed and post card components.', timestamp: '10:32 AM' },
      { id: 'm3', senderId: 'u2', text: 'Awesome! Check out this new React UI feature!', timestamp: '10:35 AM' },
    ],
  },
  {
    id: 'c2',
    user: {
      id: 'u3',
      username: 'design_daily',
      name: 'Jessica Taylor',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      isOnline: false,
    },
    lastMessage: 'The new designs look amazing 🔥',
    lastMessageTime: '2h',
    unreadCount: 0,
    messages: [
      { id: 'm4', senderId: CURRENT_USER_ID, text: 'Did you get a chance to review the new layout mockups?', timestamp: '8:15 AM' },
      { id: 'm5', senderId: 'u3', text: 'The new designs look amazing 🔥', timestamp: '8:20 AM' },
    ],
  },
  {
    id: 'c3',
    user: {
      id: 'u4',
      username: 'coder_life',
      name: 'Marcus Vance',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      isOnline: true,
    },
    lastMessage: 'Let us catch up later today.',
    lastMessageTime: '1d',
    unreadCount: 0,
    messages: [
      { id: 'm6', senderId: 'u4', text: 'Let us catch up later today.', timestamp: 'Yesterday' },
    ],
  },
];

export function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<string>('c1');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');

  // Currently selected conversation
  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  // Filter conversations by username or name
  const filteredConversations = conversations.filter(
    (c) =>
      c.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle sending a new message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConversationId) return;

    const newMessage: DirectMessage = {
      id: Date.now().toString(),
      senderId: CURRENT_USER_ID,
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === activeConversationId) {
          return {
            ...conv,
            lastMessage: newMessage.text,
            lastMessageTime: 'Just now',
            messages: [...conv.messages, newMessage],
          };
        }
        return conv;
      })
    );

    setInputText('');
  };

  return (
    <div className="flex h-[calc(100vh-2rem)] max-w-6xl mx-auto my-2 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      
      {/* --- LEFT SIDEBAR: CONVERSATIONS LIST --- */}
      <div className="w-full md:w-80 lg:w-96 border-r border-gray-200 flex flex-col bg-white">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h1 className="font-bold text-lg text-gray-900">Messages</h1>
          <span className="text-xs bg-gray-100 px-2.5 py-1 rounded-full font-medium text-gray-600">
            {conversations.length} Active
          </span>
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b border-gray-100">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {filteredConversations.map((conv) => {
            const isActive = conv.id === activeConversationId;

            return (
              <button
                key={conv.id}
                onClick={() => {
                  setActiveConversationId(conv.id);
                  // Clear unread count when opening
                  setConversations((prev) =>
                    prev.map((c) => (c.id === conv.id ? { ...c, unreadCount: 0 } : c))
                  );
                }}
                className={`w-full p-3 flex items-center gap-3 transition-colors text-left cursor-pointer ${
                  isActive ? 'bg-gray-100/80' : 'hover:bg-gray-50'
                }`}
              >
                {/* Avatar with Online Status Badge */}
                <div className="relative flex-shrink-0">
                  <img
                    src={conv.user.avatarUrl}
                    alt={conv.user.username}
                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                  />
                  {conv.user.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm truncate ${conv.unreadCount > 0 ? 'font-bold text-gray-900' : 'font-medium text-gray-800'}`}>
                      {conv.user.username}
                    </p>
                    <span className="text-xs text-gray-400 flex-shrink-0">{conv.lastMessageTime}</span>
                  </div>
                  <p className={`text-xs truncate mt-0.5 ${conv.unreadCount > 0 ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
                    {conv.lastMessage}
                  </p>
                </div>

                {/* Unread Pill */}
                {conv.unreadCount > 0 && (
                  <span className="w-5 h-5 bg-blue-500 text-white rounded-full text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                    {conv.unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* --- RIGHT MAIN AREA: ACTIVE CHAT WINDOW --- */}
      {activeConversation ? (
        <div className="hidden md:flex flex-1 flex-col bg-gray-50/50">
          
          {/* Chat Header */}
          <div className="p-3.5 px-6 bg-white border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={activeConversation.user.avatarUrl}
                  alt={activeConversation.user.username}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
                {activeConversation.user.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900 leading-none">
                  {activeConversation.user.username}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {activeConversation.user.isOnline ? 'Active now' : 'Offline'}
                </p>
              </div>
            </div>

            {/* Quick Action Icons */}
            <div className="flex items-center gap-4 text-gray-600">
              <button className="hover:text-gray-900 focus:outline-none cursor-pointer">
                <Phone size={20} />
              </button>
              <button className="hover:text-gray-900 focus:outline-none cursor-pointer">
                <Video size={22} />
              </button>
              <button className="hover:text-gray-900 focus:outline-none cursor-pointer">
                <Info size={20} />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {activeConversation.messages.map((msg) => {
              const isMe = msg.senderId === CURRENT_USER_ID;

              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  {!isMe && (
                    <img
                      src={activeConversation.user.avatarUrl}
                      alt={activeConversation.user.username}
                      className="w-7 h-7 rounded-full object-cover mb-1"
                    />
                  )}
                  <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${
                    isMe
                      ? 'bg-blue-500 text-white rounded-br-none shadow-xs'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-xs'
                  }`}>
                    <p className="leading-relaxed">{msg.text}</p>
                    <div className={`flex items-center gap-1 justify-end text-[10px] mt-1 ${isMe ? 'text-blue-100' : 'text-gray-400'}`}>
                      <span>{msg.timestamp}</span>
                      {isMe && <CheckCheck size={12} />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
              <button type="button" className="text-gray-500 hover:text-gray-800 focus:outline-none cursor-pointer">
                <Image size={20} />
              </button>
              <input
                type="text"
                placeholder="Message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 text-sm bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
              />
              {inputText.trim() ? (
                <button
                  type="submit"
                  className="text-blue-500 font-semibold text-sm hover:text-blue-700 focus:outline-none cursor-pointer"
                >
                  Send
                </button>
              ) : (
                <button type="button" className="text-gray-500 hover:text-red-500 focus:outline-none cursor-pointer">
                  <Heart size={20} />
                </button>
              )}
            </div>
          </form>

        </div>
      ) : (
        /* Empty State */
        <div className="hidden md:flex flex-1 flex-col items-center justify-center p-8 text-center bg-gray-50">
          <div className="w-20 h-20 bg-gray-200/60 rounded-full flex items-center justify-center mb-4">
            <Send size={36} className="text-gray-500 -rotate-12" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Your Messages</h2>
          <p className="text-sm text-gray-500 mt-1 max-w-xs">
            Send private photos and messages to a friend or group.
          </p>
        </div>
      )}

    </div>
  );
}