import React from 'react';
import { X, Search, CheckCircle, Users } from 'lucide-react';
import { exploreServersData } from '../../data/initialData';

export default function ExploreServersModal({ isOpen, onClose, onJoinServer }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-6 animate-in fade-in">
      <div className="bg-discord-chat rounded-xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden relative border border-discord-divider/40">
        {/* Header with Search Banner */}
        <div className="relative bg-gradient-to-r from-discord-blurple to-[#3b429f] p-8 text-center text-white flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-black mb-2">
            Finde deine Community auf DilSed
          </h2>
          <p className="text-xs text-white/80 max-w-md mx-auto mb-5">
            Von Gaming und Musik bis hin zu Programmierung und Kunst – finde die perfekte Community für dich.
          </p>

          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Suche nach Communitys, Spielen, Interessen..."
              className="w-full bg-discord-chat text-discord-textNormal text-xs px-4 py-3 pr-10 rounded-lg shadow-lg focus:outline-none placeholder-discord-textMuted"
            />
            <Search className="w-4 h-4 text-discord-textMuted absolute right-3 top-3.5" />
          </div>
        </div>

        {/* Community List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
            EMPFOHLENE COMMUNITYS
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exploreServersData.map((s) => (
              <div
                key={s.id}
                className="bg-discord-channels rounded-lg overflow-hidden border border-discord-divider/30 flex flex-col hover:-translate-y-1 transition duration-200 shadow-md group"
              >
                <div className="h-28 overflow-hidden relative">
                  <img
                    src={s.banner}
                    alt={s.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <img
                    src={s.icon}
                    alt={s.name}
                    className="w-12 h-12 rounded-xl object-cover border-4 border-discord-channels absolute bottom-2 left-3 shadow"
                  />
                </div>

                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 font-bold text-white text-sm mb-1">
                      <span className="truncate">{s.name}</span>
                      {s.verified && (
                        <CheckCircle className="w-3.5 h-3.5 text-discord-green flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-discord-textMuted line-clamp-2 mb-3">
                      {s.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-discord-divider/30 flex items-center justify-between">
                    <span className="text-[11px] text-discord-textMuted flex items-center gap-1 font-medium">
                      <Users className="w-3 h-3" />
                      {s.online}
                    </span>
                    <button
                      onClick={() => {
                        onJoinServer(s);
                        onClose();
                      }}
                      className="bg-discord-blurple hover:bg-discord-blurpleHover text-white text-xs font-semibold px-3 py-1 rounded transition"
                    >
                      Beitreten
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
