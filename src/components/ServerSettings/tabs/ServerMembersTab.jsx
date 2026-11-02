import React from 'react';
import { Search } from 'lucide-react';

export default function ServerMembersTab({
  membersList,
  memberSearch,
  setMemberSearch,
  onKickMember,
  onBanMember
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-white">Servermitglieder</h2>
        <span className="text-xs text-discord-textMuted font-mono">{membersList.length} Mitglieder</span>
      </div>
      <p className="text-xs text-discord-textMuted mb-4">
        Verwalte Mitglieder, weise Rollen zu oder entferne Störenfriede.
      </p>

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Mitglied suchen..."
          value={memberSearch}
          onChange={(e) => setMemberSearch(e.target.value)}
          className="w-full bg-discord-darkest rounded px-3 py-2 text-xs text-white placeholder-discord-textMuted border border-discord-divider/30 focus:outline-none"
        />
        <Search className="w-3.5 h-3.5 text-discord-textMuted absolute right-3 top-2.5" />
      </div>

      <div className="space-y-2">
        {membersList
          .filter((m) => m.name.toLowerCase().includes(memberSearch.toLowerCase()))
          .map((m) => (
            <div
              key={m.id}
              className="bg-discord-channels/60 p-3 rounded-xl border border-discord-divider/30 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <img src={m.avatar} alt={m.name} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-xs text-white flex items-center gap-2">
                    <span>{m.name}</span>
                    <span className="text-[10px] bg-discord-darkest px-2 py-0.5 rounded text-discord-blurple font-bold">
                      {m.role}
                    </span>
                  </div>
                  <div className="text-[10px] text-discord-textMuted">
                    @{m.username} • Beigetreten: {m.joined}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onKickMember(m.id, m.name)}
                  className="bg-discord-darkest hover:bg-discord-hoverChannel text-xs text-white px-2.5 py-1 rounded transition cursor-pointer"
                  title="Vom Server kicken"
                >
                  Kicken
                </button>
                <button
                  onClick={() => onBanMember(m.id, m.name)}
                  className="bg-discord-red/20 hover:bg-discord-red text-discord-red hover:text-white text-xs px-2.5 py-1 rounded transition font-semibold cursor-pointer"
                  title="Vom Server bannen"
                >
                  Bannen
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
