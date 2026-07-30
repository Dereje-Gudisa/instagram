import React, { useState, useRef } from 'react';
import {
  X,
  Image as ImageIcon,
  ArrowLeft,
  MapPin,
  ChevronDown,
  Smile,
  Sparkles,
} from 'lucide-react';
import type { Post } from '../../types';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated?: (newPost: Post) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onPostCreated,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setStep(2);
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setStep(2);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Post
  const handleShare = () => {
    if (!selectedImage) return;

    const newPost: Post = {
      id: `p_${Date.now()}`,
      caption,
      mediaUrls: [selectedImage],
      author: {
        id: 'u_me',
        username: 'alex_dev',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      },
      _count: { likes: 0, comments: 0 },
      isLikedByMe: false,
      createdAt: new Date().toISOString(),
    };

    if (onPostCreated) {
      onPostCreated(newPost);
    }

    // Reset & Close
    handleResetAndClose();
  };

  const handleResetAndClose = () => {
    setStep(1);
    setSelectedImage(null);
    setCaption('');
    setLocation('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      
      {/* Close Button Top Right */}
      <button
        onClick={handleResetAndClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors cursor-pointer"
      >
        <X size={28} />
      </button>

      {/* Main Modal Card */}
      <div
        className={`bg-white rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 w-full flex flex-col ${
          step === 2 ? 'max-w-4xl h-[600px]' : 'max-w-lg h-[500px]'
        }`}
      >
        {/* ================= MODAL HEADER ================= */}
        <div className="h-12 border-b border-gray-200 px-4 flex items-center justify-between font-bold text-sm text-gray-900 flex-shrink-0">
          {step === 2 ? (
            <button
              onClick={() => setStep(1)}
              className="text-gray-700 hover:text-gray-900 cursor-pointer p-1"
            >
              <ArrowLeft size={20} />
            </button>
          ) : (
            <div className="w-6" />
          )}

          <span>Create new post</span>

          {step === 2 ? (
            <button
              onClick={handleShare}
              className="text-blue-500 hover:text-blue-600 font-bold text-sm cursor-pointer"
            >
              Share
            </button>
          ) : (
            <div className="w-6" />
          )}
        </div>

        {/* ================= MODAL BODY ================= */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* STEP 1: UPLOAD AREA */}
          {step === 1 && (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`w-full flex flex-col items-center justify-center p-8 text-center transition-colors ${
                isDragging ? 'bg-blue-50 border-2 border-dashed border-blue-400' : 'bg-white'
              }`}
            >
              <div className="p-5 bg-gray-100 rounded-full mb-4">
                <ImageIcon size={48} className="text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Drag photos and videos here
              </h3>
              <p className="text-xs text-gray-400 mb-6">Supports JPG, PNG, WEBP</p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Select from computer
              </button>
            </div>
          )}

          {/* STEP 2: PREVIEW & CAPTION EDITOR */}
          {step === 2 && (
            <div className="flex flex-col md:flex-row w-full h-full">
              {/* Media Preview Box */}
              <div className="bg-black md:w-3/5 h-full flex items-center justify-center relative">
                <img
                  src={selectedImage!}
                  alt="Upload Preview"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Caption & Details Panel */}
              <div className="md:w-2/5 p-4 flex flex-col justify-between border-l border-gray-200 overflow-y-auto">
                <div>
                  {/* User Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-bold text-xs text-gray-900">alex_dev</span>
                  </div>

                  {/* Caption Area */}
                  <div className="relative mb-4">
                    <textarea
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Write a caption..."
                      maxLength={2200}
                      rows={5}
                      className="w-full text-xs text-gray-800 resize-none focus:outline-none placeholder-gray-400"
                    />
                    <div className="flex items-center justify-between pt-2 text-gray-400 border-t border-gray-100">
                      <button className="hover:text-gray-600 cursor-pointer">
                        <Smile size={18} />
                      </button>
                      <span className="text-[10px] text-gray-400">
                        {caption.length}/2,200
                      </span>
                    </div>
                  </div>

                  {/* Location Tag */}
                  <div className="flex items-center justify-between py-3 border-y border-gray-100 text-xs">
                    <input
                      type="text"
                      placeholder="Add location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
                    />
                    <MapPin size={16} className="text-gray-400 ml-2" />
                  </div>

                  {/* Accessibility Dropdown Toggle */}
                  <div className="flex items-center justify-between py-3 border-b border-gray-100 text-xs text-gray-600 cursor-pointer">
                    <span>Accessibility</span>
                    <ChevronDown size={16} />
                  </div>
                </div>

                {/* AI Assistant Hint Badge */}
                <div className="p-3 bg-purple-50 rounded-xl flex items-center gap-2 text-purple-700 text-xs font-medium">
                  <Sparkles size={16} />
                  <span>Tip: Add hashtags for better reach!</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};