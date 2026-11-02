import React from 'react';
import { Check, Copy } from 'lucide-react';

export default function AddFriendView({
  addFriendInput,
  setAddFriendInput,
  handleAddFriend,
  addFriendSuccess,
  currentUser
}) {
  const [copied, setCopied] = React.useState(false);

  const handleCopyUsername = () => {
    if (currentUser?.username) {
      navigator.clipboard.writeText(currentUser.username);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex-1 p-6">
      <h3 className="text-amber-200 font-extrabold text-base uppercase tracking-wider mb-1">
        FREUND HINZUFÜGEN
      </h3>
      <p className="text-xs text-amber-300/70 mb-4 font-medium">
        Du kannst Freunde mit ihrem eindeutigen Benutzernamen hinzufügen und in Echtzeit chatten.
      </p>

      {/* Your Own Username Badge */}
      <div className="mb-5 p-3.5 bg-[#0c0c10] border border-amber-500/25 rounded-xl flex items-center justify-between max-w-xl">
        <div className="flex flex-col">
          <span className="text-[11px] text-amber-300/70">Dein Benutzername zum Teilen:</span>
          <span className="text-xs font-mono font-extrabold text-amber-400">
            {currentUser?.username}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopyUsername}
          className="px-2.5 py-1 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-500/30 transition flex items-center gap-1 cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Kopiert!' : 'Kopieren'}</span>
        </button>
      </div>

      <form onSubmit={handleAddFriend} className="max-w-xl">
        <div className="relative bg-[#0c0c10] rounded-xl flex items-center px-4 py-2 border border-amber-500/30 focus-within:border-amber-400 focus-within:shadow-[0_0_25px_rgba(245,158,11,0.25)] transition">
          <input
            type="text"
            value={addFriendInput}
            onChange={(e) => setAddFriendInput(e.target.value)}
            placeholder="Benutzernamen deines Freundes eingeben..."
            className="bg-transparent flex-1 text-sm text-amber-100 placeholder:text-amber-200/40 focus:outline-none font-medium pr-2"
          />
          <button
            type="submit"
            disabled={!addFriendInput.trim()}
            className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-110 disabled:opacity-40 text-neutral-950 text-xs font-black px-4 py-2 rounded-lg transition shadow-md shadow-amber-500/30 flex-shrink-0 cursor-pointer"
          >
            Freundschaftsanfrage senden
          </button>
        </div>
      </form>

      {addFriendSuccess && (
        <div className="mt-3 text-sm text-amber-300 font-bold flex items-center gap-1.5 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Freundschaftsanfrage live gesendet und zur Freundesliste hinzugefügt!</span>
        </div>
      )}
    </div>
  );
}
