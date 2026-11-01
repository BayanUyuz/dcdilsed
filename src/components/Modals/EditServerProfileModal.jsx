import React, { useState } from 'react';
import { X, User, Camera, Upload, Check } from 'lucide-react';

export default function EditServerProfileModal({
  isOpen,
  onClose,
  server,
  currentUser,
  onUpdateServerProfile,
}) {
  const [nickname, setNickname] = useState(currentUser?.displayName || '');
  const [serverAvatar, setServerAvatar] = useState(currentUser?.avatar || '');

  if (!isOpen || !server) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (onUpdateServerProfile) {
      onUpdateServerProfile(server.id, { nickname, serverAvatar });
    }
    alert(`Dein Server-Profil für "${server.name}" wurde gespeichert!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 animate-in fade-in select-none">
      <div className="bg-discord-chat rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative border border-discord-divider/40">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-discord-textMuted hover:text-white transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <form onSubmit={handleSave} className="p-6">
          <div className="flex items-center gap-2 mb-1">
            <User className="w-6 h-6 text-discord-blurple" />
            <h2 className="text-lg font-bold text-white">
              {server.name} Server-Profil
            </h2>
          </div>
          <p className="text-xs text-discord-textMuted mb-6">
            Lege einen individuellen Spitznamen und Avatar fest, der nur auf diesem Server angezeigt wird.
          </p>

          {/* Nickname */}
          <div className="mb-4">
            <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1">
              SERVER-SPITZNAME
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder={currentUser?.displayName}
              className="w-full bg-discord-darkest rounded px-3 py-2 text-xs text-white border border-discord-darkest focus:border-discord-blurple focus:outline-none"
            />
          </div>

          {/* Avatar URL */}
          <div className="mb-6">
            <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1">
              SERVER-AVATAR (BILD-URL)
            </label>
            <div className="flex items-center gap-3">
              <img
                src={serverAvatar}
                alt="Avatar"
                className="w-12 h-12 rounded-full object-cover border-2 border-discord-blurple flex-shrink-0"
              />
              <input
                type="text"
                value={serverAvatar}
                onChange={(e) => setServerAvatar(e.target.value)}
                placeholder="https://..."
                className="w-full bg-discord-darkest rounded px-3 py-2 text-xs text-white border border-discord-darkest focus:border-discord-blurple focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-discord-divider/30">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold text-white hover:underline"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="bg-discord-blurple hover:bg-discord-blurpleHover text-white px-5 py-2 rounded text-xs font-semibold transition shadow"
            >
              Speichern
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
