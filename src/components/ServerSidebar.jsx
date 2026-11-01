import React from 'react';
import { Plus, Compass } from 'lucide-react';

export default function ServerSidebar({
  servers,
  activeServerId,
  onSelectServer,
  onOpenAddServer,
  onOpenExplore,
}) {
  return (
    <nav className="w-[72px] bg-[#08080a] flex flex-col items-center py-3 select-none flex-shrink-0 z-20 border-r border-amber-500/15">
      {/* Server List */}
      <div className="flex-1 w-full overflow-y-auto overflow-x-hidden flex flex-col items-center gap-2 py-1 custom-scrollbar">
        {servers.map((server) => {
          const isActive = activeServerId === server.id;
          const hasUnread = server.unread > 0 && !isActive;

          return (
            <div
              key={server.id}
              className="relative group flex items-center justify-center w-full"
            >
              {/* Left active / unread pill */}
              <span
                className={`absolute left-0 w-1 bg-gradient-to-b from-amber-400 to-amber-600 rounded-r-full transition-all duration-200 shadow-[0_0_10px_rgba(245,158,11,0.8)] ${
                  isActive
                    ? 'h-10'
                    : hasUnread
                    ? 'h-2 group-hover:h-5'
                    : 'h-0 group-hover:h-5'
                }`}
              />

              {/* Server Icon Container */}
              <div className="relative w-12 h-12 flex items-center justify-center">
                <button
                  onClick={() => onSelectServer(server.id)}
                  className={`w-12 h-12 flex items-center justify-center overflow-hidden transition-all duration-200 ${
                    isActive
                      ? 'rounded-[16px] bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-neutral-950 font-black shadow-[0_0_22px_rgba(245,158,11,0.55)] border-2 border-amber-300'
                      : 'rounded-[24px] bg-[#0e0e12] text-amber-300/80 hover:rounded-[16px] hover:bg-[#15151c] hover:text-amber-200 hover:border-amber-400/60 border border-amber-500/20'
                  }`}
                >
                  {server.icon ? (
                    <img
                      src={server.icon}
                      alt={server.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="font-black text-sm tracking-wide">{server.acronym}</span>
                  )}
                </button>

                {/* Discord Official Unread Notification Badge OUTSIDE the server bubble */}
                {hasUnread && (
                  <div className="absolute -bottom-1 -right-1 z-10 pointer-events-none animate-in zoom-in-75 duration-150">
                    <span className="min-w-[18px] h-[18px] px-1 bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 text-[11px] font-black rounded-full flex items-center justify-center border-[2px] border-black shadow-md leading-none">
                      {server.unread}
                    </span>
                  </div>
                )}
              </div>

              {/* Tooltip */}
              <span className="discord-tooltip left-20 font-medium">
                {server.name}
              </span>
            </div>
          );
        })}

        {/* Divider */}
        <div className="w-8 h-[2px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent rounded my-1" />

        {/* Add a Server Button */}
        <div className="relative group flex items-center justify-center w-full">
          <span className="absolute left-0 w-1 bg-gradient-to-b from-amber-400 to-amber-600 rounded-r-full transition-all duration-200 h-0 group-hover:h-5" />
          <button
            onClick={onOpenAddServer}
            className="w-12 h-12 rounded-[24px] bg-[#0e0e12] text-amber-400 hover:bg-gradient-to-br hover:from-amber-400 hover:via-amber-500 hover:to-amber-600 hover:text-neutral-950 hover:rounded-[16px] transition-all duration-200 flex items-center justify-center border border-amber-500/30 hover:border-amber-300 shadow-md"
            title="Server hinzufügen"
          >
            <Plus className="w-6 h-6" />
          </button>
          <span className="discord-tooltip left-20">Server hinzufügen</span>
        </div>

        {/* Explore Discoverable Servers */}
        <div className="relative group flex items-center justify-center w-full">
          <span className="absolute left-0 w-1 bg-gradient-to-b from-amber-400 to-amber-600 rounded-r-full transition-all duration-200 h-0 group-hover:h-5" />
          <button
            onClick={onOpenExplore}
            className="w-12 h-12 rounded-[24px] bg-[#0e0e12] text-amber-400 hover:bg-gradient-to-br hover:from-amber-400 hover:via-amber-500 hover:to-amber-600 hover:text-neutral-950 hover:rounded-[16px] transition-all duration-200 flex items-center justify-center border border-amber-500/30 hover:border-amber-300 shadow-md"
            title="Öffentliche Server entdecken"
          >
            <Compass className="w-6 h-6" />
          </button>
          <span className="discord-tooltip left-20">Öffentliche Server entdecken</span>
        </div>
      </div>
    </nav>
  );
}
