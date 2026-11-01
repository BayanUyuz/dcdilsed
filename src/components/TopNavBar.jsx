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
    <header className="w-full h-12 bg-[#060608] border-b border-amber-500/15 flex items-center justify-between px-3.5 select-none flex-shrink-0 z-30 shadow-lg shadow-black/40">
      {/* LEFT SECTION: Logo & The 3 Main Buttons */}
      <div className="flex items-center gap-4">
        {/* Brand App Icon & Name */}
        <div
          onClick={onSelectHome}
          className="flex items-center gap-2.5 cursor-pointer group pr-2"
          title="Dilsed Web"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-400/10 flex items-center justify-center border border-amber-500/30 group-hover:scale-105 group-hover:border-amber-400 transition-all p-0.5 shadow-sm shadow-amber-500/10">
            <img src="/dilsed-logo.png" alt="Dilsed" className="w-full h-full object-contain drop-shadow" />
          </div>
          <span className="font-extrabold text-sm text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 tracking-tight group-hover:brightness-125 transition-all">
            DilSed
          </span>
        </div>

        {/* Small vertical divider */}
        <div className="w-[1px] h-5 bg-amber-500/20" />

        {/* --- 1. BUTTON: SERVER --- */}
        <button
          onClick={onSelectServers}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 relative ${
            !isHomeActive
              ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-neutral-950 font-black shadow-md shadow-amber-500/20 ring-1 ring-amber-400/50'
              : 'text-amber-200/70 hover:bg-white/5 hover:text-white'
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
              ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-neutral-950 font-black shadow-md shadow-amber-500/20 ring-1 ring-amber-400/50'
              : 'text-amber-200/70 hover:bg-white/5 hover:text-white'
          }`}
          title="Direktnachrichten (DMs)"
        >
          <MessageSquare className="w-4 h-4" />
          <span>DMs</span>
        </button>

        {/* --- 3. BUTTON: EINSTELLUNGEN (Nur Zahnrad) --- */}
        <button
          onClick={onOpenSettings}
          className="p-1.5 rounded-lg text-amber-300/80 hover:bg-white/5 hover:text-amber-300 transition-all duration-200 group flex items-center justify-center"
          title="Benutzereinstellungen"
        >
          <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300 text-amber-400 group-hover:text-amber-300" />
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
