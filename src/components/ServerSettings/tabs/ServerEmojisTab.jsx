import React from 'react';
import { Trash2 } from 'lucide-react';

export default function ServerEmojisTab({
  emojis,
  setEmojis,
  newEmojiName,
  setNewEmojiName,
  newEmojiChar,
  setNewEmojiChar,
  onAddEmoji
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-white">Eigene Server-Emojis</h2>
        <span className="text-xs text-discord-textMuted font-mono">{emojis.length} / 50 Slots</span>
      </div>
      <p className="text-xs text-discord-textMuted mb-6">
        Füge benutzerdefinierte Emojis hinzu, die Mitglieder im Text- und Sprachchat nutzen können.
      </p>

      <form onSubmit={onAddEmoji} className="bg-discord-darkest p-4 rounded-xl border border-discord-divider/30 mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Emoji (z. B. 🚀)"
          value={newEmojiChar}
          onChange={(e) => setNewEmojiChar(e.target.value)}
          className="w-20 bg-discord-chat rounded px-3 py-2 text-sm text-center text-white border border-discord-divider/40 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Emoji-Name (z. B. rakete)"
          value={newEmojiName}
          onChange={(e) => setNewEmojiName(e.target.value)}
          className="flex-1 bg-discord-chat rounded px-3 py-2 text-xs text-white border border-discord-divider/40 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!newEmojiName || !newEmojiChar}
          className="bg-discord-blurple hover:bg-discord-blurpleHover text-white px-5 py-2 rounded text-xs font-semibold transition disabled:opacity-50 cursor-pointer"
        >
          Emoji hochladen
        </button>
      </form>

      {emojis.length === 0 ? (
        <div className="py-8 text-center text-xs text-discord-textMuted bg-discord-darkest rounded-xl border border-dashed border-discord-divider/30">
          Noch keine benutzerdefinierten Emojis auf diesem Server vorhanden.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {emojis.map((em) => (
            <div
              key={em.id}
              className="bg-discord-channels p-3 rounded-lg border border-discord-divider/30 flex items-center justify-between group"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="text-2xl">{em.emoji}</span>
                <span className="text-xs font-semibold text-white truncate">{em.name}</span>
              </div>
              <button
                onClick={() => setEmojis((p) => p.filter((x) => x.id !== em.id))}
                className="opacity-0 group-hover:opacity-100 text-discord-red hover:scale-110 transition p-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
