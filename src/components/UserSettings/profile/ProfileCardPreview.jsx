import React from 'react';
import { Clock } from 'lucide-react';
import { AVATAR_DECORATIONS } from '../constants';

export default function ProfileCardPreview({
  bannerImage,
  bannerColor1,
  bannerColor2,
  avatar,
  avatarDecoration,
  statusPresence,
  displayName,
  usernameInput,
  pronouns,
  statusEmoji,
  statusText,
  bio,
}) {
  return (
    <div className="lg:col-span-5 sticky top-4">
      <div className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider mb-2">
        VORSCHAU
      </div>

      <div className="w-full bg-[#0c0c10] rounded-2xl overflow-hidden shadow-2xl border border-amber-500/30 relative">
        <div
          className="h-28 w-full relative transition-all duration-300"
          style={{
            background: bannerImage
              ? `url(${bannerImage}) center/cover no-repeat`
              : `linear-gradient(135deg, ${bannerColor1}, ${bannerColor2})`,
          }}
        />

        <div className="px-4 pb-4 relative">
          <div className="flex items-end justify-between -mt-12 mb-3">
            <div className="relative">
              <div
                className={`w-20 h-20 rounded-full border-4 border-[#0c0c10] overflow-hidden bg-neutral-900 transition-all ${
                  AVATAR_DECORATIONS.find((d) => d.id === avatarDecoration)?.border || ''
                }`}
              >
                <img src={avatar} alt="Preview Avatar" className="w-full h-full object-cover" />
              </div>
              <span
                className={`absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full border-2 border-[#0c0c10] ${
                  statusPresence === 'online'
                    ? 'bg-emerald-400'
                    : statusPresence === 'idle'
                    ? 'bg-amber-400'
                    : statusPresence === 'dnd'
                    ? 'bg-red-500'
                    : 'bg-neutral-600'
                }`}
              />
            </div>

            <div className="bg-[#121217] rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 shadow border border-amber-500/20">
              <img
                src="/dilsed-logo.png"
                alt="DilSed"
                className="w-4 h-4 object-contain"
                title="DilSed Mitglied"
              />
              <span title="Aktiver Entwickler" className="text-xs">
                ⚡
              </span>
              <span title="Früher Unterstützer" className="text-xs">
                👑
              </span>
              <span title="HypeSquad Bravery" className="text-xs">
                🛡️
              </span>
            </div>
          </div>

          <div className="bg-[#070709] rounded-xl p-3.5 space-y-3 border border-amber-500/20">
            <div>
              <div className="font-black text-amber-200 text-base leading-tight">
                {displayName || 'Benutzer'}
              </div>
              <div className="text-xs text-amber-300/60 flex items-center gap-1 font-medium">
                <span>@{usernameInput || 'benutzer'}</span>
                {pronouns && (
                  <>
                    <span>•</span>
                    <span className="text-[11px] text-amber-200/60">{pronouns}</span>
                  </>
                )}
              </div>
            </div>

            {statusText && (
              <div className="text-xs text-amber-300 flex items-center gap-1.5 py-1 border-t border-b border-amber-500/15 font-medium">
                <span>{statusEmoji}</span>
                <span className="truncate">{statusText}</span>
              </div>
            )}

            {bio && (
              <div>
                <div className="text-[9px] font-extrabold text-amber-400 uppercase tracking-wider mb-1">
                  ÜBER MICH
                </div>
                <div className="text-xs text-amber-100/90 whitespace-pre-wrap leading-relaxed font-normal">
                  {bio}
                </div>
              </div>
            )}

            <div>
              <div className="text-[9px] font-extrabold text-amber-400 uppercase tracking-wider mb-1">
                DILSED-MITGLIED
              </div>
              <div className="text-[11px] text-amber-300/60 flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Mitglied seit 12. Oktober 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
