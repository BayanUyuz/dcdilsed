import React from 'react';
import { Plus, Copy, Trash2 } from 'lucide-react';

export default function VoiceInvitesTab({
  invites,
  copiedInvite,
  handleCreateNewInvite,
  handleCopyInvite,
  handleDeleteInvite
}) {
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white mb-1">
            Aktive Sprachkanal-Einladungen
          </h1>
          <p className="text-xs text-discord-textMuted">
            Einladungslinks mit direktem Einstieg in diesen Sprachraum.
          </p>
        </div>

        <button
          onClick={handleCreateNewInvite}
          className="bg-discord-blurple hover:bg-discord-blurpleHover text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Neue Einladung</span>
        </button>
      </div>

      <div className="space-y-2.5">
        {invites.length === 0 ? (
          <div className="py-8 text-center text-xs text-discord-textMuted bg-discord-darkest/40 rounded-2xl border border-discord-divider/30">
            Keine aktiven Einladungen für diesen Sprachraum. Erstelle eine neue Einladung!
          </div>
        ) : (
          invites.map((inv) => (
            <div
              key={inv.id}
              className="p-3.5 bg-discord-darkest/60 border border-discord-divider/40 rounded-2xl flex items-center justify-between gap-4"
            >
              <div>
                <div className="text-sm font-bold text-white font-mono flex items-center gap-2">
                  <span>{inv.code}</span>
                  {copiedInvite === inv.code && (
                    <span className="text-[10px] text-discord-green font-sans font-bold bg-discord-green/20 px-1.5 rounded">
                      Kopiert!
                    </span>
                  )}
                </div>
                <div className="text-xs text-discord-textMuted mt-1 flex items-center gap-3">
                  <span>
                    Erstellt von: <strong className="text-white">{inv.author}</strong>
                  </span>
                  <span>&bull;</span>
                  <span>{inv.uses} Mal verwendet</span>
                  <span>&bull;</span>
                  <span>Gültig bis: {inv.expires}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => handleCopyInvite(inv.code)}
                  className="px-3 py-1.5 rounded-xl bg-discord-channels hover:bg-discord-hoverChannel text-xs text-white font-medium flex items-center gap-1.5 transition border border-discord-divider/40"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Kopieren</span>
                </button>

                <button
                  onClick={() => handleDeleteInvite(inv.id)}
                  className="p-2 rounded-xl text-discord-textMuted hover:text-discord-red hover:bg-discord-red/10 transition"
                  title="Einladung löschen"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
