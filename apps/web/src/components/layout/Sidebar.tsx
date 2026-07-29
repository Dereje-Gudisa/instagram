import React, {useState} from 'react';
import {
  Home, Search, Film, MessageCircle, Heart, PlusSquare, Menu, Camera, User } from 'lucide-react';
import { type NavItem, type NavTab, type SidebarProps } from '../../types';

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {

  const navItems: NavItem[] = [
    {id: 'home', label: 'Home', icon: Home, path: '/' },
    {id: 'search', label: 'Search', icon: Search, path: '/search' },
    {id: 'reels', label: 'Reels', icon: Film, path: '/reels' },
    {id: 'messages', label: 'Messages', icon: MessageCircle, path: '/messages' },
    {id: 'notifications', label: 'Notifications', icon: Heart, path: '/notifications' },
    {id: 'create', label: 'Create', icon: PlusSquare, path: '/create' },
    {id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ];

  const handleNavClick = (id: NavTab) => {
    setActiveTab?.(id);
    console.log(`Navigated to: ${id}`);
  };

  return (
    <>
      {/*  DESKTOP SIDEBAR  */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-16 xl:w-64 border-r border-gray-200 bg-white p-3 z-30 transition-all duration-200">
        {/* Logo */}
        <div className="my-6 px-2">
          {/* Desktop Full Logo */}
          <h1 className="hidden xl:block font-serif text-2xl font-bold tracking-tight">
            Instagram
          </h1>
          {/* Tablet Icon-Only Logo */}
          <Camera size={28} className="block xl:hidden mx-auto" />
        </div>

        {/* Navigation Links */}

        <nav className="flex-1 flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            // const isActive = currentPath === item.path;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 transition-colors w-full text-left ${
                  isActive ? 'font-bold': 'font-normal'
                }`}
              >
                <Icon size={24} className={isActive ? 'stroke-[2.5px]' : 'stroke-2'} />
                <span className="hidden xl:inline text-base">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* More Menu */}

        <button className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 transition-colors w-full mt-auto">
          <Menu size={24} />
          <span className="hidden xl:inline text-base">More</span>
        </button>
      </aside>

      {/*  MOBILE BOTTOM BAR  */}

      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-white border-t border-gray-200 flex items-center justify-around px-2 z-30">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="p-2 hover:opacity-70 transition-opacity"
            >
              <Icon size={24} className={isActive ? 'stroke-[2.5px]' : 'stroke-2'} />
            </button>
          );
        })}
      </nav>
    </>
  );
};