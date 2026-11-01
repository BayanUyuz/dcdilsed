import React, { useState } from 'react';
import { X, FileText } from 'lucide-react';

export default function AddNoteModal({ isOpen, onClose, member, currentNote, onSaveNote }) {
  const [note, setNote] = useState(currentNote || '');

  if (!isOpen || !member) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveNote(member.id, note.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in select-none">
      <div className="bg-discord-darkest w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-discord-divider/50 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <FileText className="w-5 h-5 text-discord-blurple" />
            <span>Benutzernotiz hinzufügen</span>
          </div>
          <button
            onClick={onClose}
            className="text-discord-textMuted hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-discord-textMuted mb-4">
          Erstelle eine private Notiz über <strong className="text-white">{member.displayName}</strong>. Nur du kannst diese Notiz sehen.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Hier klicken, um eine Notiz einzugeben (z. B. aus dem Designteam, kommt am Samstag in den Sprachkanal...)"
              className="w-full bg-discord-chat border border-discord-divider/60 rounded-xl p-3 text-xs text-white placeholder-discord-textMuted focus:outline-none focus:border-discord-blurple resize-none"
              autoFocus
              maxLength={256}
            />
            <div className="text-right text-[10px] text-discord-textMuted mt-1">
              {note.length}/256
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-discord-divider/30">
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
              Notiz speichern
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
