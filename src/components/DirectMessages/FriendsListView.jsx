import React from 'react';
import { Users, MessageSquare, Phone } from 'lucide-react';

export default function FriendsListView({
  activeTab,
  filteredFriends,
  friends,
  setActiveFriendId,
  setActiveTab
}) {
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      <div className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-3">
        {activeTab === 'online'
          ? `ONLINE — ${filteredFriends.length}`
          : `ALLE FREUNDE — ${friends.length}`}
      </div>

      {filteredFriends.length === 0 ? (
        <div className="text-center py-16 px-4">
          <Users className="w-16 h-16 mx-auto mb-4 opacity-30 text-amber-400" />
          <p className="font-extrabold text-amber-200 text-sm mb-1">Keine Freunde gefunden</p>
          <p className="text-xs text-amber-300/70 mb-6 max-w-sm mx-auto font-medium">
            Niemand ist gerade hier. Füge Freunde über ihren DilSed-Benutzernamen hinzu!
          </p>
          <button
            onClick={() => setActiveTab('add')}
            className="bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-neutral-950 px-5 py-2.5 rounded-xl text-xs font-black transition shadow-md shadow-amber-500/25"
          >
            Freund hinzufügen
          </button>
        </div>
      ) : (
        <div className="space-y-1">
          {filteredFriends.map((f) => (
            <div
              key={f.id}
              className="group flex items-center justify-between p-2.5 hover:bg-amber-400/10 rounded-xl transition border-t border-amber-500/15"
            >
              <div
                onClick={() => setActiveFriendId(f.id)}
                className="flex items-center gap-3 flex-1 cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={f.avatar}
                    alt={f.displayName}
                    className="w-10 h-10 rounded-full object-cover border border-amber-500/20"
                  />
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-black ${
                      f.status === 'online'
                        ? 'bg-emerald-400'
                        : f.status === 'idle'
                        ? 'bg-amber-400'
                        : f.status === 'dnd'
                        ? 'bg-red-500'
                        : 'bg-neutral-600'
                    }`}
                  />
                </div>
                <div>
                  <div className="font-bold text-sm text-amber-200">
                    {f.displayName}
                  </div>
                  <div className="text-xs text-amber-300/60 font-medium">
                    {f.statusText}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveFriendId(f.id)}
                  className="w-9 h-9 rounded-full bg-[#111115] border border-amber-500/25 flex items-center justify-center text-amber-400 hover:text-neutral-950 hover:bg-amber-400 transition"
                  title="Nachricht senden"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
                <button
                  onClick={() => alert(`${f.displayName} wird angerufen...`)}
                  className="w-9 h-9 rounded-full bg-[#111115] border border-amber-500/25 flex items-center justify-center text-amber-400 hover:text-neutral-950 hover:bg-amber-400 transition"
                  title="Sprachanruf"
                >
                  <Phone className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
