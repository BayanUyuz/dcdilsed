import React from 'react';
import { Sparkles } from 'lucide-react';

export default function ActiveNowSidebar({ friends }) {
  const activeFriends = friends.filter((f) => f.status !== 'offline');

  return (
    <div className="w-80 border-l border-amber-500/15 bg-[#060608] p-4 hidden xl:block">
      <h3 className="font-extrabold text-amber-200 text-base mb-3">
        Jetzt aktiv
      </h3>
      {activeFriends.length > 0 ? (
        <div className="space-y-3">
          {activeFriends.map((f) => (
            <div
              key={f.id}
              className="bg-[#0c0c10] border border-amber-500/20 rounded-xl p-3 space-y-2 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <img
                  src={f.avatar}
                  alt={f.displayName}
                  className="w-8 h-8 rounded-full object-cover border border-amber-500/20"
                />
                <div>
                  <div className="text-sm font-bold text-amber-200">
                    {f.displayName}
                  </div>
                  <div className="text-xs text-amber-300/60 font-medium">
                    {f.statusText || 'Online'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 px-4 bg-[#0c0c10]/60 rounded-xl border border-dashed border-amber-500/20 text-amber-300/70 text-xs">
          <Sparkles className="w-8 h-8 mx-auto mb-2 text-amber-400" />
          <p className="font-bold text-amber-200 mb-1">Hier ist es im Moment ruhig</p>
          <p className="text-[11px] leading-relaxed font-medium">
            Wenn Freunde online Aktivitäten starten oder Musik hören, siehst du sie hier.
          </p>
        </div>
      )}
    </div>
  );
}
