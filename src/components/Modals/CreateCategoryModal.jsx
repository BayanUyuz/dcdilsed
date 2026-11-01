import React, { useState } from 'react';
import { X, FolderPlus, Lock } from 'lucide-react';

export default function CreateCategoryModal({ isOpen, onClose, onCreateCategory }) {
  const [categoryName, setCategoryName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    onCreateCategory({
      id: 'cat_' + Date.now(),
      name: categoryName.trim().toUpperCase(),
      isPrivate,
      channels: []
    });

    onClose();
    setCategoryName('');
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

        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex items-center gap-2 mb-1">
            <FolderPlus className="w-6 h-6 text-discord-blurple" />
            <h2 className="text-lg font-bold text-white">Kategorie erstellen</h2>
          </div>
          <p className="text-xs text-discord-textMuted mb-6">
            Erstelle eine neue Kategorie, um deine Kanäle übersichtlich zu organisieren.
          </p>

          <div className="mb-5">
            <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1">
              KATEGORIENAME <span className="text-discord-red">*</span>
            </label>
            <input
              type="text"
              required
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="NEUE KATEGORIE"
              className="w-full bg-discord-darkest rounded px-3 py-2 text-xs text-white uppercase placeholder-discord-textMuted border border-discord-darkest focus:border-discord-blurple focus:outline-none"
            />
          </div>

          <div className="bg-discord-darkest/70 p-3.5 rounded-lg border border-discord-divider/30 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-discord-textMuted" />
              <div>
                <div className="text-xs font-bold text-white">Private Kategorie</div>
                <div className="text-[10px] text-discord-textMuted">
                  Nur ausgewählte Rollen und Mitglieder können diese Kategorie sehen
                </div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="w-4 h-4 accent-discord-blurple cursor-pointer"
            />
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
              disabled={!categoryName.trim()}
              className="bg-discord-blurple hover:bg-discord-blurpleHover text-white px-5 py-2 rounded text-xs font-semibold transition disabled:opacity-50"
            >
              Kategorie erstellen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
