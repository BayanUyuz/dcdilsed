import React from 'react';
import { Search, Users, UserPlus } from 'lucide-react';
import UserDock from '../Common/UserDock';

export default function DirectMessagesSidebar({
  friends,
  activeFriendId,
  setActiveFriendId,
  setActiveTab,
  currentUser,
  isMuted,
  setIsMuted,
  isDeafened,
  setIsDeafened,
  onOpenSettings
}) {
  return (
    <aside className="w-60 bg-[#09090c] flex flex-col select-none flex-shrink-0 border-r border-amber-500/15">
      {/* Search header */}
      <div className="h-12 px-3 flex items-center border-b border-amber-500/15 bg-[#060608] shadow-sm">
        <button
          onClick={() => setActiveFriendId(null)}
          className="w-full h-8 bg-[#0e0e12] border border-amber-500/20 rounded-lg text-xs text-amber-200/70 px-2.5 flex items-center justify-between hover:text-amber-200 hover:border-amber-400/50 transition"
        >
          <span>Finde Unterhaltung</span>
          <Search className="w-3.5 h-3.5 text-amber-400" />
        </button>
      </div>

      {/* DM Navigation Items */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        <button
          onClick={() => setActiveFriendId(null)}
          className={`w-full px-3 py-2 rounded-md flex items-center gap-3 text-sm transition ${
            activeFriendId === null
              ? 'bg-amber-400/15 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm'
              : 'text-amber-200/75 hover:bg-amber-400/10 hover:text-amber-100 font-medium'
          }`}
        >
          <Users className="w-5 h-5 text-amber-400" />
          <span>Freunde</span>
        </button>

        {/* Direct Messages Header */}
        <div className="pt-4 pb-1 px-3 text-[11px] font-extrabold text-amber-400 tracking-wider uppercase flex items-center justify-between">
          <span>DIREKTNACHRICHTEN</span>
          <button
            onClick={() => {
              setActiveFriendId(null);
              setActiveTab('add');
            }}
            title="DM erstellen"
            className="text-amber-400 hover:text-amber-200 transition"
          >
            <UserPlus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* DM Friend Items */}
        {friends.map((friend) => {
          const isActive = activeFriendId === friend.id;
          return (
            <button
              key={friend.id}
              onClick={() => setActiveFriendId(friend.id)}
              className={`w-full px-2 py-2 rounded-md flex items-center gap-3 text-sm transition group ${
                isActive
                  ? 'bg-amber-400/15 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm'
                  : 'text-amber-200/75 hover:bg-amber-400/10 hover:text-amber-100 font-medium'
              }`}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={friend.avatar}
                  alt={friend.displayName}
                  className="w-8 h-8 rounded-full object-cover border border-amber-500/20"
                />
                <span
                  className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-black ${
                    friend.status === 'online'
                      ? 'bg-emerald-400'
                      : friend.status === 'idle'
                      ? 'bg-amber-400'
                      : friend.status === 'dnd'
                      ? 'bg-red-500'
                      : 'bg-neutral-600'
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="truncate font-bold text-amber-200">
                  {friend.displayName}
                </div>
                <div className="truncate text-xs text-amber-300/60 font-medium">
                  {friend.statusText}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* User Dock */}
      <UserDock
        currentUser={currentUser}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        isDeafened={isDeafened}
        setIsDeafened={setIsDeafened}
        onOpenSettings={onOpenSettings}
      />
    </aside>
  );
}
