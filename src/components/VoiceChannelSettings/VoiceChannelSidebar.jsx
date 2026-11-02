import React from 'react';
import { Volume2, Sliders, Shield, Link, Bot, Trash2 } from 'lucide-react';

export default function VoiceChannelSidebar({
  channel,
  activeTab,
  setActiveTab,
  onOpenDeleteConfirm
}) {
  return (
    <div className="w-60 bg-discord-darkest flex flex-col items-end py-14 pr-6 pl-4 border-r border-discord-divider/20 flex-shrink-0 select-none">
      <div className="w-48 space-y-1">
        {/* Channel Name Header */}
        <div className="text-[11px] font-bold text-discord-textMuted uppercase px-2 pb-2 truncate flex items-center gap-1.5 border-b border-discord-divider/30 mb-2">
          <Volume2 className="w-3.5 h-3.5 flex-shrink-0 text-discord-green" />
          <span className="truncate">{channel?.name}</span>
        </div>

        <button
          onClick={() => setActiveTab('overview')}
          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-discord-hoverChannel text-white'
              : 'text-discord-textMuted hover:bg-discord-hoverChannel hover:text-discord-textNormal'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Übersicht</span>
        </button>

        <button
          onClick={() => setActiveTab('permissions')}
          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
            activeTab === 'permissions'
              ? 'bg-discord-hoverChannel text-white'
              : 'text-discord-textMuted hover:bg-discord-hoverChannel hover:text-discord-textNormal'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Berechtigungen</span>
        </button>

        <button
          onClick={() => setActiveTab('invites')}
          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
            activeTab === 'invites'
              ? 'bg-discord-hoverChannel text-white'
              : 'text-discord-textMuted hover:bg-discord-hoverChannel hover:text-discord-textNormal'
          }`}
        >
          <Link className="w-3.5 h-3.5" />
          <span>Einladungen</span>
        </button>

        <button
          onClick={() => setActiveTab('integrations')}
          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
            activeTab === 'integrations'
              ? 'bg-discord-hoverChannel text-white'
              : 'text-discord-textMuted hover:bg-discord-hoverChannel hover:text-discord-textNormal'
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
          <span>Integrationen</span>
        </button>

        <div className="h-[1px] bg-discord-divider/30 my-2" />

        {/* Delete Channel Button */}
        <button
          onClick={onOpenDeleteConfirm}
          className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between text-discord-red hover:bg-discord-red hover:text-white transition group cursor-pointer"
        >
          <span>Kanal löschen</span>
          <Trash2 className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
        </button>
      </div>
    </div>
  );
}
