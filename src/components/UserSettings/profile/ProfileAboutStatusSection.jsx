import React from 'react';
import { POPULAR_STATUS_EMOJIS } from '../constants';

const STATUS_PRESENCE_OPTIONS = [
  { id: 'online', label: 'Online', color: 'bg-emerald-400' },
  { id: 'idle', label: 'Abwesend', color: 'bg-amber-400' },
  { id: 'dnd', label: 'Bitte nicht stören', color: 'bg-red-500' },
  { id: 'offline', label: 'Unsichtbar', color: 'bg-neutral-600' },
];

export default function ProfileAboutStatusSection({
  bio,
  setBio,
  statusText,
  setStatusText,
  statusEmoji,
  setStatusEmoji,
  statusPresence,
  setStatusPresence,
  showStatusEmojiPicker,
  setShowStatusEmojiPicker,
  setHasUnsavedChanges,
}) {
  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider">
            ÜBER MICH (BIOGRAFIE)
          </label>
          <span className="text-[10px] text-amber-300/60 font-mono">{bio.length}/190</span>
        </div>
        <textarea
          rows={3}
          maxLength={190}
          value={bio}
          onChange={(e) => {
            setBio(e.target.value);
            setHasUnsavedChanges(true);
          }}
          placeholder="Erzähle etwas über dich..."
          className="w-full bg-[#0c0c10] rounded-xl p-3 text-xs text-amber-100 border border-amber-500/25 focus:border-amber-400 focus:outline-none font-medium"
        />
      </div>

      <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-4">
        <div>
          <label className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block mb-1.5">
            BENUTZERDEFINIERTER STATUS & EMOJI
          </label>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowStatusEmojiPicker(!showStatusEmojiPicker)}
                className="w-9 h-9 rounded-lg bg-[#070709] border border-amber-500/30 flex items-center justify-center text-lg hover:scale-105 transition cursor-pointer"
                title="Emoji auswählen"
              >
                {statusEmoji || '⚡'}
              </button>

              {showStatusEmojiPicker && (
                <div className="absolute top-11 left-0 bg-[#0c0c10] border border-amber-500/30 rounded-xl p-2.5 shadow-2xl z-30 flex flex-wrap gap-1.5 w-44 animate-in fade-in zoom-in-95">
                  {POPULAR_STATUS_EMOJIS.map((em) => (
                    <button
                      key={em}
                      type="button"
                      onClick={() => {
                        setStatusEmoji(em);
                        setShowStatusEmojiPicker(false);
                        setHasUnsavedChanges(true);
                      }}
                      className="text-lg p-1.5 hover:bg-amber-400/15 rounded-lg transition hover:scale-110 cursor-pointer"
                    >
                      {em}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <input
              type="text"
              value={statusText}
              onChange={(e) => {
                setStatusText(e.target.value);
                setHasUnsavedChanges(true);
              }}
              placeholder="Was machst du gerade?"
              className="flex-1 bg-[#070709] rounded-lg px-3 py-2 text-xs text-amber-100 border border-amber-500/25 focus:border-amber-400 focus:outline-none font-medium"
            />
          </div>
        </div>

        {/* Online Presence Status */}
        <div>
          <label className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block mb-1.5">
            ONLINE-STATUS
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {STATUS_PRESENCE_OPTIONS.map((pr) => (
              <div
                key={pr.id}
                onClick={() => {
                  setStatusPresence(pr.id);
                  setHasUnsavedChanges(true);
                }}
                className={`px-2.5 py-1.5 rounded-lg border cursor-pointer transition flex items-center gap-2 ${
                  statusPresence === pr.id
                    ? 'bg-amber-400/20 border-amber-400 text-amber-200 font-bold shadow-md shadow-amber-500/15'
                    : 'bg-[#070709] border-amber-500/20 text-amber-300/60 hover:text-amber-200'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${pr.color} flex-shrink-0`} />
                <span className="text-[11px] truncate font-medium">{pr.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
