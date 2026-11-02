import React from 'react';
import { Plus, FileText, Trash2 } from 'lucide-react';

export default function ModNotesTab({
  notes = [],
  newNoteText,
  setNewNoteText,
  handleCreateNote,
  onDeleteNote,
  member
}) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-discord-textMuted mb-1">
          MODERATORENNOTIZEN
        </h3>
        <p className="text-xs text-discord-textNormal">
          Diese Notizen sind nur für Administratoren und Moderatoren des Servers sichtbar.
        </p>
      </div>

      {/* Add Note Input */}
      <form onSubmit={handleCreateNote} className="flex gap-2">
        <input
          type="text"
          value={newNoteText}
          onChange={(e) => setNewNoteText(e.target.value)}
          placeholder="Notiz über den Benutzer hinzufügen..."
          className="flex-1 bg-discord-darkest border border-discord-divider/50 rounded-xl px-3.5 py-2 text-xs text-white placeholder-discord-textMuted focus:outline-none focus:border-discord-blurple"
        />
        <button
          type="submit"
          disabled={!newNoteText.trim()}
          className="bg-discord-blurple hover:bg-discord-blurpleHover disabled:opacity-40 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Hinzufügen</span>
        </button>
      </form>

      {/* Notes List */}
      <div className="space-y-2 mt-4">
        {notes.length === 0 ? (
          <div className="text-center py-8 text-discord-textMuted text-xs bg-discord-channels/20 rounded-xl border border-dashed border-discord-divider/40">
            <FileText className="w-8 h-8 mx-auto mb-2 opacity-40" />
            Noch keine Moderationsnotizen für dieses Mitglied vorhanden.
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="bg-discord-channels/40 border border-discord-divider/40 p-3 rounded-xl flex items-start justify-between gap-3 group"
            >
              <div className="space-y-1 text-xs">
                <div className="text-white font-medium">{note.content}</div>
                <div className="text-[10px] text-discord-textMuted flex items-center gap-1.5">
                  <span>Von: {note.author || 'Administrator'}</span>
                  <span>•</span>
                  <span>{note.timestamp || 'Neu'}</span>
                </div>
              </div>
              <button
                onClick={() => onDeleteNote(member.id, note.id)}
                className="text-discord-textMuted hover:text-discord-red transition p-1 opacity-0 group-hover:opacity-100 cursor-pointer"
                title="Notiz löschen"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
