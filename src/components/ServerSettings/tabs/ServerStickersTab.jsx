import React from 'react';
import { Trash2 } from 'lucide-react';

export default function ServerStickersTab({
  stickers,
  setStickers,
  newStickerEmoji,
  setNewStickerEmoji,
  newStickerName,
  setNewStickerName,
  newStickerDesc,
  setNewStickerDesc,
  onAddSticker
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-white">Benutzerdefinierte Sticker</h2>
        <span className="text-xs text-discord-textMuted font-mono">{stickers.length} / 15 Slots</span>
      </div>
      <p className="text-xs text-discord-textMuted mb-6">
        Sticker im Großformat für Mitglieder in Server-Unterhaltungen.
      </p>

      <form onSubmit={onAddSticker} className="bg-discord-darkest p-4 rounded-xl border border-discord-divider/30 mb-6 space-y-3">
        <div className="grid grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Icon (z. B. 🥳)"
            value={newStickerEmoji}
            onChange={(e) => setNewStickerEmoji(e.target.value)}
            className="bg-discord-chat rounded px-3 py-2 text-center text-lg text-white border border-discord-divider/40 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Sticker-Name"
            value={newStickerName}
            onChange={(e) => setNewStickerName(e.target.value)}
            className="col-span-2 bg-discord-chat rounded px-3 py-2 text-xs text-white border border-discord-divider/40 focus:outline-none"
          />
        </div>
        <input
          type="text"
          placeholder="Beschreibung (z. B. Party & Feier)"
          value={newStickerDesc}
          onChange={(e) => setNewStickerDesc(e.target.value)}
          className="w-full bg-discord-chat rounded px-3 py-2 text-xs text-white border border-discord-divider/40 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!newStickerName.trim()}
          className="bg-discord-blurple hover:bg-discord-blurpleHover text-white px-5 py-2 rounded text-xs font-semibold transition disabled:opacity-50 cursor-pointer"
        >
          Sticker hochladen
        </button>
      </form>

      {stickers.length === 0 ? (
        <div className="py-8 text-center text-xs text-discord-textMuted bg-discord-darkest rounded-xl border border-dashed border-discord-divider/30">
          Noch keine benutzerdefinierten Sticker auf diesem Server vorhanden.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stickers.map((st) => (
            <div
              key={st.id}
              className="bg-discord-channels p-4 rounded-xl border border-discord-divider/30 flex flex-col items-center text-center relative group"
            >
              <button
                onClick={() => setStickers((p) => p.filter((x) => x.id !== st.id))}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-discord-red p-1 transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <span className="text-4xl mb-2">{st.image}</span>
              <div className="font-bold text-white text-xs">{st.name}</div>
              <div className="text-[10px] text-discord-textMuted">{st.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
