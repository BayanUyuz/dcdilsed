import React from 'react';
import { Phone, Video, Send } from 'lucide-react';

export default function DirectMessageChatView({
  activeFriend,
  currentUser,
  dmInput,
  setDmInput,
  handleSendDm
}) {
  if (!activeFriend) return null;

  return (
    <div className="flex-1 bg-[#0a0a0d] flex flex-col min-w-0">
      <header className="h-12 px-4 border-b border-amber-500/15 bg-[#060608] flex items-center justify-between shadow-sm select-none">
        <div className="flex items-center gap-2">
          <div className="relative">
            <img
              src={activeFriend.avatar}
              alt={activeFriend.displayName}
              className="w-7 h-7 rounded-full object-cover border border-amber-500/30"
            />
            <span
              className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-black ${
                activeFriend.status === 'online'
                  ? 'bg-emerald-400'
                  : activeFriend.status === 'idle'
                  ? 'bg-amber-400'
                  : 'bg-red-500'
              }`}
            />
          </div>
          <h2 className="font-extrabold text-amber-200 text-base truncate">
            {activeFriend.displayName}
          </h2>
        </div>

        <div className="flex items-center gap-3 text-amber-400">
          <button
            onClick={() => alert(`${activeFriend.displayName} wird angerufen...`)}
            className="hover:text-amber-300 transition p-1"
            title="Sprachanruf starten"
          >
            <Phone className="w-5 h-5" />
          </button>
          <button
            onClick={() => alert(`Videoanruf mit ${activeFriend.displayName} wird gestartet...`)}
            className="hover:text-amber-300 transition p-1"
            title="Videoanruf starten"
          >
            <Video className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* DM Messages Feed */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div className="pt-6 pb-4 border-b border-amber-500/20">
          <img
            src={activeFriend.avatar}
            alt={activeFriend.displayName}
            className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.25)]"
          />
          <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 mb-1">
            {activeFriend.displayName}
          </h1>
          <p className="text-sm text-amber-200/70 font-medium">
            Dies ist der Beginn deines Direktnachrichtenverlaufs mit {activeFriend.displayName}.
          </p>
        </div>

        {activeFriend.messages?.map((msg) => (
          <div key={msg.id} className="flex gap-4 px-2 py-1 hover:bg-amber-400/5 rounded transition">
            <img
              src={msg.isMe ? currentUser.avatar : activeFriend.avatar}
              alt={msg.author}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-amber-500/20"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-amber-300">
                  {msg.author}
                </span>
                <span className="text-[11px] text-amber-200/50">
                  {msg.timestamp}
                </span>
              </div>
              <div className="text-sm text-amber-100/90 mt-0.5 font-normal">
                {msg.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DM Input Bar */}
      <div className="px-4 pb-6 pt-1 select-none">
        <form
          onSubmit={handleSendDm}
          className="bg-[#0c0c10] border border-amber-500/30 rounded-xl flex items-center px-4 py-2.5 focus-within:border-amber-400 focus-within:shadow-[0_0_25px_rgba(245,158,11,0.25)] transition"
        >
          <input
            type="text"
            value={dmInput}
            onChange={(e) => setDmInput(e.target.value)}
            placeholder={`Nachricht an @${activeFriend.displayName}`}
            className="bg-transparent flex-1 text-sm text-amber-100 placeholder:text-amber-200/40 focus:outline-none font-medium"
          />
          <button
            type="submit"
            disabled={!dmInput.trim()}
            className="text-neutral-950 bg-gradient-to-r from-amber-400 to-amber-500 disabled:opacity-40 hover:brightness-110 p-1.5 rounded-lg transition font-bold shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
