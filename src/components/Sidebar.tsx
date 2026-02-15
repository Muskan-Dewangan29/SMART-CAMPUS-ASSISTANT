import  { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  MessageSquareIcon,
  SettingsIcon,
  PlusIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import CollegeLogo from "../assets/logo.png";

export function Sidebar({ onNewChat, onShowChat }: { onNewChat: () => void; onShowChat: () => void }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved ? saved === 'true' : false; // 👈 default expanded
  });
  const navItems = [
    
    {
      path: '/settings',
      icon: SettingsIcon,
      label: 'Settings'
    }
  ];

  return (
   <div
  className={`relative ${
    collapsed ? 'w-16' : 'w-64'
  } bg-slate-900 text-white flex flex-col h-full transition-all duration-300`}
>

{/* Header */}
<div className="p-4 border-b border-slate-800 flex flex-col items-center">
  {/* Arrow above logo */}
  <button
    onClick={() => {
      const next = !collapsed;
      setCollapsed(next);
      localStorage.setItem('sidebar-collapsed', String(next));
    }}
    className="mb-2 text-slate-400 hover:text-white"
    title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
  >
    {collapsed ? (
      <ChevronRight className="w-4 h-4" />
    ) : (
      <ChevronLeft className="w-4 h-4" />
    )}
  </button>

  {/* Logo */}
  <a href="https://ssipmt.edu.in/" target="_blank" rel="noopener noreferrer" title="Visit College Website">
  <div className="w-10 h-10 rounded-lg overflow-hidden">
    <img
      src={CollegeLogo}
      alt="College Logo"
      className="w-full h-full object-cover"
    />
  </div>
</a>


  {!collapsed && (
    <div className="text-center mb-2">
      <h2 className="font-semibold text-sm">Smart Campus Assistant</h2>
      <p className="text-xs text-slate-400">AI Support</p>
    </div>
  )}
</div>

{/* Move New Chat below the header */}
<Link
  to="/chat"
  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
    collapsed
      ? 'justify-center text-slate-400 hover:text-white hover:bg-slate-800/50'
      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
  }`}
  title="Start a new chat"
  onClick={onNewChat} // ✅ add this
>
  <PlusIcon className="w-5 h-5" />
  {!collapsed && <span className="text-sm font-medium">New Chat</span>}
</Link>

<Link
  to="/chat"
  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
    collapsed
      ? 'justify-center text-slate-400 hover:text-white hover:bg-slate-800/50'
      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
  }`}
  title="Show existing chat"
  onClick={onShowChat} // ✅ add this
>
  <MessageSquareIcon className="w-5 h-5" />
  {!collapsed && <span className="text-sm font-medium">Chat</span>}
</Link>


      

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link key={item.path} to={item.path} className="relative" title={item.label}>
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-slate-800 rounded-lg"
                  transition={{
                    type: 'spring',
                    bounce: 0.2,
                    duration: 0.6
                  }}
                />
              )}
              <div
                className={`relative flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {!collapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-slate-800 text-center">
        {!collapsed && (
          <p className="text-xs text-slate-400">
          © College Assistant
          </p>
        )}
      </div>
    </div>
  );
}
