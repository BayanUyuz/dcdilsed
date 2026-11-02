import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function ServerDeleteTab({ server, onDeleteServer, onClose }) {
  const [deleteInput, setDeleteInput] = useState('');

  return (
    <div>
      <h2 className="text-xl font-bold text-discord-red mb-2">Server löschen</h2>
      <p className="text-xs text-discord-textMuted mb-6">
        Diese Aktion kann nicht rückgängig gemacht werden. Der Server mit allen Kanälen, Rollen, Emojis und Nachrichten wird dauerhaft gelöscht.
      </p>

      <div className="bg-discord-red/10 border border-discord-red/40 p-4 rounded-xl mb-6 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-discord-red flex-shrink-0 mt-0.5" />
        <div className="text-xs text-discord-textNormal leading-relaxed">
          Gib zur Bestätigung den vollständigen Servernamen (<strong>{server?.name}</strong>) unten ein:
        </div>
      </div>

      <div className="mb-6">
        <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1">
          SERVERNAMENI YAZIN
        </label>
        <input
          type="text"
          value={deleteInput}
          onChange={(e) => setDeleteInput(e.target.value)}
          placeholder={server?.name}
          className="w-full bg-discord-darkest rounded px-3 py-2 text-xs text-white border border-discord-divider/30 focus:border-discord-red focus:outline-none"
        />
      </div>

      <button
        disabled={deleteInput.trim() !== server?.name}
        onClick={() => {
          onDeleteServer(server.id);
          onClose();
        }}
        className="bg-discord-red hover:bg-discord-red/90 text-white font-semibold px-6 py-2.5 rounded text-xs transition shadow-lg disabled:opacity-40 cursor-pointer"
      >
        Ja, Server endgültig löschen
      </button>
    </div>
  );
}
