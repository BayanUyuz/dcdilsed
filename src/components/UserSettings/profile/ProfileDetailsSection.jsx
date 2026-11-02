import React from 'react';
import { Upload, Sparkles } from 'lucide-react';
import { AVATAR_DECORATIONS } from '../constants';

export default function ProfileDetailsSection({
  profileSubTab,
  displayName,
  setDisplayName,
  serverNickname,
  setServerNickname,
  pronouns,
  setPronouns,
  avatar,
  setAvatar,
  avatarDecoration,
  setAvatarDecoration,
  setHasUnsavedChanges,
  avatarFileRef,
}) {
  return (
    <>
      <div>
        <label className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block mb-1.5">
          {profileSubTab === 'user' ? 'ANZEIGENAME' : 'SERVER-SPITZNAME'}
        </label>
        <input
          type="text"
          value={profileSubTab === 'user' ? displayName : serverNickname}
          onChange={(e) => {
            if (profileSubTab === 'user') setDisplayName(e.target.value);
            else setServerNickname(e.target.value);
            setHasUnsavedChanges(true);
          }}
          placeholder="Dein Name auf DilSed"
          className="w-full bg-[#0c0c10] rounded-lg px-3.5 py-2.5 text-xs text-amber-100 border border-amber-500/25 focus:border-amber-400 focus:outline-none font-medium"
        />
      </div>

      {profileSubTab === 'user' && (
        <div>
          <label className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block mb-1.5">
            PRONOMEN
          </label>
          <input
            type="text"
            value={pronouns}
            onChange={(e) => {
              setPronouns(e.target.value);
              setHasUnsavedChanges(true);
            }}
            placeholder="z. B. er/ihn, sie/ihr, they/them"
            className="w-full bg-[#0c0c10] rounded-lg px-3.5 py-2.5 text-xs text-amber-100 border border-amber-500/25 focus:border-amber-400 focus:outline-none font-medium"
          />
        </div>
      )}

      <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-amber-200">Profilbild (Avatar)</div>
            <div className="text-[10px] text-amber-300/60 font-medium">
              Lade ein Bild von deinem Computer hoch oder gib eine URL ein.
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => avatarFileRef.current?.click()}
              className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-110 text-neutral-950 px-3.5 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Bild auswählen</span>
            </button>
            <button
              type="button"
              onClick={() => {
                const url = prompt('Avatar-Bild-URL:', avatar);
                if (url) {
                  setAvatar(url);
                  setHasUnsavedChanges(true);
                }
              }}
              className="bg-[#121217] hover:bg-[#181820] text-amber-300 text-xs px-3 py-1.5 rounded-lg border border-amber-500/30 font-bold cursor-pointer"
            >
              URL
            </button>
          </div>
        </div>

        {/* Avatar Decorations */}
        <div>
          <div className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>AVATAR-DEKORATION</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {AVATAR_DECORATIONS.map((dec) => (
              <div
                key={dec.id}
                onClick={() => {
                  setAvatarDecoration(dec.id);
                  setHasUnsavedChanges(true);
                }}
                className={`p-2 rounded-lg border text-center cursor-pointer transition flex flex-col items-center justify-center ${
                  avatarDecoration === dec.id
                    ? 'bg-[#15151e] border-amber-400 font-bold text-amber-200 shadow-md shadow-amber-500/20'
                    : 'bg-[#070709] border-amber-500/20 text-amber-300/60 hover:text-amber-200'
                }`}
              >
                <div className={`w-8 h-8 rounded-full mb-1 ${dec.border} overflow-hidden bg-neutral-900`}>
                  <img src={avatar} alt="thumb" className="w-full h-full object-cover" />
                </div>
                <span className="text-[9px] leading-tight truncate">{dec.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
