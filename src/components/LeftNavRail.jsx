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
    <nav className="w-[76px] bg-[#070709] flex flex-col items-center py-3 select-none flex-shrink-0 z-30 border-r border-amber-500/15">
      {/* DilSed Brand Logo at the top */}
      <div className="relative group flex items-center justify-center w-full mb-2.5">
        <button
          onClick={onSelectHome}
          className="w-14 h-14 rounded-2xl bg-neutral-950 hover:bg-neutral-900 border border-amber-500/30 flex items-center justify-center transition-all duration-200 group-hover:scale-105 p-1.5 shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:border-amber-400/70"
          title="DilSed Web"
        >
          <img
            src="/dilsed-logo.png"
            alt="DilSed"
            className="w-full h-full object-contain filter drop-shadow"
          />
        </button>
      </div>

      {/* Subtle Gold Divider */}
      <div className="w-8 h-[2px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent rounded-full mb-2.5" />

      {/* --- 1. BUTTON: SERVER --- */}
      <div className="relative group flex items-center justify-center w-full mb-2.5">
        {/* Left active gold pill indicator */}
        <span
          className={`absolute left-0 w-1 bg-gradient-to-b from-amber-400 to-amber-600 rounded-r-full transition-all duration-200 shadow-[0_0_10px_rgba(245,158,11,0.8)] ${
            !isHomeActive ? 'h-10' : 'h-0 group-hover:h-5'
          }`}
        />
        <button
          onClick={onSelectServers}
          className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-200 select-none relative ${
            !isHomeActive
              ? 'bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-neutral-950 font-black shadow-[0_0_22px_rgba(245,158,11,0.55)] border-2 border-amber-300'
              : 'bg-[#0e0e12] text-amber-300/80 hover:bg-[#15151c] hover:text-amber-300 hover:border-amber-400/60 border border-amber-500/20 hover:rounded-xl shadow'
          }`}
          title="Server"
        >
          <Server className="w-5 h-5" />
          <span className="text-[10px] font-extrabold tracking-tight">Server</span>

          {/* Total server unread badge if any */}
          {totalServerUnread > 0 && isHomeActive && (
            <div className="absolute -bottom-1 -right-1 z-10 pointer-events-none animate-in zoom-in-75">
              <span className="min-w-[18px] h-[18px] px-1 bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 text-[10px] font-black rounded-full flex items-center justify-center border-[2px] border-black shadow-md leading-none">
                {totalServerUnread}
              </span>
            </div>
          )}
        </button>
      </div>

      {/* --- 2. BUTTON: DM --- */}
      <div className="relative group flex items-center justify-center w-full mb-2.5">
        {/* Left active gold pill indicator */}
        <span
          className={`absolute left-0 w-1 bg-gradient-to-b from-amber-400 to-amber-600 rounded-r-full transition-all duration-200 shadow-[0_0_10px_rgba(245,158,11,0.8)] ${
            isHomeActive ? 'h-10' : 'h-0 group-hover:h-5'
          }`}
        />
        <button
          onClick={onSelectHome}
          className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-200 select-none relative ${
            isHomeActive
              ? 'bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-neutral-950 font-black shadow-[0_0_22px_rgba(245,158,11,0.55)] border-2 border-amber-300'
              : 'bg-[#0e0e12] text-amber-300/80 hover:bg-[#15151c] hover:text-amber-300 hover:border-amber-400/60 border border-amber-500/20 hover:rounded-xl shadow'
          }`}
          title="Direktnachrichten (DMs)"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px] font-extrabold tracking-tight">DMs</span>
        </button>
      </div>

      {/* --- 3. BUTTON: EINSTELLUNGEN (Nur Zahnrad) --- */}
      <div className="relative group flex items-center justify-center w-full mb-2.5">
        <button
          onClick={onOpenSettings}
          className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#0e0e12] text-amber-400 hover:bg-[#15151c] hover:text-amber-300 hover:border-amber-400/60 border border-amber-500/20 transition-all duration-200 group select-none hover:rounded-xl hover:shadow-md"
          title="Einstellungen"
        >
          <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300 text-amber-400 group-hover:text-amber-300" />
        </button>
      </div>

      {/* Spacer pushing any remaining empty area below all 3 buttons */}
      <div className="flex-1" />
    </nav>
  );
}
