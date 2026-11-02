import React from 'react';
import { Hash, Bell, Pin, Users, Search } from 'lucide-react';

export default function ChatHeader({
  channel,
  showMemberList,
  setShowMemberList,
}) {
  return (
    <header className="h-12 px-4 border-b border-amber-500/15 bg-[#060608] flex items-center justify-between shadow-sm select-none flex-shrink-0 z-10">
      <div className="flex items-center gap-2 min-w-0">
        <Hash className="w-6 h-6 text-amber-400 flex-shrink-0" />
        <h2 className="font-extrabold text-amber-200 text-base truncate">
          {channel?.name || 'kanal'}
        </h2>
        {channel?.description && (
          <>
            <div className="w-[1px] h-4 bg-amber-500/20 mx-2 flex-shrink-0 hidden md:block" />
            <p className="text-xs text-amber-300/70 truncate hidden md:block font-medium">
              {channel.description}
            </p>
          </>
        )}
      </div>

      <div className="flex items-center gap-4 text-amber-400 flex-shrink-0">
        <button
          onClick={() => alert('Benachrichtigungen für diesen Kanal sind aktiviert.')}
          className="hover:text-amber-300 transition cursor-pointer"
          title="Benachrichtigungen"
        >
          <Bell className="w-5 h-5" />
        </button>
        <button
          onClick={() => alert('Gepinnte Nachrichten: Regeln wurden angepinnt.')}
          className="hover:text-amber-300 transition cursor-pointer"
          title="Gepinnte Nachrichten"
        >
          <Pin className="w-5 h-5" />
        </button>
        <button
          onClick={() => setShowMemberList(!showMemberList)}
          className={`transition cursor-pointer ${
            showMemberList
              ? 'text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]'
              : 'hover:text-amber-300'
          }`}
          title="Mitgliederliste ein-/ausblenden"
        >
          <Users className="w-5 h-5" />
        </button>

        <div className="relative hidden lg:flex items-center">
          <input
            type="text"
            placeholder="Suchen"
            className="bg-[#0c0c10] border border-amber-500/30 text-xs px-2.5 py-1 pr-7 rounded-lg text-amber-100 focus:outline-none focus:border-amber-400 focus:w-44 w-32 transition-all placeholder:text-amber-400/40"
          />
          <Search className="w-3.5 h-3.5 text-amber-400 absolute right-2 pointer-events-none" />
        </div>
      </div>
    </header>
  );
}
