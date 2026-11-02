import React from 'react';

export default function ServerTagTab({
  vanityUrl,
  setVanityUrl,
  copiedVanity,
  setCopiedVanity,
  serverTag,
  setServerTag,
  onSave
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-2">Server-Tag & Benutzerdefinierte URL (Vanity URL)</h2>
      <p className="text-xs text-discord-textMuted mb-6">
        Erstelle einen einprägsamen Einladungslink und ein Community-Tag für deinen Server.
      </p>

      <div className="bg-discord-channels/60 rounded-xl p-5 border border-discord-divider/30 space-y-5">
        {/* Vanity URL */}
        <div>
          <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1">
            BENUTZERDEFINIERTER EINLADUNGSLINK (VANITY URL)
          </label>
          <div className="flex items-center bg-discord-darkest rounded px-3 py-2 border border-discord-divider/30 focus-within:border-discord-blurple">
            <span className="text-xs text-discord-textMuted font-mono">https://discord.gg/</span>
            <input
              type="text"
              value={vanityUrl}
              onChange={(e) => setVanityUrl(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
              className="bg-transparent flex-1 text-xs text-white font-mono focus:outline-none pl-1"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(`https://discord.gg/${vanityUrl}`);
                setCopiedVanity(true);
                setTimeout(() => setCopiedVanity(false), 2000);
              }}
              className="text-xs text-discord-blurple hover:underline font-semibold ml-2 cursor-pointer"
            >
              {copiedVanity ? 'Kopiert!' : 'Kopieren'}
            </button>
          </div>
          <p className="text-[10px] text-discord-textMuted mt-1">
            Dieser permanente Link ist für deinen Server dauerhaft aktiv.
          </p>
        </div>

        {/* Server Tag */}
        <div>
          <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1">
            SERVER-TAG (ABZEICHEN)
          </label>
          <input
            type="text"
            maxLength={15}
            value={serverTag}
            onChange={(e) => setServerTag(e.target.value.toUpperCase())}
            placeholder="Z. B. DEV-HUB"
            className="w-full bg-discord-darkest rounded px-3 py-2 text-xs text-white uppercase font-mono tracking-wider border border-discord-divider/30 focus:outline-none"
          />
          <p className="text-[10px] text-discord-textMuted mt-1">
            Dieses Tag wird in den Profilen deiner Mitglieder und Serverlisten angezeigt.
          </p>
        </div>

        <button
          onClick={onSave}
          className="bg-discord-blurple hover:bg-discord-blurpleHover text-white px-5 py-2 rounded text-xs font-semibold transition cursor-pointer"
        >
          Tag & URL speichern
        </button>
      </div>
    </div>
  );
}
