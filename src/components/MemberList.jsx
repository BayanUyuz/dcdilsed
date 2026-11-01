import React from 'react';
import { Clock, VolumeX, CheckCircle2, Shield, MicOff, Headphones } from 'lucide-react';

export default function MemberList({
  members,
  onSelectMember,
  onOpenContextMenu,
  userTimeouts = {},
  userMutes = {},
  verifiedUsers = {},
  serverMutedUsers = {},
  serverDeafenedUsers = {}
}) {
  // Group members by role category
  const categories = {};
  members.forEach((m) => {
    const cat = m.roleCategory || (m.role ? m.role.toUpperCase() : 'ONLINE');
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(m);
  });

  const handleContextMenu = (e, member) => {
    e.preventDefault();
    if (onOpenContextMenu) {
      onOpenContextMenu(e, member);
    }
  };

  return (
    <aside className="w-60 bg-[#08080a] flex flex-col select-none flex-shrink-0 border-l border-amber-500/10 h-full overflow-y-auto px-2 py-4 custom-scrollbar">
      {Object.entries(categories).map(([categoryName, memberList]) => (
        <div key={categoryName} className="mb-4">
          <div className="text-[11px] font-bold text-amber-300/60 tracking-wider px-2 mb-1 uppercase flex items-center justify-between">
            <span>{categoryName}</span>
            <span className="text-[10px] font-normal text-amber-300/40">— {memberList.length}</span>
          </div>
          <div className="space-y-[2px]">
            {memberList.map((member) => {
              const isTimedOut = !!userTimeouts[member.id];
              const isMuted = !!userMutes[member.id];
              const isVerified = !!verifiedUsers[member.id];
              const isServerMuted = !!serverMutedUsers[member.id];
              const isServerDeafened = !!serverDeafenedUsers[member.id];

              return (
                <button
                  key={member.id}
                  onClick={() => onSelectMember(member)}
                  onContextMenu={(e) => handleContextMenu(e, member)}
                  className="w-full px-2 py-1.5 rounded-lg flex items-center gap-2.5 hover:bg-discord-hoverChannel transition text-left group relative"
                  title="Linksklick: Profil | Rechtsklick: Moderationsmenü"
                >
                  {/* Avatar with Status Dot */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={member.avatar}
                      alt={member.displayName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-discord-members ${
                        member.status === 'online'
                          ? 'bg-discord-green'
                          : member.status === 'idle'
                          ? 'bg-discord-yellow'
                          : member.status === 'dnd'
                          ? 'bg-discord-red'
                          : 'bg-[#747f8d]'
                      }`}
                    />
                  </div>

                  {/* Name & Custom Status */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 leading-tight">
                      <span
                        className="font-medium text-sm truncate"
                        style={{ color: member.roleColor || '#dbdee1' }}
                      >
                        {member.displayName}
                      </span>

                      {/* Verified Badge */}
                      {isVerified && (
                        <CheckCircle2
                          className="w-3.5 h-3.5 text-discord-green flex-shrink-0"
                          title="Verifiziertes Mitglied"
                        />
                      )}

                      {/* Bot tag */}
                      {member.isBot && (
                        <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-[10px] text-neutral-950 font-black px-1.5 py-0.2 rounded uppercase shadow-xs">
                          BOT
                        </span>
                      )}

                      {/* Server Deafen */}
                      {isServerDeafened && (
                        <Headphones
                          className="w-3.5 h-3.5 text-discord-red flex-shrink-0"
                          title="Serverweit taub geschaltet"
                        />
                      )}

                      {/* Server Muted */}
                      {isServerMuted && !isServerDeafened && (
                        <MicOff
                          className="w-3.5 h-3.5 text-discord-red flex-shrink-0"
                          title="Serverweit stummgeschaltet"
                        />
                      )}

                      {/* Timeout badge icon */}
                      {isTimedOut && (
                        <Clock
                          className="w-3.5 h-3.5 text-discord-yellow flex-shrink-0 animate-pulse"
                          title={`Im Timeout (${userTimeouts[member.id]})`}
                        />
                      )}

                      {/* Local Muted icon */}
                      {isMuted && !isServerMuted && (
                        <VolumeX
                          className="w-3.5 h-3.5 text-discord-red flex-shrink-0"
                          title="Lokal stummgeschaltet"
                        />
                      )}
                    </div>
                    {member.customStatus && (
                      <div className="text-[11px] text-discord-textMuted truncate">
                        {member.customStatus}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </aside>
  );
}
