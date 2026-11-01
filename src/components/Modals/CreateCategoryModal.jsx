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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in select-none">
      <div className="bg-[#0a0a0d] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(212,175,55,0.18)] w-full max-w-md overflow-hidden relative border border-amber-500/30">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-amber-200/60 hover:text-amber-400 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex items-center gap-2 mb-1">
            <FolderPlus className="w-6 h-6 text-amber-400" />
            <h2 className="text-lg font-black text-white tracking-tight bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
              Kategorie erstellen
            </h2>
          </div>
          <p className="text-xs text-amber-200/60 mb-6">
            Erstelle eine neue Kategorie, um deine Kanäle übersichtlich zu organisieren.
          </p>

          <div className="mb-5">
            <label className="text-[11px] font-bold text-amber-300/80 uppercase block mb-1 tracking-wider">
              KATEGORIENAME <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              required
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="NEUE KATEGORIE"
              className="w-full bg-[#121216] rounded-xl px-3.5 py-2.5 text-xs text-white uppercase placeholder-neutral-500 border border-amber-500/25 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50"
            />
          </div>

          <div className="bg-[#101014] p-3.5 rounded-xl border border-amber-500/20 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-amber-400" />
              <div>
                <div className="text-xs font-bold text-white">Private Kategorie</div>
                <div className="text-[10px] text-neutral-400">
                  Nur ausgewählte Rollen und Mitglieder können diese Kategorie sehen
                </div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="w-4 h-4 accent-amber-400 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-amber-500/15">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold text-amber-200/70 hover:text-white px-2 py-1"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={!categoryName.trim()}
              className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 text-neutral-950 px-5 py-2.5 rounded-xl text-xs font-black transition disabled:opacity-50 shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer"
            >
              Kategorie erstellen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
