import React from 'react';
import { X, Search, CheckCircle, Users } from 'lucide-react';
import { exploreServersData } from '../../data/initialData';

export default function ExploreServersModal({ isOpen, onClose, onJoinServer }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-6 animate-in fade-in select-none">
      <div className="bg-[#0a0a0d] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(212,175,55,0.18)] w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden relative border border-amber-500/30">
        {/* Header with Search Banner in Black & Gold */}
        <div className="relative bg-gradient-to-b from-[#14120c] via-[#0d0c09] to-[#0a0a0d] p-8 text-center text-white flex-shrink-0 border-b border-amber-500/25">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-amber-200/70 hover:text-amber-400 transition"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-black mb-2 tracking-tight bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
            Finde deine Community auf DilSed
          </h2>
          <p className="text-xs text-amber-200/60 max-w-md mx-auto mb-5">
            Von Gaming und Musik bis hin zu Programmierung und Kunst – finde die perfekte Community für dich.
          </p>

          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Suche nach Communitys, Spielen, Interessen..."
              className="w-full bg-[#121216] text-white text-xs px-4 py-3 pr-10 rounded-xl shadow-lg border border-amber-500/25 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50 placeholder:text-amber-200/40"
            />
            <Search className="w-4 h-4 text-amber-400 absolute right-3.5 top-3.5" />
          </div>
        </div>

        {/* Community List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          <h3 className="text-sm font-bold text-amber-300/80 uppercase tracking-wider mb-2 flex items-center gap-2">
            <span>EMPFOHLENE COMMUNITYS</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exploreServersData.map((s) => (
              <div
                key={s.id}
                className="bg-[#0e0e12] rounded-xl overflow-hidden border border-amber-500/20 flex flex-col hover:-translate-y-1 transition duration-200 shadow-lg hover:border-amber-400/60 hover:shadow-amber-500/10 group"
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
                    className="w-12 h-12 rounded-xl object-cover border-2 border-amber-400/60 absolute bottom-2 left-3 shadow-lg"
                  />
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 font-bold text-white text-sm mb-1">
                      <span className="truncate">{s.name}</span>
                      {s.verified && (
                        <CheckCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-neutral-400 line-clamp-2 mb-3">
                      {s.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-amber-500/15 flex items-center justify-between">
                    <span className="text-[11px] text-amber-200/60 flex items-center gap-1 font-medium">
                      <Users className="w-3 h-3 text-amber-400" />
                      {s.online}
                    </span>
                    <button
                      onClick={() => {
                        onJoinServer(s);
                        onClose();
                      }}
                      className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 text-neutral-950 text-xs font-bold px-3.5 py-1.5 rounded-lg transition shadow-md shadow-amber-500/20 active:scale-95"
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
