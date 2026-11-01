import React, { useState } from 'react';
import { X, Edit3 } from 'lucide-react';

export default function EditNicknameModal({ isOpen, onClose, member, onSaveNickname }) {
  const [nickname, setNickname] = useState(member?.displayName || '');

  if (!isOpen || !member) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveNickname(member.id, nickname.trim() || member.username);
    onClose();
  };

  const handleReset = () => {
    onSaveNickname(member.id, member.username);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in select-none">
      <div className="bg-discord-darkest w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-discord-divider/50 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Edit3 className="w-5 h-5 text-discord-blurple" />
            <span>Spitznamen ändern</span>
          </div>
          <button
            onClick={onClose}
            className="text-discord-textMuted hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-discord-textMuted mb-4">
          Passe den sichtbaren Spitznamen von <strong className="text-white">{member.displayName}</strong> auf diesem Server an.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-discord-textMuted uppercase mb-1.5">
              SPITZNAME
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder={member.username}
              className="w-full bg-discord-chat border border-discord-divider/60 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-discord-textMuted focus:outline-none focus:border-discord-blurple"
              autoFocus
              maxLength={32}
            />
            <div className="text-right text-[10px] text-discord-textMuted mt-1">
              {nickname.length}/32
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-discord-divider/30">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-discord-textMuted hover:underline"
            >
              Auf Standard zurücksetzen
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white hover:underline transition"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-discord-blurple hover:bg-discord-blurpleHover text-white transition shadow-md"
              >
                Speichern
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
