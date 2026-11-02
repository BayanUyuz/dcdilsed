import React from 'react';
import { Ban } from 'lucide-react';

export default function ServerBansTab({ bansList, onUnban }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-white">Server-Banns</h2>
        <span className="text-xs text-discord-textMuted font-mono">{bansList.length} Gebannt</span>
      </div>
      <p className="text-xs text-discord-textMuted mb-6">
        Übersicht aller vom Server ausgeschlossenen Benutzer und Bann-Verwaltung.
      </p>

      {bansList.length === 0 ? (
        <div className="py-8 text-center text-xs text-discord-textMuted bg-discord-channels/40 rounded-xl border border-dashed border-discord-divider/30">
          Keine gesperrten Benutzer auf diesem Server.
        </div>
      ) : (
        <div className="space-y-3">
          {bansList.map((ban) => (
            <div
              key={ban.id}
              className="bg-discord-channels/60 p-4 rounded-xl border border-discord-divider/30 flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Ban className="w-4 h-4 text-discord-red" />
                  <span>{ban.name}</span>
                </div>
                <div className="text-[11px] text-discord-textMuted mt-0.5">
                  Grund: {ban.reason} ({ban.date})
                </div>
              </div>
              <button
                onClick={() => onUnban(ban.id)}
                className="bg-discord-darkest hover:bg-discord-hoverChannel border border-discord-divider/40 text-xs text-white px-3 py-1.5 rounded transition cursor-pointer"
              >
                Bann aufheben
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
