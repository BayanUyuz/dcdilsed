import React from 'react';
import { Server, MessageSquare, Settings, Sparkles, Volume2, Mic, MicOff, Headphones } from 'lucide-react';

export default function TopNavBar({
  isHomeActive,
  onSelectServers,
  onSelectHome,
  onOpenSettings,
  totalServerUnread = 0,
  currentUser,
  isMuted = false,
  isDeafened = false,
}) {
  return (
    <header className="w-full h-12 bg-discord-darkest border-b border-discord-divider/40 flex items-center justify-between px-3.5 select-none flex-shrink-0 z-30 shadow-md">
      {/* LEFT SECTION: Logo & The 3 Main Buttons */}
      <div className="flex items-center gap-4">
        {/* Brand App Icon & Name */}
        <div
          onClick={onSelectHome}
          className="flex items-center gap-2.5 cursor-pointer group pr-2"
          title="Dilsed Web"
        >
          <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform p-0.5 shadow">
            <img src="/dilsed-logo.png" alt="Dilsed" className="w-full h-full object-contain drop-shadow" />
          </div>
          <span className="font-extrabold text-sm text-white tracking-tight group-hover:text-blue-400 transition-colors">
            DilSed
          </span>
        </div>

        {/* Small vertical divider */}
        <div className="w-[1px] h-5 bg-discord-divider/60" />

        {/* --- 1. BUTTON: SERVER --- */}
        <button
          onClick={onSelectServers}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 relative ${
            !isHomeActive
              ? 'bg-discord-blurple text-white shadow-sm shadow-blue-600/30 ring-1 ring-white/10'
              : 'text-discord-textMuted hover:bg-discord-channels/80 hover:text-white'
          }`}
          title="Server anzeigen"
        >
          <Server className="w-4 h-4" />
          <span>Server</span>

          {/* Total server unread badge if any */}
          {totalServerUnread > 0 && isHomeActive && (
            <span className="min-w-[18px] h-[18px] px-1 bg-discord-red text-white text-[10px] font-extrabold rounded-full flex items-center justify-center leading-none shadow">
              {totalServerUnread}
            </span>
          )}
        </button>

        {/* --- 2. BUTTON: DMs --- */}
        <button
          onClick={onSelectHome}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
            isHomeActive
              ? 'bg-discord-blurple text-white shadow-sm shadow-blue-600/30 ring-1 ring-white/10'
              : 'text-discord-textMuted hover:bg-discord-channels/80 hover:text-white'
          }`}
          title="Direktnachrichten (DMs)"
        >
          <MessageSquare className="w-4 h-4" />
          <span>DMs</span>
        </button>

        {/* --- 3. BUTTON: EINSTELLUNGEN --- */}
        <button
          onClick={onOpenSettings}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold text-discord-textMuted hover:bg-discord-channels/80 hover:text-white transition-all duration-200 group"
          title="Benutzereinstellungen"
        >
          <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300 text-discord-textMuted group-hover:text-white" />
          <span>Einstellungen</span>
        </button>
      </div>

      {/* RIGHT SECTION: Quick Status & User Mini Pill */}
      <div className="flex items-center gap-3">
        {/* Audio Mute / Deafen indicators if active */}
        {(isMuted || isDeafened) && (
          <div className="flex items-center gap-1.5 bg-discord-red/10 border border-discord-red/30 px-2 py-1 rounded-md text-[11px] font-bold text-discord-red">
            {isMuted && <MicOff className="w-3.5 h-3.5" />}
            {isDeafened && <Headphones className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">
              {isDeafened ? 'Taubgeschaltet' : 'Stummgeschaltet'}
            </span>
          </div>
        )}

        {/* User Mini Profile Trigger */}
        {currentUser && (
          <div
            onClick={onOpenSettings}
            className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-discord-channels/70 cursor-pointer transition border border-transparent hover:border-discord-divider/40"
            title="Profil & Einstellungen öffnen"
          >
            <div className="relative w-6 h-6">
              <img
                src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                alt={currentUser.displayName}
                className="w-full h-full rounded-full object-cover"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-discord-green border border-discord-darkest" />
            </div>
            <span className="text-xs font-bold text-discord-textHeader hidden md:inline">
              {currentUser.displayName || currentUser.username}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
