import React from 'react';

export default function MemberContextMenuHeader({ member }) {
  return (
    <div className="px-2.5 py-1.5 border-b border-discord-divider/30 mb-1 flex items-center gap-2">
      <img
        src={member.avatar}
        alt={member.displayName}
        className="w-6 h-6 rounded-full object-cover flex-shrink-0"
      />
      <div className="truncate flex-1">
        <div className="font-semibold text-white truncate text-[11px] leading-tight">
          {member.displayName}
        </div>
        <div className="text-[10px] text-discord-textMuted truncate">
          @{member.username}
        </div>
      </div>
    </div>
  );
}
