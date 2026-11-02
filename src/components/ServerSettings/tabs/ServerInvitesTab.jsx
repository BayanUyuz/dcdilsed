import React from 'react';
import { Link } from 'lucide-react';

export default function ServerInvitesTab({ invitesList, onRevokeInvite }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-white">Aktive Einladungen</h2>
        <span className="text-xs text-discord-textMuted font-mono">{invitesList.length} Einladungen</span>
      </div>
      <p className="text-xs text-discord-textMuted mb-6">
        Alle aktiven Einladungslinks und Nutzungsstatistiken für deinen Server.
      </p>

      {invitesList.length === 0 ? (
        <div className="py-8 text-center text-xs text-discord-textMuted bg-discord-channels/40 rounded-xl border border-dashed border-discord-divider/30">
          Keine aktiven Einladungen vorhanden.
        </div>
      ) : (
        <div className="space-y-3">
          {invitesList.map((inv) => (
            <div
              key={inv.code}
              className="bg-discord-channels/60 p-4 rounded-xl border border-discord-divider/30 flex items-center justify-between"
            >
              <div>
                <div className="font-mono text-xs font-bold text-discord-blurple flex items-center gap-1.5">
                  <Link className="w-3.5 h-3.5" />
                  <span>https://discord.gg/{inv.code}</span>
                </div>
                <div className="text-[10px] text-discord-textMuted mt-1">
                  Erstellt von: <strong className="text-white">{inv.creator}</strong> • {inv.uses} Nutzungen • {inv.expires}
                </div>
              </div>
              <button
                onClick={() => onRevokeInvite(inv.code)}
                className="text-discord-red hover:bg-discord-red/20 px-3 py-1.5 rounded text-xs font-semibold transition cursor-pointer"
              >
                Widerrufen
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
