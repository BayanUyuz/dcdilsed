import React from 'react';
import { Check } from 'lucide-react';

export default function AddFriendView({
  addFriendInput,
  setAddFriendInput,
  handleAddFriend,
  addFriendSuccess
}) {
  return (
    <div className="flex-1 p-6">
      <h3 className="text-amber-200 font-extrabold text-base uppercase tracking-wider mb-1">
        FREUND HINZUFÜGEN
      </h3>
      <p className="text-xs text-amber-300/70 mb-5 font-medium">
        Du kannst Freunde mit ihrem Benutzernamen hinzufügen.
      </p>

      <form onSubmit={handleAddFriend} className="max-w-xl">
        <div className="relative bg-[#0c0c10] rounded-xl flex items-center px-4 py-2 border border-amber-500/30 focus-within:border-amber-400 focus-within:shadow-[0_0_25px_rgba(245,158,11,0.25)] transition">
          <input
            type="text"
            value={addFriendInput}
            onChange={(e) => setAddFriendInput(e.target.value)}
            placeholder="Benutzernamen eingeben (z. B. Wumpus#0001)"
            className="bg-transparent flex-1 text-sm text-amber-100 placeholder:text-amber-200/40 focus:outline-none font-medium pr-2"
          />
          <button
            type="submit"
            disabled={!addFriendInput.trim()}
            className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-110 disabled:opacity-40 text-neutral-950 text-xs font-black px-4 py-2 rounded-lg transition shadow-md shadow-amber-500/30 flex-shrink-0"
          >
            Freundschaftsanfrage senden
          </button>
        </div>
      </form>

      {addFriendSuccess && (
        <div className="mt-3 text-sm text-amber-300 font-bold flex items-center gap-1.5 animate-in fade-in">
          <Check className="w-4 h-4 text-amber-400" />
          <span>Freundschaftsanfrage erfolgreich gesendet und zur Freundesliste hinzugefügt!</span>
        </div>
      )}
    </div>
  );
}
