import React from 'react';
import { Server, MessageSquare, Settings } from 'lucide-react';

export default function LeftNavRail({
  isHomeActive,
  onSelectServers,
  onSelectHome,
  onOpenSettings,
  totalServerUnread = 0,
}) {
  return (
    <nav className="w-[76px] bg-discord-sidebar flex flex-col items-center py-3 select-none flex-shrink-0 z-30 border-r border-discord-darkest/40">
      {/* DilSed Brand Logo at the top */}
      <div className="relative group flex items-center justify-center w-full mb-2.5">
        <button
          onClick={onSelectHome}
          className="w-14 h-14 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all duration-200 group-hover:scale-105 p-1.5 shadow-lg group-hover:border-blue-500/40"
          title="DilSed Web"
        >
          <img
            src="/dilsed-logo.png"
            alt="DilSed"
            className="w-full h-full object-contain filter drop-shadow"
          />
        </button>
      </div>

      {/* Subtle Divider */}
      <div className="w-8 h-[2px] bg-discord-divider/60 rounded-full mb-2.5" />

      {/* --- 1. BUTTON: SERVER --- */}
      <div className="relative group flex items-center justify-center w-full mb-2.5">
        {/* Left active white pill indicator */}
        <span
          className={`absolute left-0 w-1 bg-white rounded-r-full transition-all duration-200 ${
            !isHomeActive ? 'h-10' : 'h-0 group-hover:h-5'
          }`}
        />
        <button
          onClick={onSelectServers}
          className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-200 select-none relative ${
            !isHomeActive
              ? 'bg-discord-blurple text-white shadow-lg shadow-blue-900/40'
              : 'bg-discord-channels text-discord-textMuted hover:bg-discord-hoverChannel hover:text-white hover:rounded-xl'
          }`}
          title="Server"
        >
          <Server className="w-5 h-5" />
          <span className="text-[10px] font-bold tracking-tight">Server</span>

          {/* Total server unread badge if any */}
          {totalServerUnread > 0 && isHomeActive && (
            <div className="absolute -bottom-1 -right-1 z-10 pointer-events-none animate-in zoom-in-75">
              <span className="min-w-[18px] h-[18px] px-1 bg-discord-red text-white text-[10px] font-extrabold rounded-full flex items-center justify-center border-[2px] border-discord-sidebar shadow-md leading-none">
                {totalServerUnread}
              </span>
            </div>
          )}
        </button>
      </div>

      {/* --- 2. BUTTON: DM --- */}
      <div className="relative group flex items-center justify-center w-full mb-2.5">
        {/* Left active white pill indicator */}
        <span
          className={`absolute left-0 w-1 bg-white rounded-r-full transition-all duration-200 ${
            isHomeActive ? 'h-10' : 'h-0 group-hover:h-5'
          }`}
        />
        <button
          onClick={onSelectHome}
          className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-200 select-none relative ${
            isHomeActive
              ? 'bg-discord-blurple text-white shadow-lg shadow-blue-900/40'
              : 'bg-discord-channels text-discord-textMuted hover:bg-discord-hoverChannel hover:text-white hover:rounded-xl'
          }`}
          title="Direktnachrichten (DMs)"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px] font-bold tracking-tight">DMs</span>
        </button>
      </div>

      {/* --- 3. BUTTON: EINSTELLUNGEN --- */}
      <div className="relative group flex items-center justify-center w-full mb-2.5">
        <button
          onClick={onOpenSettings}
          className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 bg-discord-channels text-discord-textMuted hover:bg-discord-hoverChannel hover:text-white transition-all duration-200 group select-none hover:rounded-xl hover:shadow-md"
          title="Einstellungen"
        >
          <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300 text-discord-textMuted group-hover:text-white" />
          <span className="text-[10px] font-bold tracking-tight">Einstellungen</span>
        </button>
      </div>

      {/* Spacer pushing any remaining empty area below all 3 buttons */}
      <div className="flex-1" />
    </nav>
  );
}
