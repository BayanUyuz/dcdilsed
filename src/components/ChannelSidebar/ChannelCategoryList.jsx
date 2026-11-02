import React from 'react';
import {
  ChevronDown,
  Hash,
  Volume2,
  Lock,
  Plus,
  UserPlus,
  Settings,
  FolderPlus,
  Monitor,
  Headphones,
  MicOff
} from 'lucide-react';

export default function ChannelCategoryList({
  server,
  activeChannelId,
  onSelectChannel,
  connectedVoiceChannel,
  handleVoiceChannelClick,
  onOpenVoiceChannelSettings,
  onOpenCreateChannel,
  onOpenInvite,
  onOpenVoiceRoomView,
  currentUser,
  isMuted,
  serverMutedUsers,
  serverDeafenedUsers,
  collapsedCategories,
  toggleCategory,
  hideMutedChannels,
  mutedChannels = {}
}) {
  const categories = server?.categories || [];

  if (categories.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto px-2 py-3 custom-scrollbar">
        <div className="px-4 py-10 text-center text-neutral-400 text-xs">
          <FolderPlus className="w-10 h-10 mx-auto mb-3 text-amber-400/40" />
          <p className="font-bold text-white mb-1">Keine Kanäle vorhanden</p>
          <p className="text-[11px] text-amber-200/50 mb-4">
            Erstelle Kategorien und Kanäle für diesen Server.
          </p>
          <button
            onClick={() => onOpenCreateChannel(null)}
            className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 text-neutral-950 px-4 py-2 rounded-xl text-xs font-bold transition shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer"
          >
            Kanal erstellen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4 custom-scrollbar">
      {categories.map((cat) => {
        const isCollapsed = collapsedCategories[cat.id];
        return (
          <div key={cat.id} className="space-y-0.5">
            <div className="flex items-center justify-between px-1 text-[11px] font-extrabold text-amber-400 tracking-wider uppercase group hover:text-amber-300 cursor-pointer">
              <div
                className="flex items-center gap-1 flex-1 py-1"
                onClick={() => toggleCategory(cat.id)}
              >
                <ChevronDown
                  className={`w-3 h-3 text-amber-400 transition-transform duration-200 ${
                    isCollapsed ? '-rotate-90' : ''
                  }`}
                />
                <span className="tracking-wider">{cat.name}</span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCreateChannel(cat.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-0.5 text-amber-400 hover:text-amber-200 transition cursor-pointer"
                title="Kanal erstellen"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {!isCollapsed && (
              <div className="space-y-[2px]">
                {(cat.channels || [])
                  .filter((ch) => !hideMutedChannels || !mutedChannels[ch.id])
                  .map((ch) => {
                    if (ch.type === 'text') {
                      const isActive = activeChannelId === ch.id;
                      return (
                        <button
                          key={ch.id}
                          onClick={() => onSelectChannel(ch.id)}
                          className={`w-full group px-2 py-1.5 rounded-md flex items-center gap-2 text-sm transition cursor-pointer ${
                            isActive
                              ? 'bg-amber-400/15 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm'
                              : 'text-amber-200/75 hover:bg-amber-400/10 hover:text-amber-100 font-medium'
                          }`}
                        >
                          <Hash
                            className={`w-4 h-4 flex-shrink-0 ${
                              isActive ? 'text-amber-400' : 'text-amber-400/60 group-hover:text-amber-300'
                            }`}
                          />
                          <span className="truncate flex-1 text-left">
                            {ch.name}
                          </span>
                        </button>
                      );
                    } else if (ch.type === 'voice') {
                      const isConnected = connectedVoiceChannel?.id === ch.id;
                      return (
                        <div key={ch.id} className="space-y-1 relative group/vc">
                          <div className="flex items-center">
                            <button
                              onClick={() => handleVoiceChannelClick(ch)}
                              onContextMenu={(e) => {
                                e.preventDefault();
                                if (onOpenVoiceChannelSettings) onOpenVoiceChannelSettings(ch);
                              }}
                              className={`w-full px-2 py-1.5 rounded-md flex items-center gap-2 text-sm transition pr-14 cursor-pointer ${
                                isConnected
                                  ? 'bg-amber-400/15 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm'
                                  : 'text-amber-200/75 hover:bg-amber-400/10 hover:text-amber-100 font-medium'
                              }`}
                            >
                              {ch.isPrivate ? (
                                <Lock
                                  className={`w-4 h-4 flex-shrink-0 ${
                                    isConnected ? 'text-amber-400' : 'text-amber-400/60 group-hover/vc:text-amber-300'
                                  }`}
                                />
                              ) : (
                                <Volume2
                                  className={`w-4 h-4 flex-shrink-0 ${
                                    isConnected ? 'text-amber-400' : 'text-amber-400/60 group-hover/vc:text-amber-300'
                                  }`}
                                />
                              )}
                              <span className="truncate flex-1 text-left">
                                {ch.name}
                              </span>
                              {ch.userLimit > 0 && (
                                <span className="text-[11px] text-amber-400/70 font-semibold group-hover/vc:hidden">
                                  {isConnected ? '1' : '0'}/{ch.userLimit}
                                </span>
                              )}
                            </button>

                            {/* Hover Action Buttons */}
                            <div className="absolute right-1.5 top-1/2 -translate-y-1/2 hidden group-hover/vc:flex items-center gap-0.5 text-amber-400/60 z-10">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onOpenInvite();
                                }}
                                className="p-1 hover:text-amber-200 hover:bg-amber-400/15 rounded transition cursor-pointer"
                                title="Soforteinladung erstellen"
                              >
                                <UserPlus className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (onOpenVoiceChannelSettings) onOpenVoiceChannelSettings(ch);
                                }}
                                className="p-1 hover:text-amber-200 hover:bg-amber-400/15 rounded transition cursor-pointer"
                                title="Kanal bearbeiten (Limit, Berechtigungen, Bitrate...)"
                              >
                                <Settings className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Render connected user avatar under voice room */}
                          {isConnected && (
                            <div
                              onClick={onOpenVoiceRoomView}
                              className="pl-6 pr-2 py-1 flex items-center justify-between text-xs text-discord-textNormal hover:bg-white/5 rounded cursor-pointer transition"
                            >
                              <div className="flex items-center gap-2">
                                <div className="relative">
                                  <img
                                    src={currentUser?.avatar}
                                    alt={currentUser?.displayName}
                                    className={`w-6 h-6 rounded-full object-cover border-2 border-transparent ${
                                      !isMuted && !serverMutedUsers[currentUser?.id] && !serverDeafenedUsers[currentUser?.id]
                                        ? 'speaking-ring'
                                        : ''
                                    }`}
                                  />
                                  {serverDeafenedUsers[currentUser?.id] ? (
                                    <div
                                      className="absolute -bottom-1 -right-1 bg-discord-red rounded-full p-[2px]"
                                      title="Serverweit taub geschaltet"
                                    >
                                      <Headphones className="w-2.5 h-2.5 text-white" />
                                    </div>
                                  ) : (serverMutedUsers[currentUser?.id] || isMuted) ? (
                                    <div
                                      className="absolute -bottom-1 -right-1 bg-discord-red rounded-full p-[2px]"
                                      title="Serverweit stummgeschaltet"
                                    >
                                      <MicOff className="w-2.5 h-2.5 text-white" />
                                    </div>
                                  ) : null}
                                </div>
                                <span className="truncate font-medium text-white">
                                  {currentUser?.displayName}
                                </span>
                              </div>
                              <span className="text-[10px] text-discord-green bg-discord-green/20 px-1 rounded flex items-center gap-0.5">
                                <Monitor className="w-3 h-3" />
                                <span>Live</span>
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    }
                    return null;
                  })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
