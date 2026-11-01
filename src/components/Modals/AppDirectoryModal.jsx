import React, { useState } from 'react';
import { X, Search, Sparkles, Plus, Check, Shield, Bot, Star } from 'lucide-react';

export default function AppDirectoryModal({ isOpen, onClose, server }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [addedBots, setAddedBots] = useState({});

  if (!isOpen || !server) return null;

  const APPS = [
    {
      id: 'bot_midjourney',
      name: 'Midjourney',
      tagline: 'Erstelle atemberaubende Bilder mit künstlicher Intelligenz direkt auf DilSed.',
      category: 'Künstliche Intelligenz',
      servers: '16M+ Server',
      icon: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=150',
      verified: true
    },
    {
      id: 'bot_mee6',
      name: 'MEE6 Moderation',
      tagline: 'Levelsystem, automatische Moderation, Willkommensnachrichten und Musik.',
      category: 'Moderation',
      servers: '21M+ Server',
      icon: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=150',
      verified: true
    },
    {
      id: 'bot_supabase',
      name: 'Supabase Realtime Sync',
      tagline: 'Synchronisiere deine PostgreSQL- und Realtime-Kanäle direkt mit DilSed.',
      category: 'Entwickler',
      servers: '1.2M+ Server',
      icon: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=150',
      verified: true
    },
    {
      id: 'bot_fredboat',
      name: 'FredBoat Music',
      tagline: 'Hochwertiger Musik-Bot für Sprachkanäle mit YouTube- und SoundCloud-Unterstützung.',
      category: 'Musik',
      servers: '9.4M+ Server',
      icon: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150',
      verified: true
    },
    {
      id: 'bot_carl',
      name: 'Carl-bot',
      tagline: 'Reaktionsrollen (Reaction Roles), detaillierte Audit-Logs und eigene Befehle.',
      category: 'Verwaltung',
      servers: '8.1M+ Server',
      icon: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      verified: true
    }
  ];

  const filteredApps = APPS.filter(
    (app) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.tagline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddBot = (bot) => {
    setAddedBots((prev) => ({ ...prev, [bot.id]: true }));
    alert(`🤖 Der Bot ${bot.name} wurde erfolgreich zum Server ${server.name} hinzugefügt!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-6 animate-in fade-in select-none">
      <div className="bg-discord-chat rounded-xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden relative border border-discord-divider/40">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-discord-textMuted hover:text-white transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-6 pb-4 border-b border-discord-divider/30 flex-shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <Bot className="w-6 h-6 text-discord-blurple" />
            <h2 className="text-xl font-bold text-white">App-Verzeichnis (App Directory)</h2>
          </div>
          <p className="text-xs text-discord-textMuted mb-4">
            Entdecke KI-, Moderations- und Musik-Bots, um deinen Server {server.name} zu erweitern.
          </p>

          <div className="relative">
            <input
              type="text"
              placeholder="Suche nach Apps und Bots..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-discord-darkest rounded-lg px-4 py-2.5 text-xs text-white placeholder-discord-textMuted focus:outline-none focus:ring-1 focus:ring-discord-blurple"
            />
            <Search className="w-4 h-4 text-discord-textMuted absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Bot list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          <div className="text-[11px] font-bold text-discord-textMuted uppercase mb-2">
            EMPFOHLENE APPS ({filteredApps.length})
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredApps.map((app) => {
              const isAdded = addedBots[app.id];
              return (
                <div
                  key={app.id}
                  className="bg-discord-channels rounded-xl p-4 border border-discord-divider/30 flex flex-col justify-between hover:border-discord-blurple/50 transition shadow"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={app.icon}
                      alt={app.name}
                      className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-discord-divider/40"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                        <span className="truncate">{app.name}</span>
                        {app.verified && (
                          <span className="text-[10px] bg-discord-blurple text-white font-bold px-1 rounded">
                            BOT
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-discord-textMuted truncate">
                        {app.category} • {app.servers}
                      </div>
                      <p className="text-xs text-discord-textNormal line-clamp-2 mt-1">
                        {app.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-discord-divider/20 flex items-center justify-end">
                    <button
                      onClick={() => handleAddBot(app)}
                      disabled={isAdded}
                      className={`px-4 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition ${
                        isAdded
                          ? 'bg-discord-green/20 text-discord-green border border-discord-green/40'
                          : 'bg-discord-blurple hover:bg-discord-blurpleHover text-white shadow'
                      }`}
                    >
                      {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      <span>{isAdded ? 'Hinzugefügt' : 'Zu Server hinzufügen'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
